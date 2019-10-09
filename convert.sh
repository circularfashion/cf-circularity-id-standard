#!/bin/bash

mkdir -p _built/schema

for f in schema/*.rnc; do
  echo $f
  pytrang $f _built/$f.rng
done
