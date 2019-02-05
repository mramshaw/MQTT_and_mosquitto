#!/usr/bin/env python3

# pylint: disable=C0103

"""A simple MQTT publish component."""

import argparse

from paho.mqtt import publish as publish

parser = argparse.ArgumentParser()
parser.add_argument('-H', '--host', default='localhost',
                    help='the host to publish to')
parser.add_argument('-p', '--port', type=int, default=1883,
                    help='the port to publish to')
parser.add_argument('-t', '--topic', default='test/topic',
                    help='the topic to publish to')
parser.add_argument('-m', '--message', default='Hello World!',
                    help='the message to publish')
parser.add_argument('-q', '--qos', type=int, choices=[0, 1, 2], default=0,
                    help='Quality of Service' +
                    ' (0 = At Most Once, 1 = At Least Once, 2 = Exactly Once)')
parser.add_argument('-r', '--retain',
                    help='whether or not the message should be retained',
                    action='store_true')
args = parser.parse_args()

topic = 'test/topic'

publish.single(args.topic, args.message, qos=args.qos, retain=args.retain,
               hostname=args.host, port=args.port,
               client_id='python-mqtt-publish')
