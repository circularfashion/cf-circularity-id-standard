#!/usr/bin/python

import sys
from lxml import etree

from jingtrang import trang

from fnc import (
    chunk,
    compose,
    keyby,
)

script_name, *arguments = sys.argv


def log(x):
    try:
        print(list(x))
    except:  # noqa: E722
        print(x)
    return x


def unpack(x):
    try:
        return (
            x['-f'],
            x['--schema-version']
        )
    except:  # noqa: E722
        print('Error!!! -- Expected arguments -f and --schema-version!!')
        sys.exit()


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

valid = validator.validate(doc)

print(valid)
print(validator.error_log)
