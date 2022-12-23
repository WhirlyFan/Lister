from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Review
from .auth_routes import validation_errors_to_error_messages, authorized
from app.forms import CreateReview, UpdateReview

review_routes = Blueprint("reviews", __name__)


@review_routes.route("", methods=["GET"])
@login_required
def reviews():
    """
    Query for all reviews and returns them in a list of review dictionaries
    """
    reviews = Review.query.all()
    return {'reviews': [review.to_dict() for review in reviews]}


@review_routes.route("/<int:id>", methods=["GET"])
@login_required
def review(id):
    """
    Query for a review by id and returns that review in a dictionary
    """
    review = Review.query.get(id)
    if not review:
        return {"errors": ["Review not found"]}, 404
    return review.to_dict()


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


@review_routes.route("/anime/<int:id>", methods=["POST"])
@login_required
def create_review(id):
    """
    Create a review
    """

    review = Review.query.filter(
        Review.user_id == current_user.id, Review.anime_id == id).first()
    if review:
        return {"errors": ["Review already exists"]}, 401

    form = CreateReview()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = Review(
            user_id=current_user.id,
            anime_id=id,
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