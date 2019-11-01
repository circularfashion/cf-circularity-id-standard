#!/bin/bash

for d in `find $PWD/schema -mindepth 1 -type d`; do
  echo '-------------------'
  echo $d
  rng=`find $d -type f -name *.rng -print | head -n 1`
  rnc=`find $d -type f -name *.rnc -print | head -n 1`
  echo $rng
  echo $rnc
  if [[ $rng ]] && [[ $rnc ]]; then
      echo $rng
      echo $rnc
      echo 'has rng and rnc, do nothing!'
     continue
  fi
  if [[ $rnc ]]; then
      echo 'got only rnc, converting to rng'
      echo $rnc
      pytrang $rnc $d/schema.rng
  fi
  if [[ $rng ]]; then
      echo 'got only rng, converting to rnc'
      echo $rng
      pytrang $rng $d/schema.rnc
  fi
done
