# node.js

[![Known Vulnerabilities](http://snyk.io/test/github/mramshaw/MQTT_and_mosquitto/badge.svg?style=plastic&targetFile=node.js/package.json)](http://snyk.io/test/github/mramshaw/MQTT_and_mosquitto?style=plastic&targetFile=node.js/package.json)

A `node.js` MQTT publish component

## To Run

Invoke the `node.js` MQTT publish component as follows:

```bash
node mqtt_publish.js -t "test/topic" -m "Hello world!"
```

For more options, type <kbd>node mqtt_publish.js -h</kbd>.

## Upgrading to latest LTS node.js

Upgrade to latest LTS version of `node.js` (__v12.13.0__ as of the time of writing.)

Afterwards `lint` for errors and then re-test (not suprisingly for such a small component, everything runs correctly).

#### node

Verify the version of `node`:

```bash
$ node -v
v12.13.0
$
```

#### npm

Verify the version of `npm`:

```bash
$ npm -v
6.12.0
$
```

## Reference

node.js MQTT package:

    http://www.npmjs.com/package/mqtt

Promise wrapper over node.js MQTT package:

    http://github.com/mqttjs/async-mqtt

[As well as __promises__, also seems to offer __async/await__ (ECMAScript 2017).]

## To Do

- [x] Add a Snyk.io vulnerability scan badge
- [x] Write a node.js MQTT publish component
- [x] Refactor node.js MQTT publish component for async/await
- [x] Add `mqtt-packet` as a dependency for security reasons
- [x] Upgrade to latest LTS `node.js` (__v12.13.0__)
