package main

import (
	"fmt"

	//import the Paho Go MQTT library
	MQTT "github.com/eclipse/paho.mqtt.golang"
)

func main() {
    topic := "test/topic"

	// Create a ClientOptions struct
	clientOpts := MQTT.NewClientOptions().AddBroker("tcp://localhost:1883")
	clientOpts.SetClientID("go-mqtt-publish")

	//create and start a client
	client := MQTT.NewClient(clientOpts)
	if token := client.Connect(); token.Wait() && token.Error() != nil {
		panic(token.Error())
	}

	// Publish a message at QoS 1 and wait for a receipt from the server
	text := fmt.Sprintf("Hello World!")
    var qos byte = 1
    retained := false
	token := client.Publish(topic, qos, retained, text)
	token.Wait()

	client.Disconnect(250)
}
