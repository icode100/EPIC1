from django.urls import path
# from django.contrib import admin
from auth_api.views import ( LocalReturnView,LocalPermissionView,LocalOutingView, MessRebateView, NonLocalOutingInstanceView, NonLocalOutingView, UserRegView, UserLoginView,
                            UserProfileView,
                            UserChangePasswordView, SendPasswordResetEmailView,
                            UserPasswordResetView,GetNonlocalPermissionsView,NonLocalOutingUpdateAPIView)
urlpatterns = [
    path('register/', UserRegView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('changepassword/', UserChangePasswordView.as_view(), name='changepassword'),
    path('sendresetpassword/', SendPasswordResetEmailView.as_view(),name='sendresetpassword'),
    path('resetpassword/<uid>/<token>',UserPasswordResetView.as_view(), name='resetpassword'),
    path('localouting',LocalOutingView.as_view(),name='localouting'),
    path('nonlocalouting',NonLocalOutingView.as_view(),name='nonlocalouting'),
    path('nonlocalpermissions/<int:id>/', GetNonlocalPermissionsView.as_view(), name='get_nonlocal_permissions'),
    path('nonlocaloutingreturn/<int:id>/update/', NonLocalOutingUpdateAPIView.as_view(), name='nonlocalouting-update'),
    path('nonlocalinstance/<int:id>/',NonLocalOutingInstanceView.as_view(),name='nonlocalinstance'),
    path('messrebate/<str:reg>/update/',MessRebateView.as_view(),name='messrebate'),
    path('localpermission/<int:id>/',LocalPermissionView.as_view(),name='localpermission'),
    path('localreturn/<int:id>/update/',LocalReturnView.as_view(),name='localreturn'),
]
