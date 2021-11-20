from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()


# TO-DO: make validation if user exists, if so return the error to frontend


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['username', 'password', 'email', 'age', 'tags']
        extra_kwargs = {'password': {
            'write_only': True
        }}

    def create(self, validated_data):
        user = User.objects.create_user(username=validated_data['username'],
                                        password=validated_data['password'])
        return user


# noqa to suppress warning about implementing all abstract methods
# Serializer for custom token claims and including username in access token
class MyTokenObtainPairSerializer(TokenObtainPairSerializer): # noqa
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token

