---
title: Kafka Multi Cluster and Replication
type: topic
section: Kafka in Enterprise
course: Kafka
tags:
- kafka
---
#### Kafka Multi Cluster and Replication
- Kafka can only operate in a single region
- It is very common for enterprises to have Kafka clusters across the world, with some level of replication between them
- A replication application at its core is just a consumer + a producer
- There are different tools to perform it:
    - MirrorMaker (open source tool that ships with Kafka)
    - Netflix uses Flink
    - Uber uses uReplicator (addresses performance and operations issues with MM)
    - Comcast has their own open source Kafka Connect Source
    - Confluent has their own Kafka Connect Source (paid)

There are 2 design for cluster replication
1. Active => Passive
    - You want to have an aggregation cluster (eg, for analytics)
    - You want to create some form of disaster recovery strategy (its hard)
    - Cloud migration (from on-premise cluster to cloud cluster)
2. Active => Active
    - You have a global application
    - You have a global dataset

###### Replication doesn't preserve offsets, just data!
