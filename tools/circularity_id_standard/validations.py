from functools import (
    partial
)

from fnc import (
    map as mapF,
)

from .schema import (
    from_version,
)

from .validator import (
    validate,
    set_schema,
    errors
)

def validate_one(schema: str, xml: str) -> list:
    set_schema(schema)
    return [validate(xml), errors()]

def validate_many(schema: str, xmls: list) -> list:
    v = partial(validate_one, schema)
    return mapF(v, xmls)

def validate_on_version(version: str, xml: str) -> list:
    s = from_version(version)
    return validate_one(s, xml)

def validate_many_on_version(version: str, xmls: list):
    v = partial(validate_on_version, version)
    return mapF(v, xmls)
