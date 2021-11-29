from django.contrib.auth import get_user_model
from django.contrib.humanize.templatetags.humanize import naturaltime
from rest_framework import serializers
from api.v1.tag.serializer import TagSerializer
from social.models import Post, Tag


# TO-DO - refactor code
# TO-DO - partial = true for partial updates
# TO-DO - validation

class PostSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, required=False)
    User = get_user_model()

    # Use SlugRelatedField to validate author by username instead of pk value
    author = serializers.SlugRelatedField(
        slug_field='username',
        queryset=User.objects.all()
    )

    likes = serializers.SlugRelatedField(
        slug_field='username',
        queryset=User.objects.all(),
        many=True,
        required=False
    )

    class Meta:
        model = Post
        fields = "__all__"

    # Iterate over tags and add them to post
    def create(self, validated_data):
        post = Post.objects.create(text=validated_data['text'],
                                   author=validated_data['author'])
        try:
            tags_data = validated_data.pop('tags')
            for tag_data in tags_data:
                if not Tag.objects.filter(name=tag_data['name']):
                    Tag.objects.create(name=tag_data['name'])
                tag = Tag.objects.get(name=tag_data['name'])
                post.tags.add(tag.id)
        except KeyError:
            return 'No tags were provided'

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
            instance.tags.clear()
            tags_data = validated_data.pop('tags')
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

        instance.save()

        return instance

    def to_representation(self, instance):
        # View user instead of number
        rep = super(PostSerializer, self).to_representation(instance)
        rep['author'] = instance.author.username

        # Display date in hours
        rep['pub_date'] = naturaltime(instance.pub_date)
        return rep
