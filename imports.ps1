echo "@import url(../vendor/normalize.css);" > ./pages/index.css

$paths = Get-ChildItem -Path blocks -Include "*.css" -Recurse
foreach ($path in $paths)
{
  $name = $path.Name;
  echo "@import url(../$name);" >> ./pages/index.css
}

echo "@import url(../vendor/fonts/inter.css);" >> ./pages/index.css