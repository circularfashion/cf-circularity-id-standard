from os.path import (
    exists,
    join,
    dirname,
)

class SchemaNotFound(Exception):
    pass

def version_to_filepath(version: str) -> str:
    return join(dirname(__file__), '..', '..', 'schema', version, 'schema.rng')

def assert_file_exists(filepath: str) -> str:
    with open(filepath, 'r') as fii:
        return filepath

def assert_schema_exists(version: str):
    try:
        assert_file_exists(version_to_filepath(version))
    except:
        raise SchemaNotFound('the specified schema version was not found')

def load_schema_file(filepath: str) -> str:
    assert_file_exists(filepath)
    with open(filepath, 'r') as myfile:
        return myfile.read()


def from_version(version: str) -> str:
    assert_schema_exists(version)
    schema_file = version_to_filepath(version)
    return load_schema_file(schema_file)
