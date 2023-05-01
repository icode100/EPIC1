from rest_framework import serializers
from auth_api.models import User,userCred,NonLocalOuting,LocalOuting
from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from auth_api.utils import Util


class UserRegSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(
        style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['email', 'name', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    # validating password1==password2

    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        if password != password2:
            raise serializers.ValidationError("password does not match")
        return attrs

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255)
# it is necessary to declare the email field again as
# it here acts as a primary key and it reflects the
# fact that this is the declaration of same field
# 'email' but this time not for registration but
# for login else it thinks that it is for registration
# as it was declared previously and gives error mssg that
# email already exists

    class Meta:
        model = User
        fields = ['email', 'password']

class userCredSerializer(serializers.ModelSerializer):
    class Meta:
        model = userCred
        fields = '__all__'
class UserProfileSerializer(serializers.ModelSerializer):
    cred = userCredSerializer()
    class Meta:
        model = User
        fields = ('id', 'email', 'name','cred')


class UserChangePasswordSerializer(serializers.Serializer):
    password = serializers.CharField(
        max_length=255, style={'input_type': 'password'}, write_only=True)
    password2 = serializers.CharField(
        max_length=255, style={'input_type': 'password'}, write_only=True)

    class Meta:
        fields = ['password', 'password2']

    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        user = self.context.get('user')
        if password != password2:
            raise serializers.ValidationError("passwords do not match 😢")
        user.set_password(password)
        user.save()
        return attrs


class SendPasswordResetEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)

    class Meta:
        fields = ['email']

    def validate(self, attrs):
        email = attrs.get('email')
        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            uid = urlsafe_base64_encode(force_bytes(user.id))
            print('Encoded id: ', uid)
            token = PasswordResetTokenGenerator().make_token(user)
            print('password reset token', token)
            link = 'http://localhost:3000/api/user/reset'+str(uid)+'/'+token
            print('password reset link', link)

            # send email
            body = 'click the following link link to reset your password 😊'+link
            data = {
                'subject': 'reset your password',
                'body': body,
                'to_email': user.email
            }
            Util.send_email(data)
        else:
            raise serializers.ValidationError('email is not registered 😢')
        return attrs


class UserPasswordResetSerializer(serializers.Serializer):
    password = serializers.CharField(
        max_length=255, style={'input_type': 'password'}, write_only=True)
    password2 = serializers.CharField(
        max_length=255, style={'input_type': 'password'}, write_only=True)

    class Meta:
        fields = ['password', 'password2']

    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        uid = self.context.get('uid')
        token = self.context.get('token')
        if password != password2:
            raise serializers.ValidationError("passwords do not match 😢")
        id = smart_str(urlsafe_base64_decode(uid))
        user = User.objects.get(id=id)
        if not PasswordResetTokenGenerator().check_token(user, token):
            raise serializers.ValidationError("token expired 🧪")
        user.set_password(password)
        user.save()
        return attrs
class LocalOutingSerializer(serializers.ModelSerializer):
    class Meta:
        model = LocalOuting
        fields = ['ininstance','stu']
class NonLocalOutingSerializer(serializers.ModelSerializer):
    class Meta:
        model = NonLocalOuting
        fields = ['stu','outinstance','address','reason','city','state','zip']