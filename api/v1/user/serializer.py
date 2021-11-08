from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


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
