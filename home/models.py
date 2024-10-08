from django.db import models

from wagtail.models import Page
from wagtail.fields import RichTextField

from wagtail import blocks
from wagtail.fields import StreamField
from wagtail.admin.panels import FieldPanel
from wagtail.images.blocks import ImageChooserBlock
from wagtail.embeds.blocks import EmbedBlock

from wagtail.api import APIField

from rest_framework import serializers
from wagtail.images.models import Image

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['id', 'title', 'file', 'width', 'height']


class HomePage(Page):
    
    header = RichTextField(blank=True, null=True, features=['h2', 'h3', 'h4', 'ol', 'ul', 'hr', 'bold', 'italic', 'link', 'document-link', 'image', 'embed', 'code'], )
    body = StreamField([
        ('gallery', blocks.ListBlock(ImageChooserBlock(), icon='image')),
        ('heading', blocks.CharBlock(form_classname="title", icon='title')),
        ('paragraph', blocks.RichTextBlock(icon='title')),
        ('image', ImageChooserBlock()),
        ('video', EmbedBlock()),
    ], use_json_field=True)

    content_panels = Page.content_panels + [
        FieldPanel('header', icon='title'),
        FieldPanel('body', icon='grip'),
    ]

    api_fields = [
        APIField('header'),
        APIField('body'),
    ]


class BlogPage(Page):
    
    body = StreamField([
        ('gallery', blocks.ListBlock(ImageChooserBlock(), icon='image')),
        ('heading', blocks.CharBlock(form_classname="title", icon='title')),
        ('paragraph', blocks.RichTextBlock(icon='title')),
        ('image', ImageChooserBlock()),
        ('video', EmbedBlock()),
    ], use_json_field=True)

    content_panels = Page.content_panels + [
        FieldPanel('body', icon='grip'),
    ]

    api_fields = [
        APIField('body'),
    ]
