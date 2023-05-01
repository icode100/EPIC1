# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     TokenRefreshView,
# )

from django.contrib import admin
from django.urls import path,include

admin.site.site_header = " Ho-Man Admin"
admin.site.site_title = "Ho-Man Admin Portal"
admin.site.index_title = "🔴🟡🟢Welcome to Ho-Man Admin Portal🟢🟡🔴"
urlpatterns = [
    path('admin/', admin.site.urls),
    # path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('',include('auth_api.urls'))
]
