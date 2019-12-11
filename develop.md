
![circularity id logo](logo.jpg)

# Developing circularity.ID

## Developing the data format (schema)

The schema is a [relaxng](https://relaxng.org/) schema, as the goal is to create product xml data.  We have created versions of the data so that changes to the schema do not explicitly force data formats.  It is up to each system using the schema to decide which versions it accepts.

This means any change in the schema that would affect a change in data of the previous schema should warrant it's own version number, and must supply examples of failing and passing xml files.

Everything related to the schema is in `./schema`, and the examples are in `./examples`

relaxng is a little bit difficult to parse, but there are validators in many different languages for many different systems.  The wikipedia article for relaxng is very helpful: [https://en.wikipedia.org/wiki/RELAX_NG](https://en.wikipedia.org/wiki/RELAX_NG)

the schema can be edited either directly in the `.rng` or `.rnc` files, or using a GUI editor such as [\<oxygen \/\> xml editor](https://www.oxygenxml.com/) - as long as the resulting files are stored in `./schema/$VERSION/schema.rng` and `./schema/$VERSION/schema.rnc`

one goal is to keep the xml schema simple enough that the data for it can cleanly be converted to simple json format, and then back into valid xml.  this conversion script is still in development.

### schema rules

we have a few things we like to lean on and some standards that we adhere to with the relaxng schema definitions.

- refs should be `IN_ALL_UPPERCASE` to distinguish them from regular elements
- element names should use underscores (`_`) and not dashes (`-`)
- refs should be the same name as the element they include, just in uppercase


## Python circularity.ID standard tools

additionally, there is a small python module bundled with the schema (`./tools/circularity_id_standard`) - this module can do validation, testing, as well as a batch of useful xml utilities to be used in applications.

## requirements

```
python3.8
```
## installing the tools

`pip install -r tools/requirements.txt`

development uses pylint with the supplied pylintrc file.

## Testing the data format and validations

for each version of the schema, example xml files should be created.  These exammple files should account for product xml files that are valid according to the schema version as well as those that are not.

correct examples should go into `examples/[VERSION]/passing`, and failing into `examples/[VERSION]/failing`

you can use the command line script `python tools/test.py` to do fun things with testing these files. Additionally, it will make sure that the schema stands the test of time and can always be validated off of it's examples.

##### script options

- `--version` (`-v`): a schema version to test against.  from ./schema/[x].
  - example `0.01` or `0.02`
- `--schema-file` (`-s`): path to a specific schema file instead of a schema version number.
  - example `./schema/development/schema.rng`
- `--files` (`-f`): a path to a file or the glob pattern to the xml files to test against.
  - example `./examples/testing/*` or `./new_example.xml`

##### examples

```bash
# this command will test ALL failing and passing for schema version 0.01
python tools/test.py -v 0.01
```

```bash
# this command will test a certain version on all .xml files in a path
python tools/test.py -v 0.01 -f ./examples/0.02/failing
```

```bash
# additionally, you can hand it a specific .rng schema file using -s
python tools/test.py -s schema/testing.rng -f examples
```


## python tools development

### using the library

```python
from circularity_id_standards.validations import (
    validate_on_version
)

invalid_xml = '<product></product>'

valid_xml = '<book><page /><page /></book>'

validate_on_version('0.01', xml_valid)
# [True, 'XML is valid according to schema']

validate_on_version('0.01', xml_invalid)
# [False, <string>:1:0:ERROR:RELAXNGV:RELAXNG_ERR_ELEMNAME: Expecting element book, got product]
```


## XML utilities

##### normalize

##### merge

merges two or more xml strings, data left takes precedence.  for merging disparate datasetos

```python
from circularity_id_standards.utils.xml import (
    merge,
)

xml1 = '<pd />'
xml2 = '<pdd />'
xml3 = '<pdd><data1 /></pdd>'

merge(xml1, xml2, xml3)
# b'<pdd><data1/></pdd>'
```

##### equals

tests the equality of xml strings disregarding whitespace, docstrings, order, or other inconsistincies.  'is the data the same?'

```python
from circularity_id_standards.utils.xml import (
    equals
)

xml1 = '<pd />'
xml2 = '<pdd />'
xml3 = '<pdd><data1 /></pdd>'
xml4 = '<pdd><data1></data1></pdd>'

equals(xml1, xml4)
# False

equals(xml3, xml4)
# True
```
