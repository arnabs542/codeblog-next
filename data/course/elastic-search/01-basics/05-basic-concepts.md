---
title: 'Basic Concepts'
type: 'topic'
section: '01 Basics'
course: 'ElasticSearch'
tags:
- design
- system design
- Basic Concepts
---
#### Basic Concepts

##### Near Realtime Search
- Very low latency, ~1 second from the time a document is indexed until it becomes searchable.

##### Node
- Elasticsearch is distributed by nature. It runs on multiple machines within a cluster.
- A single server within that cluster is called a node.
- Every node within a cluster performs the indexing operations in order to index all documents that are added to elasticsearch.
- All nodes also participate in search and analysis operations.
- Any search query that we run will be run on multiple nodes in parallel.
- Every node in a cluster is assigned a unique ID and a name, which allows us to refer to a node while performing administrative tasks on the cluster.

##### Cluster
- A cluster is a collection of nodes which operate together to achieve the same objective.
- A cluster in elasticsearch can scale to hundreds, even thousands of nodes. It can also be just a single-node cluster.
- Any index of documents that we create is stored within a cluster.
- The way we scale the number of machines within a cluster is to have multiple nodes join the same cluster by specifying the name of the cluster.
- Nodes within a cluster will automatically find each other within elasticsearch by sending each other messages.
- The machines on a cluster have to be on the same network. 

##### Index
- It is a collection of similar documents.
- An index within a cluster is uniquely identified by its name and we can have any number of indices for the same cluster. 
- We have different indices for different logical groupings.
- Within one index, we can have multiple document types. These types are logical partitioning of documents within an index.

##### Types
- Documents in any site are divided into different categories or types, where these categories and types are logical groupings of documents.
- A document type is a collection of documents with same characteristics withina larger index

##### Document
- A document is simply a container of text that needs to be searchable.
- A document in elasticsearch is expressed using JSON, which is a standard format for wire transfer form a client to a server and vice versa.
- All documents within a elasticsearch reside within an index. Every document requires a document type as well as an index that it belongs to.
- The index and the document type are together used to identify a set of documents.
- An index can potentially be composed of a huge number of documents. 

##### Shards
- We can split up index across multiple machines (nodes) in the cluster. This process is called Sharding your data.
- This allows to search in parallel and speed up processing.

##### Replicas
- Every shard will have a corresponding replica. 
- Replicas makes sure that cluster and data within it is highly available and tolerant to node failures.

> Sharding index and replicating every shard makes search operations much faster and makes your cluster fault tolerance and highly available.

---