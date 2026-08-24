from django.db import models

class DeveloperProfile(models.Model):
    name = models.CharField(max_length=120, default="Hayasinth M")
    headline = models.CharField(max_length=255, default="Full Stack & Python Developer | BE CSE (4th Year)")
    badge = models.CharField(max_length=100, default="Aspiring Software Engineer")
    institution = models.CharField(max_length=200, default="Jeppiaar Engineering College")
    degree = models.CharField(max_length=120, default="B.E. Computer Science and Engineering")
    graduation_year = models.CharField(max_length=50, default="2023 - 2027")
    bio = models.TextField(default="Currently pursuing B.E. Computer Science and Engineering at Jeppiaar Engineering College. Passionate about building modern full-stack web applications, database-driven systems using SQL and Python, and clean responsive frontends with JavaScript, HTML, CSS, and React.")
    email = models.EmailField(default="hayasinth284@gmail.com")
    phone = models.CharField(max_length=30, default="+91 8122208962")
    location = models.CharField(max_length=120, default="Chennai, Tamil Nadu")
    github_url = models.URLField(default="https://github.com/hayasinth284")
    linkedin_url = models.URLField(default="https://www.linkedin.com/in/hayasinth284")
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)

    def __str__(self):
        return f"{self.name} - {self.institution}"


class Project(models.Model):
    CATEGORY_CHOICES = [
        ('Full Stack', 'Full Stack'),
        ('Python & SQL', 'Python & SQL'),
        ('Frontend', 'Frontend'),
        ('Database', 'Database'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='Full Stack')
    image = models.CharField(max_length=255, default='/static/images/project1.jpg')
    tags = models.CharField(max_length=300, help_text="Comma-separated tech tags, e.g. Python, Django, SQLite")
    github_url = models.URLField(blank=True, default='#')
    demo_url = models.URLField(blank=True, default='#')
    featured = models.BooleanField(default=False)
    architecture = models.TextField(blank=True, help_text="Architecture explanation or tech workflow")
    key_features = models.TextField(blank=True, help_text="Semicolon-separated key features")
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-featured', 'order', '-id']

    def __str__(self):
        return self.title

    def tags_list(self):
        return [t.strip() for t in self.tags.split(',') if t.strip()]

    def features_list(self):
        return [f.strip() for f in self.key_features.split(';') if f.strip()]


class Skill(models.Model):
    CATEGORY_CHOICES = [
        ('Programming Languages', 'Programming Languages'),
        ('Database & SQL', 'Database & SQL'),
        ('Web Frontend', 'Web Frontend'),
        ('Backend Development', 'Backend Development'),
        ('Developer Tools', 'Developer Tools'),
    ]

    category = models.CharField(max_length=60, choices=CATEGORY_CHOICES)
    name = models.CharField(max_length=100)
    proficiency = models.PositiveIntegerField(default=85, help_text="Proficiency percentage from 1 to 100")
    experience_level = models.CharField(max_length=50, default='Advanced')
    icon = models.CharField(max_length=50, default='code', help_text="Icon key or FontAwesome class")
    color = models.CharField(max_length=30, default='#00f2fe')
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', '-proficiency']

    def __str__(self):
        return f"{self.name} ({self.proficiency}%)"


class Experience(models.Model):
    role = models.CharField(max_length=150)
    organization = models.CharField(max_length=200)
    duration = models.CharField(max_length=100)
    description = models.TextField()
    skills_used = models.CharField(max_length=300)
    type = models.CharField(max_length=50, default='Education')
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', '-id']

    def __str__(self):
        return f"{self.role} @ {self.organization}"

    def skills_list(self):
        return [s.strip() for s in self.skills_used.split(',') if s.strip()]


class ContactMessage(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField()
    phone = models.CharField(max_length=30, blank=True)
    subject = models.CharField(max_length=200, blank=True)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Message from {self.name} ({self.email}) - {self.created_at.strftime('%b %d, %Y')}"
