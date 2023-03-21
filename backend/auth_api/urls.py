from django.urls import path
from django.contrib import admin
from auth_api.views import (UserRegView, UserLoginView,
                            UserProfileView,
                            UserChangePasswordView, SendPasswordResetEmailView,
                            UserPasswordResetView)
urlpatterns = [
    path('register/', UserRegView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('changepassword/', UserChangePasswordView.as_view(), name='changepassword'),
    path('sendresetpassword/', SendPasswordResetEmailView.as_view(),
         name='sendresetpassword'),
    path('resetpassword/<uid>/<token>',
         UserPasswordResetView.as_view(), name='resetpassword')
]
