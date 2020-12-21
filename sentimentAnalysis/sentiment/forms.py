from django import forms
from .models import Review


class ReviewForm(forms.ModelForm):
    #text = forms.CharField(label="text", max_length=200, widget=forms.Textarea)

    class Meta:
        model = Review
        fields = ('text',)

