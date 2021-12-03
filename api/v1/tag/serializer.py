import re

from rest_framework import serializers
from social.models import Tag


# TO-DO: not sure if it's necessary at all because anyway it gets validated and added to post instance
class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = "__all__"
