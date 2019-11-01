#!/usr/bin/python

# Hello!
# please send me a -f file path to an xml file
# and a --schema-version that I will read from ./schema!
#

import sys
from glob import glob

from subprocess import call

from fnc import (
    chunk,
    compose,
    keyby,
)

from validations import (
    validate_one,
    validate_many,
)

import uhuh

call('./convert.sh')

script_name, *arguments = sys.argv


def die(): sys.exit()


def log(x):
    try:
        print(list(x))
    except:  # noqa: E722
        print(x)
    return x


def unpack(x):
    expected_args = ('-v')
    optional_args = ('-p')
    v, = expected_args
    fp, = optional_args
    try:
        map(lambda y: x[y], expected_args)
    except:  # noqa: E722
        print('Error!!! -- Expected arguments', expected_args)
        die()
    return ()


args_to_dict = compose(
    (chunk, 2),
    dict,
    unpack,
)

f, schema = args_to_dict(arguments)

print(f, schema)

schema_file = './schema/' + schema + '/schema.rng'

v = validate_one(schema_file, f)

print(v)

uhuh.u()

gg = glob('**', recursive=True)
print(gg)
