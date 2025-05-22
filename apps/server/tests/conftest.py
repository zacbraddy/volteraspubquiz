import sys
from pathlib import Path

import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, declarative_base

sys.path.insert(0, str(Path(__file__).parent.parent / "src"))

Base = declarative_base()


@pytest.fixture(scope="session")
def engine():
    return create_engine("sqlite:///:memory:")


@pytest.fixture(scope="session")
def tables(engine):
    Base.metadata.create_all(engine)
    yield
    Base.metadata.drop_all(engine)


@pytest.fixture
def db_session(engine, tables):
    connection = engine.connect()
    transaction = connection.begin()
    session = Session(bind=connection)

    yield session

    session.close()
    transaction.rollback()
    connection.close()


@pytest.fixture(autouse=True)
def mock_get_db(monkeypatch, db_session):
    def mock_get_db_func():
        yield db_session

    monkeypatch.setattr("database.get_db", mock_get_db_func)
    monkeypatch.setenv("DATABASE_URL", "sqlite:///:memory:")
