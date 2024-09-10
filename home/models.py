from django.db import models

from wagtail.models import Page
from wagtail.fields import RichTextField

from wagtail.admin.panels import FieldPanel

from wagtail.api import APIField


class HomePage(Page):
    
    header = RichTextField(blank=True, null=True, features=['h2', 'h3', 'h4', 'ol', 'ul', 'hr', 'bold', 'italic', 'link', 'document-link', 'image', 'embed', 'code'], )

    content_panels = Page.content_panels + [
        FieldPanel('header', icon='title'),
    ]

    api_fields = [
        APIField('header'),
    ]
