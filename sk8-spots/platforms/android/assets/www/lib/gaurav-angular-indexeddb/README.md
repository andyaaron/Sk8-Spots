# gaurav-angular-indexeddb

> An indexedDB wrapper for Angular JS.

[![Bower](https://img.shields.io/bower/v/angularjs-indexeddb.svg)]()
[![Angular JS compatibility](https://img.shields.io/badge/angular->=1.2.x-green.svg)]()

### Installation via [Bower](http://bower.io)

```bash

bower install angularjs-indexeddb

```

### Basic Usage

Add ```angular-indexeddb.min.js``` library to your project's ```index.html```

```html
<script src="js/angular-indexeddb.min.js" type="text/javascript">
```

Add ```indexed-db``` to you module dependency list

````javasript

    angular.module('myApp',['indexed-db']);
    
````

In your module config function state your database name, version and table schema

````javascript

    angular.module('myApp').config(function(indexeddvProvider){
        indexeddbProvider.setDbName('test'); // your database name
        indexeddbProvider.setDbVersion(1); // your database version
        indexeddbProivder.setDbTables(tables); //tables is the objects contains your schema for various tables
    }
    
````

### Documentation
You can find documentation [here](https://github.com/gauravgango/gaurav-angular-indexeddb/wiki)


### New to indexedDB ?
* Follow [MDN Guide](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)

### TODO
* Add example/demo with some basic database operations
* Update wiki with recent changes
