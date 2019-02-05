'use strict';

const minimalist = require('minimist')
const mqtt = require('mqtt');

const args = minimalist(process.argv.slice(2), {  
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
  -h         show this help message and exit
  -H HOST    the host to publish to
  -p PORT    the port to publish to
  -t TOPIC   the topic to publish to
  -m MESSAGE the message to publish
  -q {0,1,2} Quality of Service (0 = At Most Once,
                1 = At Least Once, 2 = Exactly Once)
  -r         whether or not the message should be retained
`

if (args.help == true) {
    console.log(usage);
    process.exit(1);
}

let count = 0;

const client = mqtt.connect(`tcp://${args.Host}:${args.port}`, {
    clientId: 'mqtt-node.js'
});

//handle connection callback
client.on('connect', function() {
    console.log(`connected: ${client.connected}`);
})

//handle error callback
client.on('error', function(error) {
    console.log(`Can't connect: ${error}`);
    process.exit(1);
});

function publish(topic, msg, options) {

    if (client.connected == true) {
        console.log(`publishing: ${msg}`);
        client.publish(topic, msg, options);
    }
    count += 1;
    if (count == 1)
        clearTimeout(timer_id);
    client.end();
}

const options = {
    retain: args.retain,
    qos: args.qos
};

const timer_id = setInterval(function() {
    publish(args.topic, args.message, options);
}, 3000);
