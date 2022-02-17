---
title: 'Boolean Compound Queries'
type: 'topic'
section: '04 Query DSL'
course: 'ElasticSearch'
tags:
- design
- system design
- Basic Concepts
---
#### Compound Query
- It is a more complex query built out of relatively simple ones.
- Example: Boolean query

---
#### Boolean Query
- The Boolean compound query allows you to specify multiple query clauses and bring them together using logical "and" or "or" operators.
- Different keywords that can be used within a Boolean query:

##### 1. must
- The clause must appear in matching documents

```
curl -XGET 'localhost:9200/customers/_search?pretty'  -H 'Content-Type: application/json' -d'
{
  "query": {
    "bool": {
      "must": [
        { "match": { "street": "ditmas" } },
        { "match": { "street": "avenue" } }
      ]
    }
  }
}
'
```

##### 2. should
- The clause may appear in matching documents but may not sometimes

```
curl -XGET 'localhost:9200/customers/_search?pretty'  -H 'Content-Type: application/json' -d'
{
  "query": {
    "bool": {
      "should": [
        { "match": { "street": "ditmas" } },
        { "match": { "street": "street" } }
      ]
    }
  }
}
'
```

##### 3. must_not
- The clause must not appear in document results

```
must_not
curl -XGET 'localhost:9200/customers/_search?pretty'  -H 'Content-Type: application/json' -d'
{
  "query": {
    "bool": {
      "must_not": [
        { "match": { "state": "california texas" } },
        { "match": { "street": "lane street" } }
      ]
    }
  }
}
'
```

##### 4. filter
- The clause must appear in results but results are not scored



---