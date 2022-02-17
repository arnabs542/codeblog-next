---
title: 'Bulk Indexing Documents'
type: 'topic'
section: '03 CRUD Operations'
course: 'ElasticSearch'
tags:
- design
- system design
- Basic Concepts
---
#### Retrieve multiple documents
- `mget`: Multi-get

##### 1.
**command:**
```
curl -XGET 'localhost:9200/_mget?pretty' -H 'Content-Type: application/json' -d'
{
    "docs" : [
        {
            "_index" : "products",
            "_type" : "mobiles",
            "_id" : "1"
        },
        {
            "_index" : "products",
            "_type" : "mobiles",
            "_id" : "2"
        }
    ]
}
'
```

**output:**
```
{
  "docs" : [
    {
      "_index" : "products",
      "_type" : "mobiles",
      "_id" : "1",
      "_version" : 2,
      "_seq_no" : 1,
      "_primary_term" : 1,
      "found" : true,
      "_source" : {
        "name" : "iPhone 7",
        "camera" : "12MP",
        "storage" : "256GB",
        "display" : "4.7inch",
        "battery" : "1,960mAh",
        "reviews" : [
          "Incredibly happy after having used it for one week",
          "Best iPhone so far",
          "Very expensive, stick to Android"
        ]
      }
    },
    {
      "_index" : "products",
      "_type" : "mobiles",
      "_id" : "2",
      "found" : false
    }
  ]
}
```

##### 2.
```
curl -XGET 'localhost:9200/products/_mget?pretty' -H 'Content-Type: application/json' -d'
{
    "docs" : [
        {
            "_type" : "mobiles",
            "_id" : "1"
        },
        {
            "_type" : "mobiles",
            "_id" : "2"
        }
    ]
}
'
```

##### 3.
```
curl -XGET 'localhost:9200/products/mobiles/_mget?pretty' -H 'Content-Type: application/json' -d'
{
    "docs" : [
        {
            "_id" : "1"
        },
        {
            "_id" : "2"
        }
    ]
}
'
```

---
#### Index multiple documents
- `_bulk` API is elasticsearch allows you to specify multiple operations in one request.
- first line tells where to to add.
- second line contains what to add.

1. **command:**
```
curl -XPOST 'localhost:9200/_bulk?pretty' -H 'Content-Type: application/json' -d'
{ "index" : { "_index" : "products", "_type" : "shoes", "_id" : "3" } }
{ "name": "Puma","size": 9,"color": "black" }
{ "index" : { "_index" : "products", "_type" : "shoes", "_id" : "4" } }
{ "name": "New Balance","size": 8,"color": "black" }
'
```

2. **command:**
```
curl -XPOST 'localhost:9200/products/_bulk?pretty' -H 'Content-Type: application/json' -d'
{ "index" : {"_type" : "shoes", "_id" : "3" } }
{ "name": "Puma","size": 9,"color": "black" }
{ "index" : {"_type" : "shoes", "_id" : "4" } }
{ "name": "New Balance","size": 8,"color": "black" }
'
```

3. **command:**
```
curl -XPOST 'localhost:9200/products/shoes/_bulk?pretty' -H 'Content-Type: application/json' -d'
{ "index" : {"_id" : "3" } }
{ "name": "Puma","size": 9,"color": "black" }
{ "index" : {"_id" : "4" } }
{ "name": "New Balance","size": 8,"color": "black" }
'
```

3. **command:** Auto-generate ids
```
curl -XPOST 'localhost:9200/products/shoes/_bulk?pretty' -H 'Content-Type: application/json' -d'
{ "index" : {} }
{ "name": "Puma","size": 9,"color": "black" }
{ "index" : {} }
{ "name": "New Balance","size": 8,"color": "black" }
'
```

---
#### Multiple operations in one command
**command:**
```
curl -XPOST 'localhost:9200/products/shoes/_bulk?pretty' -H 'Content-Type: application/json' -d'
{ "index" : {"_id" : "3" } }
{ "name": "Puma","size": 9,"color": "black" }
{ "index" : {"_id" : "4" } }
{ "name": "New Balance","size": 8,"color": "black" }
{ "delete" : {"_id" : "2" } }
{ "create" : {"_id" : "5" } }
{ "name": "Nike Power","size": 12,"color": "black" }
{ "update" : {"_id" : "1"} }
{ "doc" : {"color" : "orange"} }
```

---
#### Bulk indexing documents from a JSON file

**command:**
```
curl -H "Content-Type: application/x-ndjson" -XPOST 'localhost:9200/customers/personal/_bulk?pretty&refresh' --data-binary @"customers.json"

curl -XGET 'localhost:9200/_cat/indices?v&pretty'
```


---

> We do not have to create the index nor the document type upfront before you add documents to the index. Simply adding documents to an index results in the creation of that index.

---