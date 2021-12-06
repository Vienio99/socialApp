import re

from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()


# TO-DO: make validation if user exists, if so return the error to frontend

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['username', 'password', 'email', 'age', 'tags', 'img']
        # To ensure password doesn't appear in response
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def validate(self, data):
        # check if there is any img, if not set default
        img = data.get('img')
        if not img:
            data['img'] = 'avatars/default.jpg'
        return data

    def validate_username(self, username):
        if len(User.objects.filter(username=username)) > 0:
            raise serializers.ValidationError('User with that username already exists.')
        if len(username) < 4:
            raise serializers.ValidationError('Username must be at least 4 characters long.')
        if len(username) > 20:
            raise serializers.ValidationError('Username must not exceed 20 characters.')
        return username

    def create(self, validated_data):
        user = User.objects.create_user(username=validated_data['username'],
                                        password=validated_data['password'],
                                        img=validated_data['img'])
        return user


# noqa to suppress warning about implementing all abstract methods
# Serializer for custom token claims and including username in access token
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):  # noqa
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims so after deserializing I can read username from the access token
        token['username'] = user.username
        # ...

        return token
