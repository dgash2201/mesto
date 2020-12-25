#!/bin/bash

echo "@import url(../vendor/normalize.css);" > ./pages/index.css

for str in $(find blocks -name *.css)
do
	echo "@import url(../$str);" >> ./pages/index.css
done

echo "@import url(../vendor/fonts/inter.css);" >> ./pages/index.css