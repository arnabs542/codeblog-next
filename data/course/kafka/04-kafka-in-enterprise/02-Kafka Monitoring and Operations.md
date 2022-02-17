---
title: Kafka Monitoring and Operations
type: topic
section: Kafka in Enterprise
course: Kafka
tags:
- kafka
---
#### Kafka Monitoring and Operations
- Kafka exposes metrics through JMX
- These metrics are highly important for monitoring Kafka, and ensuring the systems are behaving correctly under load.

Common places to host the Kafka metrics:
- ELK (ElasticSearch + Kibana)
- Datadog
- NewRelic
- Confluent Control Centre
- Promotheus
- etc...

Some important metrics are:
1. Under Replicated Partitions:
2. Request Handlers:
3. Request timing

Kafka operations team must be able to perform the following tasks:
- Rolling restart of brokers
- updating configurations
- rebalancing partitions
- increasing replication factor
- Adding / Replacing / Removing a broker
- Upgrading a Kafka cluster with zero downtime

---
