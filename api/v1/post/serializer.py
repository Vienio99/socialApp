from django.utils import timezone
from rest_framework import serializers
from api.v1.tag.serializer import TagSerializer
from social.models import Post, Tag


# TO-DO: change that pub_date display
# TO-DO: change to viewsets
# TO-DO: fix the issue with making post request

class PostSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True)

    class Meta:
        model = Post
        fields = "__all__"

    def create(self, validated_data):
        tags_data = validated_data.pop('tags')
        post = Post.objects.create(**validated_data)
        for tag_data in tags_data:
            Tag.objects.create(**tag_data)
        return post

    def to_representation(self, instance):
        rep = super(PostSerializer, self).to_representation(instance)
        rep['author'] = instance.author.username

        # Display date in hours
        rep['pub_date'] = round((((timezone.now() - instance.pub_date).seconds / 24) / 24))
        return rep
