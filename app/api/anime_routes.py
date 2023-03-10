from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Anime, List
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


@anime_routes.route("/mal/<int:mal_id>", methods=["GET"])
def mal_anime(mal_id):
    """
    Query for an anime by mal_id in Lister and returns that anime in a dictionary
    """
    anime = Anime.query.filter(Anime.mal_id == mal_id).first()
    if not anime:
        return {"errors": ["Anime not found"]}, 404
    return anime.to_dict()


@anime_routes.route("/lists/<int:id>", methods=["GET"])
@login_required
def list_animes(id):
    """
    Query for all animes in a list and returns them in a list of anime dictionaries
    """
    list = List.query.get(id)
    if not list:
        return {"errors": ["List not found"]}, 404
    if not authorized(list.owner_id) and list.private:
        return {"errors": ["Unauthorized"]}, 401
    return {'animes': [anime for anime in list.to_dict()['anime']]}


@anime_routes.route("/users/<int:id>", methods=["GET"])
def user_animes(id):
    """
    Query for all unique animes in all of a user's lists and returns them in a list of anime dictionaries
    """
    Lists = List.query.filter(List.owner_id == id).all()
    if not Lists:
        return {"errors": ["No lists found"]}, 404
    animes = []
    for list in Lists:
        if not list.private or (list.private and current_user.is_authenticated and list.owner_id == current_user.id):
            animes.extend(list.to_dict()['anime'])
    unique_anime = set([tuple(anime.items())
                        for anime in animes])  # remove duplicates
    unique_anime = [dict(anime)
                    for anime in unique_anime]  # convert back to dict
    return {'animes': [anime for anime in unique_anime]}


@anime_routes.route("", methods=["POST"])
@login_required
def create_anime():
    """
    Create a new anime
    """
    form = CreateAnime()
    form['csrf_token'].data = request.cookies['csrf_token']

    if Anime.query.filter(Anime.mal_id == form.data['mal_id']).first():
        return {"errors": ["Anime already exists"]}, 401

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


@anime_routes.route("/<int:anime_id>/lists/<int:list_id>", methods=["POST"])
@login_required
def add_anime(anime_id, list_id):
    """
    Add a anime to a list
    """
    anime = Anime.query.get(anime_id)
    if not anime:
        return {"errors": ["Anime not found"]}, 404
    list = List.query.get(list_id)
    if not list:
        return {"errors": ["List not found"]}, 404
    if not authorized(list.owner_id):
        return {"errors": ["Unauthorized"]}, 401
    if anime in list.animes:
        return {"errors": ["Anime already in list"]}, 401
    list.animes.append(anime)
    db.session.commit()
    return {"anime": anime.to_dict(), "list": list.to_dict()}


@anime_routes.route("/<int:anime_id>/lists/<int:list_id>", methods=["DELETE"])
@login_required
def remove_anime(anime_id, list_id):
    """
    Remove a anime from a list
    """
    anime = Anime.query.get(anime_id)
    if not anime:
        return {"errors": ["Anime not found"]}, 404
    list = List.query.get(list_id)
    if not list:
        return {"errors": ["List not found"]}, 404
    if not authorized(list.owner_id):
        return {"errors": ["Unauthorized"]}, 401
    if anime not in list.animes:
        return {"errors": ["Anime not in list"]}, 401
    list.animes.remove(anime)
    db.session.commit()
    return {"anime": anime.to_dict(), "list": list.to_dict()}
