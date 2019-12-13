
![circularity.id Open Data Standard Version 1.0](logo.jpg)

# Developing circularity.ID

This document is targeted at developers and who want to contribute to the
_circularity.ID_ standard.

## Developing the Data Format (Schema)

The schema is defined in the [RELAX NG](https://relaxng.org/) format.
The schema is versioned so that changes to the schema do not explicitly force
users to update existing XML data. It is up to each system using the schema to
decide which versions it accepts.

Version numbering should adhere to the conventions of
[semantic versioning](https://semver.org/):

> Given a version number MAJOR.MINOR.PATCH, increment the:
> - MAJOR version when you make incompatible API changes,
> - MINOR version when you add functionality in a backwards compatible manner, and
> - PATCH version when you make backwards compatible bug fixes.

This means any change in the schema that would affect an incompatible change in
data of the previous schema should warrant it's own MAJOR version number. Every
MAJOR and MINOR version must supply examples of failing and passing xml files.

Everything related to the schema is stored in `./schema`, and the examples are
in `./examples`.

RELAX NG is a little bit difficult to parse, but there are validators in many
different languages for many different systems. The Wikipedia article for
RELAX NG is very helpful:
[https://en.wikipedia.org/wiki/RELAX_NG](https://en.wikipedia.org/wiki/RELAX_NG)

The schema can be edited either directly in the `.rng` or `.rnc` files,
or using a GUI editor such as
[\<oxygen \/\> xml editor](https://www.oxygenxml.com/) - as long as the
resulting files are stored in `./schema/$VERSION/schema.rng` and
`./schema/$VERSION/schema.rnc`

One goal is to keep the XML schema simple enough that the data for it can
cleanly be converted into a simple JSON format, and then back into valid xml.
This conversion script is still in development.

### Schema Rules

We have a few things we like to lean on and some standards that we adhere to
with the relaxng schema definitions.

- refs should be `IN_ALL_UPPERCASE` to distinguish them from regular elements
- element names should use snake case (underscores (`_`) and not dashes (`-`))
- refs should be the same name as the element they include, just in uppercase
- two space indent ;)

Additionally, we have developed a few `refs` to use for validation

##### NOTEMPTY (string)

this ref is a string data that disallows empty strings in an element, but
allows newlines.

```html
  <define name="NOTEMPTY">
    <data type="string">
      <!-- allow for newlines, but not just whitespace -->
      <param name="pattern">
      (.|\n|\r)*\S(.|\n|\r)*</param>
      <!-- at least one character should be included -->
      <param name="minLength">
      1</param>
    </data>
  </define>
```

## Python circularity.ID Standard Tools

Additionally, there is a small [Python](https://python.org/) module bundled
with the schema (`./tools/circularity_id_standard`) - this module can do
validation, testing, as well as a batch of useful xml utilities to be used
in applications.

## Requirements

```
python3.8
```
## Installing the Tools

`pip install -r tools/requirements.txt`

Development uses `pylint` with the supplied pylintrc file.

## Testing the Data Format and Validations

for each version of the schema, example xml files should be created.  These exammple files should account for product xml files that are valid according to the schema version as well as those that are not.

correct examples should go into `examples/[VERSION]/passing`, and failing into `examples/[VERSION]/failing`

you can use the command line script `python tools/test.py` to do fun things with testing these files. Additionally, it will make sure that the schema stands the test of time and can always be validated off of it's examples.

##### Script Options

- `--version` (`-v`): a schema version to test against.  from ./schema/[x].
  - example `0.01` or `0.02`
- `--schema-file` (`-s`): path to a specific schema file instead of a schema version number.
  - example `./schema/development/schema.rng`
- `--files` (`-f`): a path to a file or the glob pattern to the xml files to test against.
  - example `./examples/testing/*` or `./new_example.xml`

##### Examples

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


## Python tools development

### Using the Library

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

##### Normalize

##### Merge

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

##### Equals

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
