# golang

A `golang` MQTT publish component

## To Run

Invoke the `golang` MQTT publish component as follows:

```bash
go run mqtt_publish.go -t "test/topic" -m "Hello world!"
```

For more options, type <kbd>go run mqtt_publish.go -h</kbd>.

## Reference

Golang MQTT package:

    http://godoc.org/github.com/eclipse/paho.mqtt.golang

[Supports TCP, TLS, and WebSockets]

## Credits

Golang Publish code adapted from the Eclipse Paho client code:

    http://www.eclipse.org/paho/clients/golang/
