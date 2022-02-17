---
title: 'Kafka Java Programming'
type: 'topic'
section: 'Basics'
course: 'Kafka'
tags:
- kafka
---
#### Producer
1. Create producer properties
    ```java
    String bootstrapServer = "127.0.0.1:9092";
    Properties properties = new Properties();
    properties.setProperty(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServer);  // kafka Address
    properties.setProperty(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
    properties.setProperty(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
    ```
2. Create producer
    ```java
    KafkaProducer<String, String> producer = new KafkaProducer<String, String>(properties);
    ```
3. Send data
    ```java
    producer.send(record);
    ```
4. Flush and close producer
    ```java
    producer.flush();
    producer.close();
    ```

---
#### Consumer
1. Create consumer properties
    ```java
    String bootstrapServer = "127.0.0.1:9092";
        String groupId = "my-third-app";
        Properties properties = new Properties();
        properties.setProperty(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServer);  // kafka Address
        properties.setProperty(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
        properties.setProperty(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
        properties.setProperty(ConsumerConfig.GROUP_ID_CONFIG, groupId);
        properties.setProperty(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest"); // or latest or none
    ```
2. Create consumer
    ```java
    KafkaConsumer<String, String> consumer = new KafkaConsumer<String, String>(properties);
    ```
3. Subscribe to topic
    ```java
    String topic = "first_topic";
    consumer.subscribe(Arrays.asList(topic));   // can add more topics
    ```
4. Consume data
    ```java
    while (true) {
        ConsumerRecords<String, String> records = consumer.poll(100); // new in kafka
        for (ConsumerRecord record : records) {
            System.out.println("Key: " + record.key() + ", Value: " + record.value() + ", Partition: " + record.partition() + ", Offset: " + record.offset());
        }
    }
    ```

---
#### 
1. Producer with Key
2. Producer with callback
3. Consumer with Threads
4. Consumer assign/seek

###### Client bi-directional compatibility
clients and kafka brokers have a compatibility called bi-directional compatibility
- an OLDER client can talk to a NEWER broker.
- a NEWER client can talk to an OLDER broker.

---




---