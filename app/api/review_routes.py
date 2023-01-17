from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Review, User
from .auth_routes import validation_errors_to_error_messages, authorized
from app.forms import CreateReview, UpdateReview

review_routes = Blueprint("reviews", __name__)


# @review_routes.route("", methods=["GET"])
# @login_required
# def reviews():
#     """
#     Query for all reviews and returns them in a list of review dictionaries
#     """
#     reviews = Review.query.all()
#     return {'reviews': [review.to_dict() for review in reviews]}


@review_routes.route("/<int:id>", methods=["GET"])
def review(id):
    """
    Query for a review by id and returns that review in a dictionary
    """
    response = []
    review = Review.query.get(id)
    if not review:
        return {"errors": ["Review not found"]}, 404
    user = User.query.get(review.user_id)
    response.append({**review.to_dict(), "user": user.to_dict()})
    return {'review': response}


@review_routes.route("/users/<int:id>", methods=["GET"])
@login_required
def user_reviews(id):
    """
    Query for all reviews written by a user and returns them in a list of review dictionaries
    """
    reviews = Review.query.filter(Review.user_id == id).all()
    if not reviews:
        return {"errors": ["No reviews found"]}, 404
    return {'reviews': [review.to_dict() for review in reviews]}


@review_routes.route("/anime/<int:id>", methods=["GET"])
def anime_reviews(id):
    """
    Query for all reviews for an anime and returns them in a list of review dictionaries
    """
    response = []
    reviews = Review.query.filter(Review.anime_id == id).all()
    if not reviews:
        return {"errors": ["No reviews found"]}, 404
    for review in reviews:
        user = User.query.get(review.user_id)
        response.append({**review.to_dict(), "user": user.to_dict()})
    return {'reviews': response}


@review_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_review(id):
    """
    Delete a review by id
    """
    review = Review.query.get(id)
    if not review:
        return {"errors": ["Review not found"]}, 404
    if not authorized(review.user_id):
        return {"errors": ["Unauthorized"]}, 401
    db.session.delete(review)
    db.session.commit()
    return {"message": "Successfully deleted review"}


@review_routes.route("", methods=["POST"])
@login_required
def create_review():
    """
    Create a new review
    """
    form = CreateReview()
    form['csrf_token'].data = request.cookies['csrf_token']

    reviews = Review.query.filter(
        Review.user_id == current_user.id).all()
    for review in reviews:
        if review.anime_id == form.data['anime_id']:
            return {"errors": ["You have already reviewed this anime"]}, 401

    if form.validate_on_submit():
        review = Review(
            user_id=current_user.id,
            anime_id=form.data['anime_id'],
            rating=form.data['rating'],
            review=form.data['review']
        )
        db.session.add(review)
        db.session.commit()
        return review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@review_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_review(id):
    """
    Update a review by id
    """
    review = Review.query.get(id)
    if not review:
        return {"errors": ["Review not found"]}, 404
    if not authorized(review.user_id):
        return {"errors": ["Unauthorized"]}, 401
    form = UpdateReview()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review.rating = form.data['rating']
        review.review = form.data['review']
        db.session.commit()
        return review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
