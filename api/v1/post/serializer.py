from django.utils import timezone
from rest_framework import serializers
from social.models import Post


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"

    def to_representation(self, instance):
        rep = super(PostSerializer, self).to_representation(instance)
        rep['author'] = instance.author.username
        rep['pub_date'] = instance.pub_date
        return rep
