from django.utils import timezone
from rest_framework import serializers
from api.v1.tag.serializer import TagSerializer
from social.models import Post, Tag


# TO-DO - change that pub_date display
# TO-DO - change to viewsets
# TO-DO - fix the issue with making post request
# TO-DO - if statement to check if there is already tag with that name

class PostSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True)

    class Meta:
        model = Post
        fields = "__all__"

    def create(self, validated_data):
        tags_data = validated_data.pop('tags')
        post = Post.objects.create(text=validated_data['text'], author=validated_data['author'])
        for tag_data in tags_data:
            if not Tag.objects.filter(name=tag_data['name']):
                new_tag = Tag.objects.create(name=tag_data['name'])
                tag = Tag.objects.get(name=new_tag)
                post.tags.add(tag.id)
            else:
                tag = Tag.objects.get(name=tag_data['name'])
                post.tags.add(tag.id)
        return post

    def update(self, instance, validated_data):

        tags_data = validated_data.pop('tags')

        for tag_data in tags_data:
            if not Tag.objects.filter(name=tag_data['name']):
                new_tag = Tag.objects.create(name=tag_data['name'])
                tag = Tag.objects.get(name=new_tag)
                instance.tags.add(tag.id)
            else:
                tag = Tag.objects.get(name=tag_data['name'])
                instance.tags.add(tag.id)
        instance.text = validated_data.get('text', instance.text)
        instance.save()

        return instance

    def to_representation(self, instance):
        rep = super(PostSerializer, self).to_representation(instance)
        rep['author'] = instance.author.username

        # Display date in hours
        rep['pub_date'] = round((((timezone.now() - instance.pub_date).seconds / 24) / 24))
        return rep
