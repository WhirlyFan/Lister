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

# new animes

    code_geass_2 = Anime(
        mal_id=2904, title="Code Geass: Hangyaku no Lelouch R2", image="https://cdn.myanimelist.net/images/anime/4/9391.jpg"
    )

    mob_psycho_2 = Anime(
        mal_id=37510, title="Mob Psycho 100 II", image="https://cdn.myanimelist.net/images/anime/1918/96303.jpg"
    )

    spirited_away = Anime(
        mal_id=199, title="Sen to Chihiro no Kamikakushi", image="https://cdn.myanimelist.net/images/anime/6/79597.jpg"
    )

    cowboy_bebop = Anime(
        mal_id=1, title="Cowboy Bebop", image="https://cdn.myanimelist.net/images/anime/4/19644.jpg"
    )

    vinland_saga = Anime(
        mal_id=37521, title="Vinland Saga", image="https://cdn.myanimelist.net/images/anime/1500/103005.jpg"
    )

    my_hero_6 = Anime(
        mal_id=49918, title="Boku no Hero Academia 6th Season", image="https://cdn.myanimelist.net/images/anime/1483/126005.jpg"
    )

    detective_conan = Anime(
        mal_id=235, title="Detective Conan", image="https://cdn.myanimelist.net/images/anime/7/75199.jpg"
    )

    tokyo_revengers = Anime(
        mal_id=42249, title="Tokyo Revengers", image="https://cdn.myanimelist.net/images/anime/1839/122012.jpg"
    )

    chainsaw_man = Anime(
        mal_id=44511, title="Chainsaw Man", image="https://cdn.myanimelist.net/images/anime/1806/126216.jpg"
    )

    code_geass_1 = Anime(
        mal_id=1575, title="Code Geass: Hangyaku no Lelouch", image="https://cdn.myanimelist.net/images/anime/5/50331.jpg"
    )

    spyxfamily = Anime(
        mal_id=50265, title="Spy x Family", image="https://cdn.myanimelist.net/images/anime/1441/122795.jpg"
    )

    made_in_abyss = Anime(
        mal_id=34599, title="Made in Abyss", image="https://cdn.myanimelist.net/images/anime/6/86733.jpg"
    )

    princess_mononoke = Anime(
        mal_id=164, title="Mononoke Hime", image="https://cdn.myanimelist.net/images/anime/7/75919.jpg"
    )

    jujutsu_kaisen = Anime(
        mal_id=40748, title="Jujutsu Kaisen", image="https://cdn.myanimelist.net/images/anime/1171/109222.jpg"
    )

    cyberpunk_edgerunners = Anime(
        mal_id=42310, title="Cyberpunk: Edgerunners", image="https://cdn.myanimelist.net/images/anime/1818/126435.jpg"
    )

    death_note = Anime(
        mal_id=1535, title="Death Note", image="https://cdn.myanimelist.net/images/anime/9/9453.jpg"
    )

    fate_zero_2 = Anime(
        mal_id=11741, title="Fate/Zero 2nd Season", image="https://cdn.myanimelist.net/images/anime/1522/117645.jpg"
    )

    neon_genesis_end = Anime(
        mal_id=32, title="Neon Genesis Evangelion: The End of Evangelion", image="https://cdn.myanimelist.net/images/anime/1404/98182.jpg"
    )

    attack_on_titan = Anime(
        mal_id=16498, title="Shingeki no Kyojin", image="https://cdn.myanimelist.net/images/anime/10/47347.jpg"
    )

    steins_gate_0 = Anime(
        mal_id=30484, title="Steins;Gate 0", image="https://cdn.myanimelist.net/images/anime/1375/93521.jpg"
    )

    one_punch_man = Anime(
        mal_id=30276, title="One Punch Man", image="https://cdn.myanimelist.net/images/anime/12/76049.jpg"
    )

    mob_psycho_1 = Anime(
        mal_id=32182, title="Mob Psycho 100", image="https://cdn.myanimelist.net/images/anime/8/80356.jpg"
    )

    banana_fish = Anime(
        mal_id=36649, title="Banana Fish", image="https://cdn.myanimelist.net/images/anime/1190/93472.jpg"
    )

    nichijou = Anime(
        mal_id=10165, title="Nichijou", image="https://cdn.myanimelist.net/images/anime/3/75617.jpg"
    )

    db.session.add_all([
        full_metal_alchemist, demon_slayer, naruto, one_piece, bleach1000, kaguya_sama, steins_gate,
        gintama, hunterxhunter, fruit_basket, violet_evergarden, kimi_no_wa, shingeki_no_kyojin_final_season,
        code_geass_2, mob_psycho_2, spirited_away, cowboy_bebop, vinland_saga, my_hero_6, detective_conan,
        tokyo_revengers, chainsaw_man, code_geass_1, spyxfamily, made_in_abyss, princess_mononoke, jujutsu_kaisen,
        cyberpunk_edgerunners, death_note, fate_zero_2, neon_genesis_end, attack_on_titan, one_punch_man, mob_psycho_1,
        banana_fish, nichijou
    ])
    db.session.commit()

    completed.animes.append(full_metal_alchemist)
    completed.animes.append(demon_slayer)
    completed.animes.append(one_piece)
    completed.animes.append(steins_gate)
    completed.animes.append(gintama)
    completed.animes.append(hunterxhunter)
    completed.animes.append(vinland_saga)
    completed.animes.append(code_geass_2)
    completed.animes.append(spirited_away)
    completed.animes.append(death_note)
    completed.animes.append(fate_zero_2)
    completed.animes.append(neon_genesis_end)
    on_hold.animes.append(mob_psycho_2)
    on_hold.animes.append(cowboy_bebop)
    on_hold.animes.append(my_hero_6)
    on_hold.animes.append(detective_conan)
    on_hold.animes.append(attack_on_titan)
    on_hold.animes.append(steins_gate_0)
    on_hold.animes.append(one_punch_man)
    currently_watching.animes.append(naruto)
    currently_watching.animes.append(bleach1000)
    currently_watching.animes.append(kaguya_sama)
    currently_watching.animes.append(fruit_basket)
    currently_watching.animes.append(mob_psycho_1)
    currently_watching.animes.append(banana_fish)
    currently_watching.animes.append(nichijou)
    favorites.animes.append(violet_evergarden)
    favorites.animes.append(shingeki_no_kyojin_final_season)
    favorites.animes.append(tokyo_revengers)
    favorites.animes.append(chainsaw_man)
    favorites.animes.append(code_geass_1)
    favorites.animes.append(spyxfamily)
    plan_to_watch.animes.append(kimi_no_wa)
    plan_to_watch.animes.append(made_in_abyss)
    plan_to_watch.animes.append(princess_mononoke)
    plan_to_watch.animes.append(jujutsu_kaisen)
    plan_to_watch.animes.append(cyberpunk_edgerunners)

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
