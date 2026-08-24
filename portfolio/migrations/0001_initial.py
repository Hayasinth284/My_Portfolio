from django.db import migrations, models

class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='DeveloperProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='Hayasinth M', max_length=120)),
                ('headline', models.CharField(default='Full Stack & Python Developer | BE CSE (4th Year)', max_length=255)),
                ('badge', models.CharField(default='Aspiring Software Engineer', max_length=100)),
                ('institution', models.CharField(default='Jeppiaar Engineering College', max_length=200)),
                ('degree', models.CharField(default='B.E. Computer Science and Engineering', max_length=120)),
                ('graduation_year', models.CharField(default='2023 - 2027', max_length=50)),
                ('bio', models.TextField(default='Currently pursuing B.E. Computer Science and Engineering at Jeppiaar Engineering College. Passionate about building modern full-stack web applications, database-driven systems using SQL and Python, and clean responsive frontends with JavaScript, HTML, CSS, and React.')),
                ('email', models.EmailField(default='hayasinth284@gmail.com', max_length=254)),
                ('phone', models.CharField(default='+91 8122208962', max_length=30)),
                ('location', models.CharField(default='Chennai, Tamil Nadu', max_length=120)),
                ('github_url', models.URLField(default='https://github.com/hayasinth284')),
                ('linkedin_url', models.URLField(default='https://www.linkedin.com/in/hayasinth284')),
                ('avatar', models.ImageField(blank=True, null=True, upload_to='avatars/')),
            ],
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('category', models.CharField(choices=[('Full Stack', 'Full Stack'), ('Python & SQL', 'Python & SQL'), ('Frontend', 'Frontend'), ('Database', 'Database')], default='Full Stack', max_length=50)),
                ('image', models.CharField(default='/static/images/project1.jpg', max_length=255)),
                ('tags', models.CharField(help_text='Comma-separated tech tags, e.g. Python, Django, SQLite', max_length=300)),
                ('github_url', models.URLField(blank=True, default='#')),
                ('demo_url', models.URLField(blank=True, default='#')),
                ('featured', models.BooleanField(default=False)),
                ('architecture', models.TextField(blank=True, help_text='Architecture explanation or tech workflow')),
                ('key_features', models.TextField(blank=True, help_text='Semicolon-separated key features')),
                ('order', models.PositiveIntegerField(default=0)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ['-featured', 'order', '-id'],
            },
        ),
        migrations.CreateModel(
            name='Skill',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(choices=[('Programming Languages', 'Programming Languages'), ('Database & SQL', 'Database & SQL'), ('Web Frontend', 'Web Frontend'), ('Backend Development', 'Backend Development'), ('Developer Tools', 'Developer Tools')], max_length=60)),
                ('name', models.CharField(max_length=100)),
                ('proficiency', models.PositiveIntegerField(default=85, help_text='Proficiency percentage from 1 to 100')),
                ('experience_level', models.CharField(default='Advanced', max_length=50)),
                ('icon', models.CharField(default='code', help_text='Icon key or FontAwesome class', max_length=50)),
                ('color', models.CharField(default='#00f2fe', max_length=30)),
                ('order', models.PositiveIntegerField(default=0)),
            ],
            options={
                'ordering': ['order', '-proficiency'],
            },
        ),
        migrations.CreateModel(
            name='Experience',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('role', models.CharField(max_length=150)),
                ('organization', models.CharField(max_length=200)),
                ('duration', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('skills_used', models.CharField(max_length=300)),
                ('type', models.CharField(default='Education', max_length=50)),
                ('order', models.PositiveIntegerField(default=0)),
            ],
            options={
                'ordering': ['order', '-id'],
            },
        ),
        migrations.CreateModel(
            name='ContactMessage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=120)),
                ('email', models.EmailField(max_length=254)),
                ('phone', models.CharField(blank=True, max_length=30)),
                ('subject', models.CharField(blank=True, max_length=200)),
                ('message', models.TextField()),
                ('is_read', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
    ]
