---
title: 'Query terms and source filtering'
type: 'topic'
section: '04 Query DSL'
course: 'ElasticSearch'
tags:
- design
- system design
- Basic Concepts
---
#### Query terms and source filtering
```
curl -XGET 'localhost:9200/customers/_search?pretty' -H 'Content-Type: application/json' -d'
{
    "query" : {
        "term" : { "name" : "gates" }
    }
}
'
```
```
curl -XGET 'localhost:9200/customers/_search?pretty' -H 'Content-Type: application/json' -d'
{
    "query" : {
        "term" : { "street" : "chestnut" }
    }
}
'
```
```
Source filtering
curl -XGET 'localhost:9200/customers/_search?pretty' -H 'Content-Type: application/json' -d'
{
    "_source" : false,
    "query" : {
        "term" : { "street" : "chestnut" }
    }
}
'
```
```
curl -XGET 'localhost:9200/customers/_search?pretty' -H 'Content-Type: application/json' -d'
{
    "_source" : "st*",
    "query" : {
        "term" : { "state" : "washington" }
    }
}
'
```
```
curl -XGET 'localhost:9200/customers/_search?pretty' -H 'Content-Type: application/json' -d'
{
    "_source" : ["st*", "*n*"],
    "query" : {
        "term" : { "state" : "washington" }
    }
}
'
```
```
curl -XGET 'localhost:9200/customers/_search?pretty' -H 'Content-Type: application/json' -d'
{
     "_source": {
        "includes": ["st*", "*n*"],
        "excludes": [ "*der" ]
     },
    "query" : {
        "term" : { "state" : "washington" }
    }
}
'
```
