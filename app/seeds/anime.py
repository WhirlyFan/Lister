from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_anime():
    full_metal_alchemist = Anime(
        mal_id=5114, title="Fullmetal Alchemist: Brotherhood", image="https://cdn.myanimelist.net/images/anime/1208/94745.jpg"
    )
    demon_slayer = Anime(
        mal_id=38000, title="Kimetsu no Yaiba", image="https://cdn.myanimelist.net/images/anime/1286/99889.jpg"
    )
    naruto = Anime(
        mal_id=20, title="Naruto", image="https://cdn.myanimelist.net/images/anime/13/17405.jpg"
    )
    db.session.add_all([full_metal_alchemist, demon_slayer, naruto])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_anime():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.anime RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM anime")

    db.session.commit()
