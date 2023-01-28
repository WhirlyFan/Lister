from flask.cli import AppGroup
from .users import seed_users, undo_users
from .reviews import seed_reviews, undo_reviews
from .lists_and_animes import seed_lists_and_animes, undo_lists_and_animes
from .followers import seed_followers, undo_followers
from .channels_messages import seed_channels_messages, undo_channels_messages
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_lists_and_animes()
        undo_reviews()
        undo_followers()
        undo_channels_messages()
    seed_users()
    seed_lists_and_animes()
    seed_reviews()
    seed_followers()
    seed_channels_messages()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_lists_and_animes()
    undo_reviews()
    undo_followers()
    undo_channels_messages()
    # Add other undo functions here
