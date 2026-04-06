from db import database


COMPANIES = database.table("companies")
EMPLOYEES = database.table("employees")
EULER_TOURS = database.table("euler_tours")
ROLES = database.table("roles")
TOKENS = database.table("tokens")


def get_table(name: str):
    return database.table(name)
