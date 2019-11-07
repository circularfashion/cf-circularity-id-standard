#!/usr/bin/python3

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
    get,
    map as mapF,
)

from validations import (
    validate_one,
    validate_many,
)

import schema

script_name, *arguments = sys.argv

def die(): sys.exit()

def log(x):
    try:
        print(list(x))
    except:  # noqa: E722
        print(x)
    return x

def unpack(x):
    d = {
        'version': get('--version', x) or get('-v', x),
        'schema_file': get('--schema-file', x) or get('-s', x),
        'glob': get('--files', x) or get('-f', x),
    }
    return d

args_to_dict = compose(
    (chunk, 2),
    dict,
    unpack,
)

def schema_to_str(args):
    schema_str = None
    if get('version', args):
        schema_str = schema.from_version(get('version', args))
    elif get('schema_file', args):
        schema_str = schema.load_schema_file(get('schema_file', args))
    if not schema_str:
        print('you need to supply a schema version or file with -v or -s')
        die()
    return schema_str

args = args_to_dict(arguments)

print('using args', args)

schema_str = schema_to_str(args)

gl = get('glob', args) or './example/' + get('version', args)
print('glooob patternnn', gl)

# read a directory for xml files recursively else just use given one
gg = list(filter(
    lambda x: x.endswith('.xml'),
    glob(f'{gl}/**', recursive=True) + [gl]
))
print(f'running supplied schema on the following files')
print(gg)


# call('./convert.sh')
print('---------------------------------------------------------')
print('validating xml files!!!!')
print('---------------------------------------------------------')
for f in gg:
    xml = schema.load_schema_file(f)
    result = validate_one(schema_str, xml)
    print(f)
    print(result)
    print('-------------------------------------------')
