package kafka

import ckafka "github.com/confluentinc/confluent-kafka-go/kafka"

type KafkaProducer struct {
	Producer *ckafka.Producer
}

func NewKafkaProducer() KafkaProducer {
	return KafkaProducer{}
}

func (k *KafkaProducer) SetupProducer(bootstrapServer string) {
	configMap := &ckafka.ConfigMap{
		"bootstrap.servers": bootstrapServer,
	}

	k.Producer, _ = ckafka.NewProducer(configMap)
}

func (k *KafkaProducer) Publish(message string, topic string) error {
	newMessage := &ckafka.Message{
		TopicPartition: ckafka.TopicPartition{
			Topic:     &topic,
			Partition: ckafka.PartitionAny,
		},
		Value: []byte(message),
	}

	err := k.Producer.Produce(newMessage, nil)

	if err != nil {
		return err
	}

	return nil
}
