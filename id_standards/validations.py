from functools import (
    partial
)

from fnc import (
    map as mapF,
)

import schema

import validator

def validate_one(schema: str, xml: str):
    validator.set_schema(schema)
    return [validator.validate(xml), validator.errors()]

def validate_many(schema, xmls):
    validate = partial(validate_one, schema)
    return mapF(validate, xmls)

def validate_on_version(version: str, xml:str):
    s = schema.from_version(version)
    return validate_one(s, xml)

def validate_many_on_version(version: str, xmls: list):
    validate = partial(validate_on_version, version)
    return mapF(validate, xmls)
