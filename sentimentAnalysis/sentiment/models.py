from django.db import models


class ReviewManager(models.Manager):
    def create_review(self, text, label):
        review = self.model(
            text=text,
            label=label,
        )

        review.save()
        return review


'''
    def get_reviews(self):
        return Review.objects.all()
'''


class Review(models.Model):
    text = models.CharField(max_length=200)
    label = models.IntegerField(default=-1)

    objects = ReviewManager()

    def __str__(self):
        return self.text
