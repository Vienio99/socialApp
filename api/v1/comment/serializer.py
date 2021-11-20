from django.contrib.auth import get_user_model
from django.contrib.humanize.templatetags.humanize import naturaltime
from rest_framework import serializers
from social.models import Comment


class CommentSerializer(serializers.ModelSerializer):
    User = get_user_model()

    # Use SlugRelatedField to validate author by username instead of pk value
    author = serializers.SlugRelatedField(
        slug_field='username',
        queryset=User.objects.all()
    )

    class Meta:
        model = Comment
        fields = "__all__"

    def to_representation(self, instance):
        rep = super(CommentSerializer, self).to_representation(instance)
        rep['author'] = instance.author.username

        # Display date in hours
        rep['pub_date'] = naturaltime(instance.pub_date)
        return rep
