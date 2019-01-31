# MQTT and Mosquitto
A quick introduction to MQTT and Mosquitto

## Overview

[MQTT](http://mqtt.org/) (which is now an [ISO Standard](https://www.iso.org/standard/69466.html)) is a "machine-to-machine" (M2M) or "Internet of Things" (IoT) connectivity protocol.


Sensors and small devices (such as the Arduino or Raspberry Pi) typically communicate via this protocol. Its low overhead and small client libraries make it a good fit for M2M/IOT applications.

Whereas other protocols assume "always-on" state and "always-available" communications, MQTT is interesting in that it specifically allows for failure(s).

From the [FAQ](http://mqtt.org/faq):

  MQTT stands for MQ Telemetry Transport. It is a publish/subscribe, extremely simple and lightweight messaging protocol, designed for constrained devices and low-bandwidth, high-latency or unreliable networks.

And:

  These principles also turn out to make the protocol ideal of the emerging “machine-to-machine” (M2M) or “Internet of Things” world of connected devices, and for mobile applications where bandwidth and battery power are at a premium.

And:

  TCP/IP port 1883 is reserved with [IANA](http://www.iana.org/) for use with MQTT. TCP/IP port 8883 is also registered, for using MQTT over SSL.

[While MQTT usually takes place over TCP/IP, this is not a requirement. There are implementations that do not use TCP/IP.]

## Mosquitto

[Eclipse Mosquitto™](http://mosquitto.org/) is an open source (EPL/EDL licensed) message broker that implements the MQTT protocol.

See this [download link](http://mosquitto.org/download/) for instructions on downloading/building/installing Mosquitto.

#### Installing Mosquitto 

My recommendation is to build from source, as a useful suite of tests is included and examining them may be very instructive.

Unusually, the Mosquitto source code does not include a __configure__ script. However the list of dependencies is very small so this is not really a problem.

1) Build the source code:

	```
    make
	```

    Provision dependencies as required until this succeeds.

2) Run the test suite:

	```
    make test
	```

3) Install Mosquitto:

	```
    sudo make install
	```

    By default Mosquitto installs to `/usr/local` and `/etc/mosquitto`.

#### Running Mosquitto 

The basic operation of MQTT is quite simple: subscribers _subscribe_ to a specific _topic_ on a long-running _message broker_ and publishers _publish_ to the message broker.

The broker handles the routing of messages from publishers to subscribers.

This can be illustrated as follows:

1) Start the Broker
	
	In a terminal, execute the mosquitto command to start the message broker:

	```
	mosquitto
	```

2) Register a subscriber:

	In another terminal, execute the mosquitto subscribe command to subscribe to a topic:

	```
    mosquitto_sub -t "test/topic"
	```

    In the first terminal, the broker should register the presence of a new subscriber.

3) Publish a message to the topic:

	In a third terminal, execute the mosquitto publish command:

	```
    mosquitto_pub -t "test/topic" -m "Hello world!"
	```
	
    Or use the Golang publish component as follows:

	```
    go run mqtt_publish.go
	```

    In the first terminal, the broker should register the connection and disconnection of a publisher.

    In the second terminal, the subscriber should echo the message sent by the publisher.

4) Close down the subscriber (second terminal) with Ctrl-C.

    In the first terminal, the broker should register the disconnection of the subscriber.
  
5) Close down the broker (first terminal) with Ctrl-C.

Simple!

[Note that messages are not _queued_ - subscribers will only receive messages
that are published when they are actively subscribed.]

## Reference

Golang MQTT package:

    http://godoc.org/github.com/eclipse/paho.mqtt.golang

## To Do

- [x] Write a Golang MQTT publish component
- [ ] Parameterize the publish component a la 'mosquitto_pub'
