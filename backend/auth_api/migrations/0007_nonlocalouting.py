# Generated by Django 4.2 on 2023-04-30 03:45

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('auth_api', '0006_rename_security_localouting'),
    ]

    operations = [
        migrations.CreateModel(
            name='NonLocalOuting',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('outinstance', models.DateTimeField()),
                ('ininstance', models.DateTimeField()),
                ('address', models.CharField(max_length=200)),
                ('reason', models.CharField(max_length=200)),
                ('city', models.CharField(max_length=200)),
                ('state', models.CharField(max_length=200)),
                ('zip', models.IntegerField()),
                ('stu', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
