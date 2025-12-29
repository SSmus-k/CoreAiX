from django.urls import path
from .views import CompanyInfoUploadView

urlpatterns = [
    path('company-info/', CompanyInfoUploadView.as_view(), name='company-info-upload'),
]
