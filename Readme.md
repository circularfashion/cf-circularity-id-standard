
### cf standards for circular id data (iso norm?)


included in this repository are the standard definitions for iso norms for this data

as well as example xml files

don't actually use dtd, instead

https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=relax-ng

see syntax here: https://www.oasis-open.org/committees/relax-ng/compact-20021121.html

the compact version for ease.

very helpful wikipedia article:
https://en.wikipedia.org/wiki/RELAX_NG


### TEST VALIDATING THE STANDARDS!

first you must convert the schemas from `.rnc` to `.rng`

```
./convert.sh
```

you can use the command line script to do fun things!

```
# this command will test ALL failing and passing for schema version 0.01
python id_standards/test.py -v 0.01

# this command will test a certain version on all .xml files in a path
python id_standards/test.py -v 0.01 -f ./example/0.02/failing

# additionally, you can hand it a specific .rng schema file using -s
python id_standards/test.py -s schema/testing.rng -f example

```


## research:

automatically generate webforms from `.rng`:

http://debeissat.nicolas.free.fr/RNGtoHTMLform.php
