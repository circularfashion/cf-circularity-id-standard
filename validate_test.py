#!/usr/bin/python

# Hello!
# please send me a -f file path to an xml file
# and a --schema-version that I will read from ./schema!
#

import sys
from lxml import etree

from subprocess import call

from fnc import (
    chunk,
    compose,
    keyby,
)

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
    expected_args = ('-f', '--schema-version')
    f, s = expected_args
    try:
        return (x[f], x[s])
    except:  # noqa: E722
        print('Error!!! -- Expected arguments', expected_args)
        die()


args_to_dict = compose(
    (chunk, 2),
    dict,
    unpack,
)

f, schema = args_to_dict(arguments)

print(f, schema)

relaxng_doc = etree.parse('_built/schema/' + schema + '.rnc.rng')

validator = etree.RelaxNG(relaxng_doc)

doc = etree.parse(f)

print('validation ran sucessfully, the supplied xml document has the following validation:')
valid = validator.validate(doc)

print(valid)
print(validator.error_log)
