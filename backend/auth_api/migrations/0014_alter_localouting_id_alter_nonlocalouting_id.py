# Generated by Django 4.2 on 2023-05-02 06:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth_api', '0013_alter_localouting_ininstance_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='localouting',
            name='id',
            field=models.IntegerField(auto_created=True, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='nonlocalouting',
            name='id',
            field=models.IntegerField(auto_created=True, primary_key=True, serialize=False),
        ),
    ]