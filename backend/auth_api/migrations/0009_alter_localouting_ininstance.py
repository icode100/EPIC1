# Generated by Django 4.2 on 2023-04-30 16:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth_api', '0008_localouting_security_ispermitted_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='localouting',
            name='ininstance',
            field=models.DateTimeField(null=True),
        ),
    ]
