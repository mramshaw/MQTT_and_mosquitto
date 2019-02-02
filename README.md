# MQTT and Mosquitto

A quick introduction to MQTT and Mosquitto

The contents are as follows:

* [Overview](#overview)
* [Mosquitto](#mosquitto)
    * [Installing Mosquitto](#installing-mosquitto)
    * [Running Mosquitto](#running-mosquitto)
* [Reference](#reference)
* [To Do](#to-do)
* [Credits](#credits)

## Overview

[MQTT](http://mqtt.org/) (which is now an [ISO Standard](https://www.iso.org/standard/69466.html)) is a "machine-to-machine" (M2M) or "Internet of Things" (IoT) connectivity protocol.

Sensors and small devices (such as the Arduino or Raspberry Pi) typically communicate via this protocol. Its low overhead and small client libraries make it a good fit for M2M/IOT applications.

Whereas other protocols assume "always-on" state and "always-available" communications, MQTT is interesting in that it specifically allows for failure(s).

From the [FAQ](http://mqtt.org/faq):

> MQTT stands for MQ Telemetry Transport. It is a publish/subscribe, extremely simple and lightweight messaging protocol, designed for constrained devices and low-bandwidth, high-latency or unreliable networks.

And:

> These principles also turn out to make the protocol ideal of the emerging “machine-to-machine” (M2M) or “Internet of Things” world of connected devices, and for mobile applications where bandwidth and battery power are at a premium.

And:

> TCP/IP port 1883 is reserved with [IANA](http://www.iana.org/) for use with MQTT. TCP/IP port 8883 is also registered, for using MQTT over SSL.

[While MQTT usually takes place over TCP/IP, this is not a requirement. There are implementations that do not use TCP/IP.]

Note that __MQ__ is _not_ short for __Message Queue__. The differences are as follows:

- In queues, a message is stored until it is consumed (no such thing takes place with MQTT)
- In queues, a message is only consumed by one client (in MQTT, any number of clients may be subscribed to a topic)
- A queue is much more heavyweight than a topic (a queue is named and must be explicitly created while a topic is lightweight)

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

4) Verify Mosquitto version via <kbd>mosquitto -h</kbd>:

    ```
    mosquitto version 1.5.5
    
    mosquitto is an MQTT v3.1.1 broker.
    
    Usage: mosquitto [-c config_file] [-d] [-h] [-p port]
    
     -c : specify the broker config file.
     -d : put the broker into the background after starting.
     -h : display this help.
     -p : start the broker listening on the specified port.
          Not recommended in conjunction with the -c option.
     -v : verbose mode - enable all logging types. This overrides
          any logging options given in the config file.
    
    See http://mosquitto.org/ for more information.
    ```

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
    go run mqtt_publish.go -t "test/topic" -m "Hello world!"
	```

    Or use the Python publish component as follows:

	```
    python3 mqtt_publish.py -t "test/topic" -m "Hello world!"
	```

    In the first terminal, the broker should register the connection and disconnection of a publisher.

    In the second terminal, the subscriber should echo the message sent by the publisher.

4) Close down the subscriber (second terminal) with Ctrl-C.

    In the first terminal, the broker should register the disconnection of the subscriber.
  
5) Close down the broker (first terminal) with Ctrl-C.

Simple!

[In the example shown, messages are not _queued_ - so that subscribers will only receive
 messages that are published when they are actively subscribed. However specifying QoS
 values other than zero (the default) or specifying message retention will affect this.]

## Reference

Golang MQTT package:

    http://godoc.org/github.com/eclipse/paho.mqtt.golang

[Supports TCP, TLS, and WebSockets]

Python MQTT package:

    http://www.eclipse.org/paho/clients/python/docs/

MQTT and CoApp:

    http://www.eclipse.org/community/eclipse_newsletter/2014/february/article2.php

[MQTT runs over TCP while CoApp is RESTful and runs over UDP; MQTT-SN runs over UDP.]

MQTT Essentials:

    http://www.hivemq.com/tags/mqtt-essentials/

[This is a very nice explanation of things and a lot less dry than reading RFCs.]

MQTT RFC:

    http://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.pdf

    http://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html

## To Do

- [x] Write a Golang MQTT publish component
- [x] Upgrade to latest `mosquitto` (__1.5.5__ as of time of writing)
- [x] Parameterize the publish component a la 'mosquitto_pub'
- [x] Write a Python MQTT publish component (for use with - say - a Raspberry Pi)

## Credits

Golang Publish code adapted from the Eclipse Paho client code:

    http://www.eclipse.org/paho/clients/golang/
