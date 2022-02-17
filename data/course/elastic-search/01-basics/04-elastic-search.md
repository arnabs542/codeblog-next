---
title: 'ElasticSearch'
type: 'topic'
section: '01 Basics'
course: 'ElasticSearch'
tags:
- design
- system design
- ElasticSearch
---
#### ElasticSearch
- It is an open sourced, search and analytics engine, written in Java, and uses Apache Lucene as its core search library.

---
##### Features
1. **Distributed:** It runs on multiple nodes within a cluster and can scale to thousands of nodes, which means that the performance of search operations can scale linearly with the number of nodes that is added to the cluster.
2. **Highly available and fault tolerant:** Because multiple copies of your data are stored within the cluster. Every index is replicated.
3. **RESTful API:** CRUD, monitoring and other operation via simple JSON-based HTTP calls.
4. **Powerful Query DSL:** It allows to express very complex queries in simple manner using JSON.
5. **Schemaless:** Documents that are indexed need not follow a specific schema, and no data types and corresponding field names need to be set up before indexing and parsing the documents.

---
#### Elastic Products
1. ElasticSearch
2. Kibana
3. Beats
4. Logstash
5. X-Pack
6. Cloud

---
#### Working with ElasticSearch
1. **As a service in cloud:** We work with an AWS cluster which has ElasticSearch and Kibana up and running, and we simply use it.
2. **On your local machine:** 

#### Setup
- https://www.elastic.co/downloads/elasticsearch
- Run `bin/elasticsearch`
- Run `curl http://localhost:9200`
- http://localhost:9200/_cat/health?v&pretty to get health



---