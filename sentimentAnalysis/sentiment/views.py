from django.shortcuts import render, redirect, get_object_or_404
from .forms import ReviewForm
from .models import Review
#from .analyze import SentimentAnalyzer

from rest_framework import generics, serializers, status
from rest_framework.views import APIView
from rest_framework.response import Response


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('text', 'label',)


class MainView(APIView):

    def post(self, request):
        data = request.data
        text = data['text']
        label_text = data['label']
        vote_text = data['vote']
        if label_text == '긍정':
            label = 1
        else:
            label = 0
        if vote_text == '부정':
            label = label ^ 1
        review = Review.objects.create_review(text=text, label=label)
        serializer = ReviewSerializer(review)
        return Response(serializer.data)


class AnalyzeView(APIView):

    def post(self, request):
        data = request.data
        text = data['text']
        #임시 라벨 지정
        label = 1
        #감성 뱉는 함수 이용
        #sa = SentimentAnalyzer()
        #label = sa.analyze(text)
        review = Review(text=text, label=label)
        serializer = ReviewSerializer(review)
        return Response(serializer.data)
