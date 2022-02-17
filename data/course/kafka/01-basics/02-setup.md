---
title: 'Setup'
type: 'topic'
section: 'Basics'
course: 'Kafka'
tags:
- kafka
---
#### Prerequisite
- Download and Setup Java 8 or above JDK

#### Installation

##### Windows
- Download Kafka from https://kafka.apache.org/downloads (Binary downloads)
- Extract Kafka at the root of C:\
- Setup Kafka bins in the Environment variables section by editing Path
    - user variable -> path = C:\kafka_2.13-2.6.0\bin\windows
- Try Kafka commands using `kafka-topics.bat` (for example)

##### Start Zookeeper and Kafka
- Edit Zookeeper & Kafka configs using NotePad++ https://notepad-plus-plus.org/download/
    1. zookeeper.properties: dataDir=C:/kafka_2.12-2.0.0/data/zookeeper (yes the slashes are inversed)
    2. server.properties: log.dirs=C:/kafka_2.12-2.0.0/data/kafka (yes the slashes are inversed)
- Start Zookeeper in one command line: `zookeeper-server-start.bat config\zookeeper.properties`
- Start Kafka in another command line: `kafka-server-start.bat config\server.properties`



---