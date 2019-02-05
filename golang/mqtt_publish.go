package main

import (
	"flag"
	"strconv"

	//import the Paho Go MQTT library
	MQTT "github.com/eclipse/paho.mqtt.golang"
)

func main() {

	hostPtr := flag.String("h", "localhost", "the host to publish to")
	portPtr := flag.Int("p", 1883, "the port to publish to")
	topicPtr := flag.String("t", "test/topic", "the topic to publish to")
	messagePtr := flag.String("m", "Hello World!", "the message to publish")
	qosPtr := flag.Int("q", 0, "Quality of Service (0 = At Most Once, 1 = At Least Once, 2 = Exactly Once)")
	retainedPtr := flag.Bool("r", false, "whether or not the message should be retained")

	flag.Parse()

	// Create a ClientOptions struct
	clientOpts := MQTT.NewClientOptions().AddBroker("tcp://" + *hostPtr + ":" + strconv.Itoa(*portPtr))
	clientOpts.SetClientID("go-mqtt-publish")

	// Create and start a client
	client := MQTT.NewClient(clientOpts)
	if token := client.Connect(); token.Wait() && token.Error() != nil {
		panic(token.Error())
	}

	// Publish a message and wait for a receipt from the server
	var qos byte = byte(*qosPtr)
	token := client.Publish(*topicPtr, qos, *retainedPtr, *messagePtr)
	token.Wait()

	// Wait 250 ms before disconnect to allow for clean shutdown
	client.Disconnect(250)
}
