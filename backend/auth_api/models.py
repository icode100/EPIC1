from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser


class UserManager(BaseUserManager):
    def create_user(self, email, name, password=None, password2=None):
        """
        Creates and saves a User with the given email, name and password.
        """
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            id = str(email).split('@')[0],
            name=name,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, password=None):
        """
        Creates and saves a superuser with the given email, name and password.
        """
        user = self.create_user(
            email,
            password=password,
            name=name,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user

class userCred(models.Model):
    reg = models.CharField(max_length=15,default="",null=False,primary_key=True)
    dob = models.DateField(verbose_name='DOB',null=False)
    course = models.CharField(max_length=15,null=False)
    branch = models.CharField(max_length=15,default="",null=False)
    hosteller = models.BooleanField(default=True,null=False)
    blockName = models.CharField(max_length=15,default="")
    roomno = models.CharField(max_length=15,default="")
    def __str__(self):
        return self.reg

class User(AbstractBaseUser):
    def __getitem__(self,index):
        if isinstance(index, slice):
            return self.email[index.start:index.stop:index.step]
        else:
            return self.email[index]
    email = models.EmailField(verbose_name='Email',
                              max_length=255, unique=True,)
    id = models.CharField(verbose_name='ID',max_length=6,unique=True,primary_key=True)
    cred = models.ForeignKey(userCred,null=True,on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']
    def save(self, *args, **kwargs):
        if not self.pk:
            self.id = str(self.email).split('@')[0]
        super().save(*args, **kwargs)

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return self.is_admin

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin

