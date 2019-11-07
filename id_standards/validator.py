from lxml import etree
from io import StringIO

# just so that you don't keep making the object.  also just testing if it works
validator = None
_schema = None

parser = etree.XMLParser(ns_clean=True, recover=True, encoding='utf-8')

def set_schema(schema:str):
    global _schema
    global validator
    if schema != _schema:
        _schema = schema
        relaxng_doc = etree.fromstring(bytes(schema, encoding='utf-8'))
        validator = etree.RelaxNG(relaxng_doc)

def errors():
    return validator.error_log or 'XML is valid according to schema'

def validate(xml: str):
    doc = etree.fromstring(bytes(xml, encoding='utf-8'))
    validP = validator.validate(doc)
    return validP
