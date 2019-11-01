from lxml import etree

validator = None
remember_schema = None

def set_schema(schema_file):
    global remember_schema
    global validator
    if schema_file != remember_schema:
        remember_schema = schema_file
        relaxng_doc = etree.parse(schema_file)
        validator = etree.RelaxNG(relaxng_doc)

def errors():
    return validator.error_log or 'XML is valid according to schema'

def validate(xml_file):
    doc = etree.parse(xml_file)
    validP = validator.validate(doc)
    return validP
