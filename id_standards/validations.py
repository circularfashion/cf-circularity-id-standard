from functools import (
    partial
)

from fnc import (
    map as mapF,
)

from . import schema

from . import validator

def validate_one(sch: str, xml: str):
    validator.set_schema(sch)
    return [validator.validate(xml), validator.errors()]

def validate_many(sch, xmls):
    validate = partial(validate_one, sch)
    return mapF(validate, xmls)

def validate_on_version(version: str, xml:str):
    s = schema.from_version(version)
    return validate_one(s, xml)

def validate_many_on_version(version: str, xmls: list):
    validate = partial(validate_on_version, version)
    return mapF(validate, xmls)
