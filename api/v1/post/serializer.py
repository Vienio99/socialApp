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

    class Meta:
        model = Post
        fields = "__all__"

    # Iterate over tags and add them to post
    def create(self, validated_data):
        # Temporary
        # User = get_user_model()
        # author = User.objects.get(username=validated_data['author'])
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
        # Try to update tags but if there is none in request, go on
        try:
            tags_data = validated_data.pop('tags')
            for tag_data in tags_data:
                if not Tag.objects.filter(name=tag_data['name']):
                    Tag.objects.create(name=tag_data['name'])
                tag = Tag.objects.get(name=tag_data['name'])
                instance.tags.add(tag.id)
        except KeyError:
            pass
        instance.text = validated_data.get('text', instance.text)
        instance.save()

        return instance

    def to_representation(self, instance):
        # View user instead of number
        rep = super(PostSerializer, self).to_representation(instance)
        rep['author'] = instance.author.username

        # Display date in hours
        rep['pub_date'] = naturaltime(instance.pub_date)
        return rep
