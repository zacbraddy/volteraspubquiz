import pendulum


def faker_pendulum_datetime(fake, **kwargs):
    dt = fake.date_time(**kwargs)
    return pendulum.instance(dt)
