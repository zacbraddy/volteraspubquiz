import importlib
import os
from pathlib import Path

from database import create_tables


def discover_domains():
    src_dir = Path(__file__).parent
    domains = []

    for item in os.listdir(src_dir):
        domain_dir = src_dir / item
        if domain_dir.is_dir() and (domain_dir / "repositories").exists():
            domains.append(item)

    return domains


def init_db():
    create_tables()
    print("Created all database tables")

    domains = discover_domains()

    for domain in domains:
        try:
            try:
                importlib.import_module(f"{domain}.schemas.vehicle")
            except ImportError:
                pass

            try:
                importlib.import_module(f"{domain}.schemas.vehicle_data")
            except ImportError:
                pass

            try:
                init_module = importlib.import_module(f"{domain}.repositories.init_db")
                if hasattr(init_module, "init_db"):
                    init_module.init_db()
                    print(f"Initialized database for {domain}")
            except ImportError:
                pass
        except Exception as e:
            print(f"Error initializing {domain}: {str(e)}")

    print("Database initialization complete.")
