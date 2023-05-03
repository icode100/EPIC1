from django.contrib import admin
from auth_api.models import User,userCred,LocalOuting,NonLocalOuting
from django import forms
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

class CustomUserForm(forms.ModelForm):
    another_model = forms.ModelChoiceField(queryset=userCred.objects.all())

    class Meta:
        model = User
        fields = '__all__'
class CustomLocalOutingForm(forms.ModelForm):
    class Meta:
        model = LocalOuting
        fields = '__all__'
        
class CustomNonLocalOutingForm(forms.ModelForm):
    class Meta:
        model = NonLocalOuting
        fields = '__all__'
        
class UserModelAdmin(BaseUserAdmin):
    list_display = ('id', 'email', 'name', 'is_admin','cred')
    list_filter = ('is_admin',)
    fieldsets = (
        ('login credentials', {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('name','cred')}),
        ('Permissions', {'fields': ('is_admin',)}),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'password1', 'password2','cred'),
        }),
    )

    search_fields = ('email',)
    ordering = ('email', 'id')
    filter_horizontal = ()
    form = CustomUserForm
class userModelCred(admin.ModelAdmin):
    list_display = ('reg','dob','course','branch','sem','hosteller','blockName','roomno','credits')
    ordering = ('reg',)

class LocalOutingModelAdmin(admin.ModelAdmin):
    list_display = ('id','stu','outdate','outinstance','ininstance','security_ispermitted')
    form  = CustomLocalOutingForm
class NonLocalOutingModelAdmin(admin.ModelAdmin):
    list_display = ('id','stu','outinstance','ininstance','reason','zip','security_ispermitted','warden_ispermitted','return_ispermitted')
    form = CustomNonLocalOutingForm
admin.site.register(User, UserModelAdmin)
admin.site.register(userCred,userModelCred)
admin.site.register(LocalOuting,LocalOutingModelAdmin)
admin.site.register(NonLocalOuting,NonLocalOutingModelAdmin)
