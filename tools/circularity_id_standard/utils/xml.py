from json import loads, dumps

from functools import (
    partial,
)
from lxml import etree

from fnc import (
    compose,
)

from xmltodict import ( # should this library be trusted?
    parse as xml_to_o_dict,
    unparse as dict_to_xml,
)

class NotXmlError(Exception): pass

def assert_is_xml(xml: str) -> bool:
    try:
        etree.fromstring(xml)
    except ValueError:
        # look below in normalize func for an explanation of the following line
        raise NotXmlError(f'You did not supply xml!!  you may need to normalize it first, which you can do by importing the normalize function. \n  supplied xml: \n {xml}')
    return xml

def assert_are_xml(*args) -> bool:
    return compose(
        (map, assert_is_xml),
        list,
        all
    )(args)

def merge(*args) -> str:
    "take an arbitrary amont of xml strings and merge them left"
    assert_are_xml(*args)
    xmls = map(etree.fromstring, args)
    first, *rest = xmls
    for x in rest:
        first.extend(x)
    return etree.tostring(first)

known_multiple = [ # these are used in xmltodict to make sure the JSON representation is as arrays
                   # things that might have one item but should always be representated as arrays.
    'assembly',    # currently used only in the function below.
    'step',
    'certification',
    'component',
    'colour',
    'finishing',
    'chemical_compliance',
    'biodegradability_certification',
    'material_certification',
]

def to_dict(xml: str) -> dict:
    return compose(
        # turn xml into an ordered dictionary
        partial(xml_to_o_dict, force_list=known_multiple),
        # turn it into json and back to remove ordering
        # sorted keys because when we unparse it we want it to be normalized
        partial(dumps, sort_keys=True),
        loads
    )(xml)

def normalize(xml: str) -> str: #xml
    return compose(
        # turn the xml into a dictionary of normalized data
        to_dict,
        # use the xmltodict library to turn it back into xml
        dict_to_xml,
        # make sure that the xml encoding string is NOT included in them
        # normalized version, as this causes issues down the line.
        # the following line removes the first line of the output
        # which looks like <?xml version="1.0" encoding="UTF-8"?>
        lambda x: "\n".join(x.split("\n")[1:]),
    )(xml)

def apply_hash(xml: str, hashing_function=None) -> str:
    assert_is_xml(xml)
    if not hashing_function:
        hashing_function = hash
    normalized_xml = normalize(xml)
    return hashing_function(normalized_xml)

def equals(xml1: str, xml2: str) -> bool:
    assert_are_xml(xml1, xml2)
    d1, d2 = to_dict(xml1), to_dict(xml2)
    return d1 == d2



# from xmldiff.main import (
#     diff_texts
# )
# old method of equality testing, also kind of cool
# def equals(xml1, xml2) -> bool:
#     diffs: list = diff_texts(xml1, xml2)
#     # TODO: in the following
#     # ignore the following types from the list
#     # InsertComment - still equal even with comments
#     # MoveNode - we don't care about order
#     return not diffs
