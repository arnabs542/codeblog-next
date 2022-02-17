---
title: 'Search Using Query Params'
type: 'topic'
section: '04 Query DSL'
course: 'ElasticSearch'
tags:
- design
- system design
- Basic Concepts
---
#### URL query parameters
```
curl -XGET 'localhost:9200/customers/_search?q=wyoming&pretty'
```

**More queries**
```
localhost:9200/customers/_search?q=wyoming&pretty
localhost:9200/customers/_search?q=wyoming&sort=age:desc&pretty
localhost:9200/customers/_search?q=state:kentucky&sort=age:asc&pretty
localhost:9200/customers/_search?q=state:kentucky&from=10&size=2&pretty
localhost:9200/customers/_search?q=state:kentucky&explain&pretty
```


