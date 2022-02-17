---
title: 'Delete'
type: 'topic'
section: '03 CRUD Operations'
course: 'ElasticSearch'
tags:
- design
- system design
- Basic Concepts
---
#### Delete Documents in an Index
- When we delete a document from an index in elasticsearch, the document is not actually deleted. Its simply marked for deletion. At a later time, when some kind of merge happens to consolidate space, the actual deletion takes place.

**command:**
```
curl -XDELETE 'localhost:9200/products/mobiles/2?pretty'
```

**output:**
```
{
  "_index" : "products",
  "_type" : "mobiles",
  "_id" : "2",
  "_version" : 3,
  "result" : "deleted",
  "_shards" : {
    "total" : 2,
    "successful" : 1,
    "failed" : 0
  },
  "_seq_no" : 8,
  "_primary_term" : 1
}
```

---
#### Delete entire Index
**command:**
```
curl -XDELETE 'localhost:9200/customers?pretty'
```

**output:**
```
{
  "acknowledged" : true
}
```

**to check if document exists:**
```
curl -i -XHEAD 'localhost:9200/products/mobiles/2?pretty'
```

---
#### Performing Buik operations on documents
**command:**
```
```

**output:**
```
```

---
#### Bulk indexing of documents from a JSON file
**command:**
```
```

**output:**
```
```

---