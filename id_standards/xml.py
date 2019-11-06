
from lxml import etree

from xmldiff.main import (
    diff_texts
)

from xmltodict import ( # should this library be trusted?
    parse as xml_to_o_dict,
    unparse as dict_to_xml,
)

from json import loads, dumps

from copy import (
    deepcopy
)

def merge(xml1 : str, xml2 : str) -> str:
    # TODO: consider using convert to json, merge, then normalize to do this
    x1, x2 = etree.fromstring(xml1), etree.fromstring(xml2)
    new = deepcopy(x1) # and furthermore, mutability must be destroyed
    new.extend(x2) # yuck!!!
    return etree.tostring(new)

def to_dict(xml: str) -> dict:
    return loads(dumps(xml_to_o_dict(xml), sort_keys=True)) # i think it's pretty funny this has to be done
    # sorted keys because when we unparse it we want it to be normalized
    # it's here though because it has to happen at this part in the chain
    # also attempted was:
    # dict(xml_to_o_dict) this doesnt work nested lol

def normalize(xml: str) -> str: #xml
    return dict_to_xml(to_dict(xml))

def generate_hash(xml: str, hashing_function=None) -> str:
    normalized_xml = normalize(xml)
    if not hashing_function:
        hashing_function = hash
    return hashing_function(normalized_xml)

def equals(xml1: str, xml2: str) -> bool:
    # we do this because we do NOT care about dict order
    d1, d2 = to_dict(xml1), to_dict(xml2)
    return d1 == d2

# old method of equality testing, also kind of cool
# def equals(xml1, xml2) -> bool:
#     diffs: list = diff_texts(xml1, xml2)
#     # TODO: in the following
#     # ignore the following types from the list
#     # InsertComment - still equal even with comments
#     # MoveNode - we don't care about order
#     return not diffs
