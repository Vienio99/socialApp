from django.contrib.auth import get_user_model
from django.contrib.humanize.templatetags.humanize import naturaltime
from django.core.validators import MinValueValidator
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from api.v1.tag.serializer import TagSerializer
from social.models import Post, Tag, Comment
from django.db import models
import re

# TO-DO - refactor code
# TO-DO - partial = true for partial updates
# TO-DO - validation
User = get_user_model()


class PostSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, required=False)

    # Use SlugRelatedField to validate author by username instead of pk value
    author = serializers.SlugRelatedField(
        slug_field='username',
        queryset=User.objects.all()
    )

    # Use SlugRelatedField to retrieve user and add him to likes field on post instance
    likes = serializers.SlugRelatedField(
        slug_field='username',
        queryset=User.objects.all(),
        many=True,
        required=False
    )

    class Meta:
        model = Post
        fields = "__all__"

    def validate(self, data):
        # Had to put tags validation here because they are not immediately added
        # when Post is created and therefore not requested (text is required anyway)
        if self.context.get('request').method == 'POST' and not data.get('tags'):
            raise serializers.ValidationError('Tags are required.')
        return data

    def validate_text(self, text):
        if len(text) < 5:
            raise serializers.ValidationError('Text must be at least 5 characters long.')
        if len(text) > 500:
            raise serializers.ValidationError('Text must not exceed 500 characters.')
        return text

    # TO-DO: Move it to tag serializer maybe?
    def validate_tags(self, tags):
        for tag in tags:
            if not re.match('#(\w+)', tag['name']):
                raise serializers.ValidationError('Invalid tag format.')
            if len(tag['name']) > 20:
                raise serializers.ValidationError('Tag must not exceed 20 characters.')
        if len(tags) < 1:
            raise serializers.ValidationError('No tags were provided.')
        if len(tags) > 20:
            raise serializers.ValidationError('Too much tags provided (maximum 20 tags).')
        return tags

    # Iterate over tags and add them to post
    def create(self, validated_data):
        post = Post.objects.create(text=validated_data['text'],
                                   author=validated_data['author'])

        tags_data = validated_data.pop('tags')
        for tag_data in tags_data:
            Tag.objects.get_or_create(name=tag_data['name'])
            tag = Tag.objects.get(name=tag_data['name'])
            post.tags.add(tag.id)

        return post

    # Iterate over tags and add them to post
    def update(self, instance, validated_data):

        # Try to update text but if there is none in request, go on
        try:
            instance.text = validated_data.get('text', instance.text)
        except KeyError:
            pass

        # Try to update tags but if there is none in request, go on
        try:
            # Clear tags that are already in the instance
            tags_data = validated_data.pop('tags')
            instance.tags.clear()
            for tag_data in tags_data:
                if not Tag.objects.filter(name=tag_data['name']):
                    Tag.objects.create(name=tag_data['name'])
                tag = Tag.objects.get(name=tag_data['name'])
                instance.tags.add(tag.id)
        except KeyError:
            pass

        # Try to add like to the post or remove it if user is already there
        try:
            like = validated_data.pop('likes')[0]
            if like in instance.likes.all():
                instance.likes.remove(like)
                instance.likes_count -= 1
            else:
                instance.likes.add(like)
                instance.likes_count += 1
        except KeyError:
            pass

        # Update img

        instance.save()

        return instance

    def to_representation(self, instance):
        # View user instead of number
        rep = super(PostSerializer, self).to_representation(instance)
        rep['author'] = instance.author.username

        # Transform this to str() because otherwise it throws error about the format
        rep['author_img'] = str(instance.author.img)

        rep['comments_count'] = Comment.objects.filter(post_id=instance.id).count()

        # Display date in "2 hours ago" etc.
        rep['pub_date'] = naturaltime(instance.pub_date)
        return rep
