from setuptools import setup

setup(
    name='circularity-id-standard',
    version='1.0',
    description='circular.fashion circularity.ID Standard',
    url='http://github.com/circularfashion/cf-circularity-id-standard',
    author='Circular.Fashion UG (haftungsbeschraenkt)',
    author_email='develop@circular.fashion',
    license='GPLv3',
    packages=['circularity_id_standard'],
    package_dir={'': 'tools'},
    install_requires = [ # also update ./tools/requirements.txt
        'xmldiff==2.4',
        'xmltodict==0.12.0',
        'fnc==0.4.0',
        'lxml==4.6.3',
        'jingtrang==0.1.2',
    ],
    zip_safe=False
)
