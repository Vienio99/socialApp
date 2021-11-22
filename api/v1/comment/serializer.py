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

    likes = serializers.SlugRelatedField(
        slug_field='username',
        queryset=User.objects.all(),
        many=True,
        required=False
    )

    class Meta:
        model = Comment
        fields = "__all__"

    def update(self, instance, validated_data):

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

        instance.text = validated_data.get('text', instance.text)
        instance.save()

        return instance

    def to_representation(self, instance):
        rep = super(CommentSerializer, self).to_representation(instance)
        rep['author'] = instance.author.username

        # Display date in hours
        rep['pub_date'] = naturaltime(instance.pub_date)
        return rep
