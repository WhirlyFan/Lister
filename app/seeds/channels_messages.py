from app.models import db, Channel, Message, User, environment, SCHEMA

def seed_channels_messages():
    channel1 = Channel()
    channel2 = Channel()
    channel3 = Channel()

    db.session.add_all([channel1, channel2, channel3])
    db.session.commit()

    message1 = Message(user_id = 1, channel_id = 1, message = "Hi Marnie!")
    message2 = Message(user_id = 2, channel_id = 1, message = "Hi Demo!")
    message3 = Message(user_id = 2, channel_id = 2, message = "Hello World!")

    db.session.add_all([message1, message2, message3])
    db.session.commit()

    demo = User.query.get(1)
    marnie = User.query.get(2)
    bobbie = User.query.get(3)
    whirlyfan = User.query.get(4)

    channel1.users.extend([demo, marnie])
    channel2.users.extend([demo, bobbie, whirlyfan])
    channel3.users.extend([marnie, bobbie])

    db.session.commit()


def undo_channels_messages():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.channel_members RESTART IDENTITY CASCADE;")
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.channels RESTART IDENTITY CASCADE;")
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM channel_members")
        db.session.execute("DELETE FROM channels")
        db.session.execute("DELETE FROM messages")
        db.session.commit()
