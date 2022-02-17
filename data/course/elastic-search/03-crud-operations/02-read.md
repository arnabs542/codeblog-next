---
title: 'Read'
type: 'topic'
section: '03 CRUD Operations'
course: 'ElasticSearch'
tags:
- design
- system design
- Basic Concepts
---
#### CRUD Operations
- Elasticsearch uses REST APIs to administer the cluster, perform CRUD operations, search etc.

---
#### Create Index
**command:**
```
curl -XPUT 'localhost:9200/products?pretty'
```

**output:**
```
{
  "acknowledged" : true,
  "shards_acknowledged" : true,
  "index" : "products"
}
```

- PUT request is idempotent, means it can be run multiple times and reproduce the same result.
- POST is used only to update resources. It is not idempotent, means we get a different result based on the initial conditions.

---
#### Retrieving whole/partial document
##### 1. Whole document
**command:**
```
curl -XGET 'localhost:9200/products/mobiles/2?pretty'
```

**output:**
```
{
  "_index" : "products",
  "_type" : "mobiles",
  "_id" : "2",
  "_version" : 1,
  "_seq_no" : 2,
  "_primary_term" : 1,
  "found" : true,
  "_source" : {
    "name" : "Samsung Galaxy",
    "camera" : "8MP",
    "storage" : "128GB",
    "display" : "5.2inch",
    "battery" : "1,500mAh",
    "reviews" : [
      "Best Android phone",
      "I love it!"
    ]
  }
}
```

##### 2. Partial retrieve
-  Use `source` param to retrieve partial fields.
**command:**
```
curl -XGET 'localhost:9200/products/mobiles/2?pretty&_source=false'
```

**output:**
```
{
  "_index" : "products",
  "_type" : "mobiles",
  "_id" : "2",
  "_version" : 1,
  "_seq_no" : 2,
  "_primary_term" : 1,
  "found" : true
}
```

**command:**
```
curl -XGET 'localhost:9200/products/mobiles/1?pretty&_source=name,reviews'
```

**output:**
```
{
  "_index" : "products",
  "_type" : "mobiles",
  "_id" : "2",
  "_version" : 1,
  "_seq_no" : 2,
  "_primary_term" : 1,
  "found" : true,
  "_source" : {
    "reviews" : [
      "Best Android phone",
      "I love it!"
    ],
    "name" : "Samsung Galaxy"
  }
}
```

---
