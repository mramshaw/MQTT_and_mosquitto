'use strict';

const minimist = require('minimist')
const mqtt = require('async-mqtt');

const args = minimist(process.argv.slice(2), {
    alias: {
        h: 'help',
        H: 'Host',
        p: 'port',
        t: 'topic',
        m: 'message',
        q: 'qos',
        r: 'retain'
    },
    default: {
        help: false,
        Host: 'localhost',
        port: 1883,
        topic: 'test/topic',
        message: 'Hello World!',
        qos: 0,
        retain: false
    },
});

const usage =
`usage: mqtt_publish.js [-h] [-H HOST] [-p PORT] [-t TOPIC] [-m MESSAGE]
                       [-q {0,1,2}] [-r]

optional arguments:
  -h          show this help message and exit
  -H HOST     the host to publish to
  -p PORT     the port to publish to
  -t TOPIC    the topic to publish to
  -m MESSAGE  the message to publish
  -q {0,1,2}  Quality of Service (0 = At Most Once,
                1 = At Least Once, 2 = Exactly Once)
  -r          whether or not the message should be retained
`

if (args.help == true) {
    console.log(usage);
    process.exit(1);
}

const mqtt_server = `tcp://${args.Host}:${args.port}`;

const mqtt_client = mqtt.connect(mqtt_server, {
        clientId: 'mqtt-node.js'
});

// Set timeout on connection, in case MQTT server not up
//     or wrong host / port specified
const connect_timeout = setTimeout(function() {
    console.log(`Can't connect to MQTT host '${mqtt_server}' - timeout exceeded`);
    process.exit(1);
}, 2 * 1000);

// Handle error callback (connection options)
mqtt_client.on('error', function(error) {
    console.log(`Can't connect to MQTT host '${mqtt_server}': ${error}`);
    process.exit(1);
});

// Handle successful connection
mqtt_client.on('connect', function() {
    clearTimeout(connect_timeout);
    publish(args.topic, args.message, {
        retain: args.retain,
        qos: args.qos
    });
    mqtt_client.end();
});

async function publish(topic, msg, options) {
    await mqtt_client.publish(topic, msg, options);
};
