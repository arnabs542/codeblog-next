---
title: 'Update'
type: 'topic'
section: '03 CRUD Operations'
course: 'ElasticSearch'
tags:
- design
- system design
- Basic Concepts
---
#### Updating whole/partial document
##### 1. Whole Document update
**command:**
```
curl -XPUT 'localhost:9200/products/mobiles/3?pretty' -H 'Content-Type: application/json' -d'
{
  "name": "Xiaomi Note",
  "camera": "12MP",
  "storage": "256GB",
  "display": "5.5inch",
  "battery": "1,800mAh",
  "reviews": ["Really love Xiaomi products", "Too large to use easily"]
}
'
```

**output:**
```
{
  "_index" : "products",
  "_type" : "mobiles",
  "_id" : "3",
  "_version" : 2,
  "result" : "updated",
  "_shards" : {
    "total" : 2,
    "successful" : 1,
    "failed" : 0
  },
  "_seq_no" : 6,
  "_primary_term" : 1
}
```

##### 2. Partial Document update
- Using `_update` API with "doc"

**command: (to add new field)**
```
curl -XPOST 'localhost:9200/products/mobiles/2/_update?pretty' -H 'Content-Type: application/json' -d'
{
  "doc": {
     "color": "black"
  }
}
'
```

**output:**
```
{
  "_index" : "products",
  "_type" : "mobiles",
  "_id" : "2",
  "_version" : 2,
  "result" : "updated",
  "_shards" : {
    "total" : 2,
    "successful" : 1,
    "failed" : 0
  },
  "_seq_no" : 7,
  "_primary_term" : 1
}
```

**command: (to updated any field)**
```
curl -XPOST 'localhost:9200/products/shoes/1/_update?pretty' -H 'Content-Type: application/json' -d'
{
  "script": "ctx._source.size += 2"
}
'
```

---