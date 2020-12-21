from django.urls import path

from . import views
from django.views.generic import TemplateView
from .views import AnalyzeView, MainView

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html')),
    path('create/', MainView.as_view(), name='main_page'),
    path('analysis/', AnalyzeView.as_view(), name='analyze'),
]
