# Watchify
Adding watchify into combination with browserify, gulp and react.

When browserify detects a change it will transform the entire js stack into a file.
This takes valuable time that any selfrespecting developer values. So unless you want to 
spend you day waiting (and getting cups of coffee), you will need watchify. Watchify 
caches file transformations and caches it. When files change it only transforms the
necessary part.

We also yet again implement the "production" commands with minifying as well.
No concat needed as browsify does it here. Also no watchify needed as we only do it once.

## Install
`npm install`

## Usage
```bash
gulp copy  # copy html to dist build-folder
gulp watch  # start watching changes in .html and .js files, but also convert all jsx files.

# production
gulp production  # replace html and create a minified version of js into dist/build
```

## References
* [watchify]() TODO: someurl...