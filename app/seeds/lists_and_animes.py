from app.models import db, List, Anime, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_lists_and_animes():
    currently_watching = List(
        owner_id=1, name='Currently Watching', private=True
    )
    completed = List(
        owner_id=1, name='Completed', private=False
    )
    on_hold = List(
        owner_id=1, name='On Hold', private=False
    )
    favorites = List(
        owner_id=1, name='Favorites', private=False
    )
    plan_to_watch = List(
        owner_id=1, name='Plan to Watch', private=False
    )
    currently_watching2 = List(
        owner_id=2, name='Currently Watching', private=False
    )
    completed2 = List(
        owner_id=2, name='Completed', private=True
    )
    on_hold2 = List(
        owner_id=2, name='On Hold', private=False
    )
    favorites2 = List(
        owner_id=2, name='Favorites', private=False
    )
    plan_to_watch2 = List(
        owner_id=2, name='Plan to Watch', private=False
    )

    db.session.add_all([currently_watching, completed, on_hold, favorites, plan_to_watch,
                       currently_watching2, completed2, on_hold2, favorites2, plan_to_watch2])
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

    one_piece = Anime(
        mal_id=21, title="One Piece", image="https://cdn.myanimelist.net/images/anime/6/73245.jpg"
    )

    bleach1000 = Anime(
        mal_id=41467, title="Bleach: Sennen Kessen-hen", image="https://cdn.myanimelist.net/images/anime/1764/126627.jpg"
    )

    kaguya_sama = Anime(
        mal_id=43608, title="Kaguya-sama wa Kokurasetai: Ultra Romantic", image="https://cdn.myanimelist.net/images/anime/1160/122627.jpg"
    )

    steins_gate = Anime(
        mal_id=9253, title="Steins;Gate", image="https://cdn.myanimelist.net/images/anime/1935/127974.jpg"
    )

    gintama = Anime(
        mal_id=28977, title="Gintama°", image="https://cdn.myanimelist.net/images/anime/3/72078.jpg"
    )

    hunterxhunter = Anime(
        mal_id=11061, title="Hunter x Hunter (2011)", image="https://cdn.myanimelist.net/images/anime/1337/99013.jpg"
    )

    fruit_basket = Anime(
        mal_id=42938, title="Fruits Basket: The Final", image="https://cdn.myanimelist.net/images/anime/1085/114792.jpg"
    )

    violet_evergarden = Anime(
        mal_id=37987, title="Violet Evergarden Movie", image="https://cdn.myanimelist.net/images/anime/1825/110716.jpg"
    )

    kimi_no_wa = Anime(
        mal_id=32281, title="Kimi no Na wa.", image="https://cdn.myanimelist.net/images/anime/5/87048.jpg"
    )

    shingeki_no_kyojin_final_season = Anime(
        mal_id=40028, title="Shingeki no Kyojin: The Final Season", image="https://cdn.myanimelist.net/images/anime/1000/110531.jpg"
    )

    db.session.add_all([full_metal_alchemist, demon_slayer, naruto, one_piece, bleach1000, kaguya_sama, steins_gate,
                       gintama, hunterxhunter, fruit_basket, violet_evergarden, kimi_no_wa, shingeki_no_kyojin_final_season])
    db.session.commit()

    completed.animes.append(full_metal_alchemist)
    completed.animes.append(demon_slayer)
    completed.animes.append(one_piece)
    completed.animes.append(steins_gate)
    completed.animes.append(gintama)
    completed.animes.append(hunterxhunter)
    currently_watching.animes.append(naruto)
    currently_watching.animes.append(bleach1000)
    currently_watching.animes.append(kaguya_sama)
    currently_watching.animes.append(fruit_basket)
    favorites.animes.append(violet_evergarden)
    favorites.animes.append(shingeki_no_kyojin_final_season)
    plan_to_watch.animes.append(kimi_no_wa)

    completed2.animes.append(naruto)
    completed2.animes.append(demon_slayer)
    completed2.animes.append(full_metal_alchemist)
    completed2.animes.append(steins_gate)
    completed2.animes.append(one_piece)
    completed2.animes.append(hunterxhunter)
    completed2.animes.append(gintama)
    currently_watching2.animes.append(full_metal_alchemist)
    currently_watching2.animes.append(violet_evergarden)
    currently_watching2.animes.append(shingeki_no_kyojin_final_season)
    on_hold2.animes.append(kimi_no_wa)

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
            f"TRUNCATE table {SCHEMA}.anime_list RESTART IDENTITY CASCADE;")
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.lists RESTART IDENTITY CASCADE;")
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.animes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM anime_list")
        db.session.execute("DELETE FROM lists")
        db.session.execute("DELETE FROM animes")

    db.session.commit()
