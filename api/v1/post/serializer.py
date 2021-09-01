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

        # Display date in hours
        rep['pub_date'] = round((((timezone.now() - instance.pub_date).seconds / 24) / 24))
        return rep
