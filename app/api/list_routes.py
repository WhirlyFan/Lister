from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import db, List
from .auth_routes import validation_errors_to_error_messages, authorized
from app.forms import CreateList, UpdateList

list_routes = Blueprint("lists", __name__)


@list_routes.route("", methods=["GET"])
@login_required
def lists():
    """
    Query for all lists and returns them in a list of list dictionaries
    """
    lists = List.query.all()
    return {'lists': [list.to_dict() for list in lists]}


@list_routes.route("/<int:id>", methods=["GET"])
@login_required
def list(id):
    """
    Query for a list by id and returns that list in a dictionary
    """
    list = List.query.get(id)
    if not list:
        return {"errors": ["List not found"]}, 404
    if not authorized(list.owner_id) and list.private:
        return {"errors": ["Unauthorized"]}, 401
    return list.to_dict()


@list_routes.route("/users/<int:id>", methods=["GET"])
@login_required
def user_lists(id):
    """
    Query for all lists owned by a user and returns them in a list of list dictionaries
    """
    lists = List.query.filter(List.owner_id == id).all()
    if id != current_user.id:
        lists = [list for list in lists if not list.private]
    if not lists:
        return {"errors": ["No lists found"]}, 404
    return {'lists': [list.to_dict() for list in lists]}


@list_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_list(id):
    """
    Deletes a list by id
    """
    list = List.query.get(id)

    if not list:
        return {"errors": ["List not found"]}, 404

    if not authorized(list.owner_id):
        return {"errors": ["Unauthorized"]}, 401

    db.session.delete(list)
    db.session.commit()
    return {"message": "Successfully deleted list"}


@list_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_list(id):
    """
    Updates a list by id
    """
    form = UpdateList()
    form['csrf_token'].data = request.cookies['csrf_token']

    list = List.query.get(id)

    if not authorized(list.owner_id):
        return {"errors": ["Unauthorized"]}, 401

    if list and form.validate_on_submit():
        list.name = form.data['name']
        list.private = form.data['private']
        db.session.commit()
        return list.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@list_routes.route("", methods=["POST"])
@login_required
def create_list():
    """
    Creates a list
    """
    form = CreateList()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        list = List(
            owner_id=current_user.id,
            name=form.data['name'],
            private=form.data['private']
        )
        db.session.add(list)
        db.session.commit()
        return list.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
