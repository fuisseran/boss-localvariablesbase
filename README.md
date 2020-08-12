# @boss/local-variables

Saves a /local_data/_localvars file to the path provided in the constructor, can be extended to provide type safe local variables

## Installation
```sh
npm install @boss/local-variables --save
```

## Usage example

```js
import LocalVariables from '@boss/local-variables'
import myLogger from './myLogger'

class MyAppLocalVariables extends LocalVariables {
  dbhost: string
  dbname: string
  dbuser: string
  dbpass: string
  constructor(BASEPATH:string, logger:any) {
    super(BASEPATH, logger)
  }
}

export const LOCAL = new MyAppLocalVariables(__dirname, myLogger)

```

## Release History

 * 1.0.0
  * Initial release