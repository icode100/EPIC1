# Generated by Django 4.2 on 2023-05-02 06:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth_api', '0014_alter_localouting_id_alter_nonlocalouting_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='localouting',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='nonlocalouting',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
