from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import db, List
from .auth_routes import validation_errors_to_error_messages, authorized
from app.forms import CreateList, UpdateList

list_routes = Blueprint("lists", __name__)


@list_routes.route("")
@login_required
def lists():
    """
    Query for all lists and returns them in a list of list dictionaries
    """
    lists = List.query.all()
    return {'lists': [list.to_dict() for list in lists]}


@list_routes.route("/<int:id>")
@login_required
def list(id):
    """
    Query for a list by id and returns that list in a dictionary
    """
    list = List.query.get(id)
    if not list:
        return {"errors": ["List not found"]}, 404
    return list.to_dict()


@list_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_list(id):
    """
    Deletes a list by id
    """
    list = List.query.get(id)

    if not list:
        return {"errors": ["List not found"]}, 404

    if not authorized(list.userId):
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

    if not authorized(list.userId):
        return {"errors": ["Unauthorized"]}, 401

    if list and form.validate_on_submit():
        list.name = form.data['name']
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
            name=form.data['name'],
            userId=form.data['userId'],
        )
        db.session.add(list)
        db.session.commit()
        return list.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
