from django.db import models

from wagtail.models import Page
from wagtail.fields import RichTextField

from wagtail import blocks
from wagtail.fields import StreamField
from wagtail.admin.panels import FieldPanel
from wagtail.images.blocks import ImageChooserBlock
from wagtail.embeds.blocks import EmbedBlock

from wagtail.api import APIField


class HomePage(Page):
    
    header = RichTextField(blank=True, null=True, features=['h2', 'h3', 'h4', 'ol', 'ul', 'hr', 'bold', 'italic', 'link', 'document-link', 'image', 'embed', 'code'], )
    body = StreamField([
        ('gallery', blocks.ListBlock(ImageChooserBlock())),
        ('heading', blocks.CharBlock(form_classname="title")),
        ('paragraph', blocks.RichTextBlock()),
        ('image', ImageChooserBlock()),
        ('video', EmbedBlock()),
    ], use_json_field=True)

    content_panels = Page.content_panels + [
        FieldPanel('header', icon='title'),
    ]

    api_fields = [
        APIField('header'),
        APIField('body'),
    ]
