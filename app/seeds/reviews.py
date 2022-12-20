from app.models import db, environment, SCHEMA
from app.models.review import Review


# Adds a demo user, you can add other users here if you want
def seed_reviews():
    review1 = Review(
       user_id=1, anime_id=1, rating=5, review="This is a great anime!"
    )
    review2 = Review(
        user_id=1, anime_id=2, rating=4, review="This is a good anime!"
    )
    review3 = Review(
        user_id=1, anime_id=3, rating=3, review="This is an ok anime!"
    )
    db.session.add_all([review1, review2, review3])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reviews")

    db.session.commit()
