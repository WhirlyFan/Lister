from app.models import db, User, environment


def seed_followers():
    demo = User.query.get(1)
    marnie = User.query.get(2)
    bobby = User.query.get(3)

    demo.followed.extend([marnie, bobby])
    marnie.followed.extend([demo])

    db.session.commit()


def undo_followers():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.followers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM followers")
        db.session.commit()
