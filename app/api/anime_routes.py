from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Anime
from .auth_routes import validation_errors_to_error_messages, authorized
from app.forms import CreateAnime

anime_routes = Blueprint("animes", __name__)


@anime_routes.route("", methods=["GET"])
@login_required
def animes():
    """
    Query for all animes and returns them in a list of anime dictionaries
    """
    animes = Anime.query.all()
    return {'animes': [anime.to_dict() for anime in animes]}


@anime_routes.route("/<int:id>", methods=["GET"])
@login_required
def anime(id):
    """
    Query for a anime by id and returns that anime in a dictionary
    """
    anime = Anime.query.get(id)
    if not anime:
        return {"errors": ["Anime not found"]}, 404
    return anime.to_dict()


@anime_routes.route("", methods=["POST"])
@login_required
def create_anime():
    """
    Create a new anime
    """
    form = CreateAnime()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        anime = Anime(
            mal_id=form.data['mal_id'],
            title=form.data['title'],
            image=form.data['image']
        )
        db.session.add(anime)
        db.session.commit()
        return anime.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


@anime_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_anime(id):
    """
    Delete a anime by id
    """
    anime = Anime.query.get(id)
    if not anime:
        return {"errors": ["Anime not found"]}, 404
    if not authorized(anime.user_id):
        return {"errors": ["Unauthorized"]}, 401
    db.session.delete(anime)
    db.session.commit()
    return {"message": "Successfully deleted anime"}


@anime_routes.route("/<int:id>", methods=["PUT"])
@login_required
def edit_anime(id):
    """
    Edit a anime by id
    """
    anime = Anime.query.get(id)
    if not anime:
        return {"errors": ["Anime not found"]}, 404
    if not authorized(anime.user_id):
        return {"errors": ["Unauthorized"]}, 401
    form = CreateAnime()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        anime.mal_id = form.data['mal_id']
        anime.title = form.data['title']
        anime.image = form.data['image']
        db.session.commit()
        return anime.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401
