---
title: 'Search Using Request Body'
type: 'topic'
section: '04 Query DSL'
course: 'ElasticSearch'
tags:
- design
- system design
- Basic Concepts
---
##### 2. Within request body of URL

```
curl -XGET 'localhost:9200/products/_search?pretty' -H 'Content-Type: application/json' -d'
{
  "query": { "match_all": {} }
}
'
```

```
curl -XGET 'localhost:9200/products/_search?pretty' -H 'Content-Type: application/json' -d'
{
  "query": { "match_all": {} },
  "size": 3
}
'
```

```
curl -XGET 'localhost:9200/products/_search?pretty' -H 'Content-Type: application/json' -d'
{
  "query": { "match_all": {} },
  "from": 5, 
  "size": 3
}
'
```

```
curl -XGET 'localhost:9200/customers/_search?pretty' -H 'Content-Type: application/json' -d'
{
  "query": { "match_all": {} },
  "sort": { "age": { "order": "desc" } },
  "size": 20
}
'
```

---

