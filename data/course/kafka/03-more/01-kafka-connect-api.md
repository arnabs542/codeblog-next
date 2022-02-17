---
title: Kafka Connect API
type: topic
section: More
course: Kafka
tags:
- kafka
---
#### Introduction
Kafka connect is all about code and connectors re-use.
- Kafka Connect simplifies and improves getting data in and out of Kafka.
- It simplifies transforming data within Kafka without relying on external libs.

**Four common Kafka use cases:**
1. Source => Kafka : Producer API (Kafka Connect Source)
2. Kafka => Kafka : Consumer, Producer API (Kafka Streams)
3. Kafka => Sink : Consumer API (Kafka Connect Sink)
4. Kafka => App : Consumer API

##### Why Kafka Connect?
- Programmers always want to import data from same sources like Database, JDBC, Couchbase, GoldenGate, SAP HANA, Blockchain, Cassandra, DynamoDB, FTP, IOT, MongoDB, MQTT, RethinkDB, Salesforce, Solr, SQS, Twitter, etc.
- Programmers always want to store data in same sinks like S3, ElasticSearch, HDFS, JDBC, SAP HANA, DocumentDB, Cassandra, DynamoDB, HBase, MongoDB, Redis, Solr, Splunk, Twitter, etc.
- It is tough to achieve Fault Tolerance, Idempotence, Distribution, Ordering.
- Other programmers may already have done a very good job.

##### High Level Design
- Source connectors to get data from Common Data Sources.
- Sink connectors to publish that data in Common Data Stores.



---