# Loopback-connector-enviossms

## Description

This connector is for consume the REST API of [enviossms.com](http://enviossms.com)

For more information of the enviossms REST API please read their documentation [here](https://messaging-api.readme.io/).

## Requirments

- *Node*: **>=8.11.1**
- *npm*: **>=5.6.0**
- *Loopback*: **3.x**

## Usage

1. To use this connector install it with the next command
```bash
$ npm install loopback-connector-enviossms --save
```
2. Create your enviossms datasource in `datasource.json`, in the `"connector":` property especify the loopback-connector-enviossms. The properties `"username":` and `"password":` are required to connect with the api rest and consume it.
```json
...
"enviossms": {
  "name": "enviossms",
  "connector": "loopback-connector-enviossms",
  "username": "yourUsername",
  "password": "yourPassword",
}
...
```

3. Attach your model to the enviossms datasource in `model-config.json`
```json
...
"sms": {
  "dataSource": "enviossms",
  "public": true
},
...
```
4. Then use it in your model `sms` like this
```js
// sms.js
'use strict';
const chalk = require('chalk'); // chalk is optional

module.exports = function(sms) {
  const options = {
    to: '+5493511122334',
    text: 'My sms text',
  }

  sms.sendSimpleSms(options)
    .then((res) => {
      // res options is an array  with 2 index,
      // which has a parsed response body in index 0
      // and a raw response in index 1
      console.log(chalk.green(JSON.stringify(res[0])));
      next();
    })
    .catch((err) => {
      console.log(chalk.red(err));
      next(new Error(err));
    });
}
```

or in other models

```js
// notifications.js
'use strict';
const chalk = require('chalk');

module.exports = function(Notifications) {
  Notifications.observe('before save', function(ctx, next) {
    Notifications.app.models.sms.sendSimpleSms(options)
      .then((res) => {
        // res options is an array  with 2 index,
        // which has a parsed response body in index 0
        // and a raw response in index 1
        console.log(chalk.green(JSON.stringify(res[0])));
      })
      .catch((err) => {
        console.log(chalk.red(err));
      });
  });
};
```

## Exposed methods

| Name | Params | return | Description |
| :--- |  :---  |   :--- |     :---:   |
| `sendSimpleSms` | `options`: object with `to` and `text` properties | This method return a `Promise`, when `resolve` it returns an array with parsed body response in first place and the raw response in the second place; if it is `reject` returns an error object. | This option consumes the `/sms/1/text/single` endpoint of ***api.envios.sms*** using the POST http verb. |

> Other methods are in development rigth now.

## Contribute

To contribute in this project please read the [contributing guide](https://github.com/fukuroo-io/loopback-connector-enviossms) in our github respository (at the moment in development).

## Next steps in development

The next steps plained are:
- Adding unit test with mocha and chai frameworks
- Develop other endpoints

## GitHub

[https://github.com/fukuroo-io/loopback-connector-enviossms](https://github.com/fukuroo-io/loopback-connector-enviossms)

## License

### MIT