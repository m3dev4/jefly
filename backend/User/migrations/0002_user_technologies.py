from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("Technologie", "0001_initial"),
        ("User", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="technologies",
            field=models.ManyToManyField(
                blank=True,
                related_name="users",
                to="Technologie.technologie",
            ),
        ),
    ]
