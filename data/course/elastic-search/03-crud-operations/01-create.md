---
title: 'Create'
type: 'topic'
section: '03 CRUD Operations'
course: 'ElasticSearch'
tags:
- design
- system design
- Basic Concepts
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
#### List Indices within our cluster
**command:**
```
curl -XGET 'localhost:9200/_cat/indices?v&pretty'
```

**output:**
```
health status index     uuid                   pri rep docs.count docs.deleted store.size pri.store.size
yellow open   orders    iDYbLHB2Rv6QNA3dXfclJQ   1   1          0            0       230b           230b
yellow open   customers 0Ov-SUK9Rz-ZWfndyC-eHA   1   1          0            0       230b           230b
yellow open   products  HL6cuWmyQbewNfl8vbuEgA   1   1          0            0       283b           283b
```

- Health is `yellow` because it is a single node cluster. There is no additional node for replicas.

---
#### Add documents to index
**command:**
```
curl -XPUT 'localhost:9200/products/mobiles/2?pretty' -H 'Content-Type: application/json' -d'
{
  "name": "Samsung Galaxy",
  "camera": "8MP",
  "storage": "128GB",
  "display": "5.2inch",
  "battery": "1,500mAh",
  "reviews": ["Best Android phone", "I love it!"]
}
'
```
- Here, type is `mobiles` within `products` index.
- `2` is document unique id. If we don't give this parameter, elasticsearch will generate unique id.

**output:**
```
{
  "_index" : "products",
  "_type" : "mobiles",
  "_id" : "2",
  "_version" : 1,
  "result" : "created",
  "_shards" : {
    "total" : 2,
    "successful" : 1,
    "failed" : 0
  },
  "_seq_no" : 2,
  "_primary_term" : 1
} 
```

---