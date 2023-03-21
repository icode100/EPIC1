from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from auth_api.serializers import (UserRegSerializer,
                                  UserLoginSerializer,
                                  UserProfileSerializer,
                                  UserChangePasswordSerializer,
                                  SendPasswordResetEmailSerializer,
                                  UserPasswordResetSerializer)
from django.contrib.auth import authenticate
from auth_api.renderers import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
# generating tokens


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


class UserRegView(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request, format=None):
        serializer = UserRegSerializer(data=request.data)
        # the validate function from the serializer is called and the pass1 and pass2 are validated if true then ok
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = get_tokens_for_user(user)
        return Response({'token': token, 'msg': 'registration success'}, status=status.HTTP_201_CREATED)
        # here the request data from the front end is taken as an input or is posted to our backend api


class UserLoginView(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request, format=None):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.data.get('email')
        password = serializer.data.get('password')
        user = authenticate(email=email, password=password)
        if user is not None:
            token = get_tokens_for_user(user)
            temp = "success"
            userid = list(str(user).split('@'))[0]
            type = list(list(str(user).split('@'))[1].split('.'))[0]
            return Response({"status": temp, "token": token, "userid": userid, "type": type}, status=status.HTTP_200_OK)
        # do not forget to twitch here in order to send the user cred for retriving data from main database
        # though u can also get the user data from the generated token
        # use the id as a foreign key and fetch the data from the other table
        else:
            return Response({'errors': {'non_field_errors': ['email or password is not valid']}}, status=status.HTTP_404_NOT_FOUND)


class UserProfileView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserChangePasswordView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        serializer = UserChangePasswordSerializer(
            data=request.data, context={'user': request.user})
        serializer.is_valid(raise_exception=True)
        return Response({'mssg': 'password changed'}, status=status.HTTP_200_OK)


class SendPasswordResetEmailView(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request, format=None):
        serializer = SendPasswordResetEmailSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'mssg': 'password reset link sent to your email. plsease check your email'}, status=status.HTTP_200_OK)


class UserPasswordResetView(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request, uid, token, format=None):
        serializer = UserPasswordResetSerializer(
            data=request.data, context={'uid': uid, 'token': token})
        serializer.is_valid(raise_exception=True)
        return Response({"msg": "password reset successfully"}, status=status.HTTP_200_OK)
