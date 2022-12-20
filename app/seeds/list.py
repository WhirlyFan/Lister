from app.models import db, List, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_lists():
    all_anime = List(
        owner_id=1, title='All Anime', type='anime', private=True
    )
    currently_watching = List(
        owner_id=1, title='Currently Watching', type='anime', private=True
    )
    completed = List(
        owner_id=1, title='Completed', type='anime', private=True
    )
    on_hold = List(
        owner_id=1, title='On Hold', type='anime', private=True
    )
    dropped = List(
        owner_id=1, title='Dropped', type='anime', private=True
    )
    plan_to_watch = List(
        owner_id=2, title='Plan to Watch', type='anime', private=True
    )
    all_anime2 = List(
        owner_id=2, title='All Anime', type='anime', private=True
    )
    currently_watching2 = List(
        owner_id=2, title='Currently Watching', type='anime', private=True
    )
    completed2 = List(
        owner_id=2, title='Completed', type='anime', private=True
    )
    on_hold2 = List(
        owner_id=2, title='On Hold', type='anime', private=True
    )
    dropped2 = List(
        owner_id=2, title='Dropped', type='anime', private=True
    )
    plan_to_watch2 = List(
        owner_id=2, title='Plan to Watch', type='anime', private=True
    )

    db.session.add_all([all_anime, currently_watching, completed, on_hold, dropped, plan_to_watch,
                       all_anime2, currently_watching2, completed2, on_hold2, dropped2, plan_to_watch2])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_lists():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.lists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM lists")

    db.session.commit()
