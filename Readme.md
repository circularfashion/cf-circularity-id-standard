
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

```
python validate_test.py -f example/0.01.xml --schema-version 0.01
```

or try a failing one!

```
python validate_test.py -f failing_example/0.01.xml --schema-version 0.01
```

## research:

automatically generate webforms from `.rng`:

http://debeissat.nicolas.free.fr/RNGtoHTMLform.php
