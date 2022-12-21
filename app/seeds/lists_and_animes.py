from app.models import db, List, Anime, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_lists_and_animes():
    all_anime = List(
        owner_id=1, title='All Anime', private=True
    )
    currently_watching = List(
        owner_id=1, title='Currently Watching', private=True
    )
    completed = List(
        owner_id=1, title='Completed', private=True
    )
    on_hold = List(
        owner_id=1, title='On Hold', private=True
    )
    dropped = List(
        owner_id=1, title='Dropped', private=True
    )
    plan_to_watch = List(
        owner_id=1, title='Plan to Watch', private=True
    )
    all_anime2 = List(
        owner_id=2, title='All Anime', private=True
    )
    currently_watching2 = List(
        owner_id=2, title='Currently Watching', private=True
    )
    completed2 = List(
        owner_id=2, title='Completed', private=True
    )
    on_hold2 = List(
        owner_id=2, title='On Hold', private=True
    )
    dropped2 = List(
        owner_id=2, title='Dropped', private=True
    )
    plan_to_watch2 = List(
        owner_id=2, title='Plan to Watch', private=True
    )

    db.session.add_all([all_anime, currently_watching, completed, on_hold, dropped, plan_to_watch,
                       all_anime2, currently_watching2, completed2, on_hold2, dropped2, plan_to_watch2])
    db.session.commit()

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

    all_anime.animes.append(full_metal_alchemist)
    currently_watching.animes.append(full_metal_alchemist)
    all_anime.animes.append(demon_slayer)
    currently_watching.animes.append(demon_slayer)
    all_anime.animes.append(naruto)
    currently_watching.animes.append(naruto)

    all_anime2.animes.append(full_metal_alchemist)
    currently_watching2.animes.append(full_metal_alchemist)
    all_anime2.animes.append(demon_slayer)
    currently_watching2.animes.append(demon_slayer)
    all_anime2.animes.append(naruto)
    currently_watching2.animes.append(naruto)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_lists_and_animes():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.lists RESTART IDENTITY CASCADE;")
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.animes RESTART IDENTITY CASCADE;")
        # db.session.execute(
        #     f"TRUNCATE table {SCHEMA}.anime_list RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM lists")
        db.session.execute("DELETE FROM animes")
        # db.session.execute("DELETE FROM anime_list")

    db.session.commit()
