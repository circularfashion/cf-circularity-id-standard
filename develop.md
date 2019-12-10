
# Developing circularity.ID

## Developing the data format (schema)

## installing the tools

`pip install -r tools/requirements.txt`

development uses pylint with the supplied pylintrc file.

## Testing the data format and validations

you can use the command line script `python tools/test.py` to do fun things!

script options
- `--version` (`-v`): a schema version to test against.  from ./schema/[x].
  - example `0.01` or `0.02`
- `--schema-file` (`-s`): path to a specific schema file instead of a schema version number.
  - example `./schema/development/schema.rng`
- `--files` (`-f`): a path to a file or the glob pattern to the xml files to test against.
  - example `./examples/testing` or `./new_example.xml`

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

```
from circularity_id_standards import validations

xml_invalid = '<product></product>'

xml_valid = '<book><page /><page /></book>'

validations.validate_on_version('0.01', xml_valid)
# [True, 'XML is valid according to schema']

validations.validate_on_version('0.01', xml_invalid)
# [False,
# <string>:1:0:ERROR:RELAXNGV:RELAXNG_ERR_ELEMNAME: Expecting element book, got product]
```

### TEST VALIDATING THE STANDARDS!

### XML utilities

##### merge
```
from id_standards.utils.xml import merge
xml1 = '<pd />'
xml2 = '<pdd />'
xml3 = '<pdd><data1 /></pdd>'
merge(xml1, xml2, xml3)
 b'<pdd><data1/></pdd>'
```

##### equals
```
xml1 = '<pd />'
xml2 = '<pdd />'
xml3 = '<pdd><data1 /></pdd>'
xml4 = '<pdd><data1></data1></pdd>'
from id_standards.utils.xml import equals
equals(xml1, xml4)
 False
equals(xml3, xml4)
 True
```
