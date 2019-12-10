
# Developing circularity.ID

## Developing the data format (schema)

## Testing the data format and validations

## python tools development

### using the library

```
from id_standards import validations
xml_invalid = '<product></product>'
xml_valid = '<book><page /><page /></book>'
validations.validate_on_version('0.01', xml_valid)
 [True, 'XML is valid according to schema']
validations.validate_on_version('0.01', xml_invalid)

[False,
 <string>:1:0:ERROR:RELAXNGV:RELAXNG_ERR_ELEMNAME: Expecting element book, got product]
```


### TEST VALIDATING THE STANDARDS!


you can use the command line script to do fun things!

```
options
   must set one of these two:
     --version (-v): a schema version to test against.  from ./schema/[x]
     --schema-file (-s): path to a specific schema file
   and also:
     --files (-f): a path to a file or the glob pattern to the xml files to test against

# this command will test ALL failing and passing for schema version 0.01
python tools/test.py -v 0.01

# this command will test a certain version on all .xml files in a path
python tools/test.py -v 0.01 -f ./examples/0.02/failing

# additionally, you can hand it a specific .rng schema file using -s
python tools/test.py -s schema/testing.rng -f examples

```

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
