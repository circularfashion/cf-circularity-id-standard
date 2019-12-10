### using the library

```
In [1]: from id_standards import validations
In [2]: xml_invalid = '<product></product>'
In [3]: xml_valid = '<book><page /><page /></book>'
In [4]: validations.validate_on_version('0.01', xml_valid)
Out[4]: [True, 'XML is valid according to schema']
In [5]: validations.validate_on_version('0.01', xml_invalid)
Out[5]:
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
In [1]: from id_standards.utils.xml import merge
In [2]: xml1 = '<pd />'
In [3]: xml2 = '<pdd />'
In [4]: xml3 = '<pdd><data1 /></pdd>'
In [5]: merge(xml1, xml2, xml3)
Out[5]: b'<pdd><data1/></pdd>'
```

##### equals
```
In [2]: xml1 = '<pd />'
In [3]: xml2 = '<pdd />'
In [4]: xml3 = '<pdd><data1 /></pdd>'
In [6]: xml4 = '<pdd><data1></data1></pdd>'
In [7]: from id_standards.utils.xml import equals
In [8]: equals(xml1, xml4)
Out[8]: False
In [9]: equals(xml3, xml4)
Out[9]: True
```
