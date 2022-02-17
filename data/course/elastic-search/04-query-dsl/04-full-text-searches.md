---
title: 'Full Text Searches'
type: 'topic'
section: '04 Query DSL'
course: 'ElasticSearch'
tags:
- design
- system design
- Basic Concepts
---
#### Full Text Searches
##### 1. The `match` keyword
- It is used to look for the search terms that we are interested in within the text of our documents.

```
curl -XGET 'localhost:9200/customers/_search?pretty' -H 'Content-Type: application/json' -d'
{
    "query": {
        "match" : {
            "name" : "webster"
        }
    }
}
'
```

```
curl -XGET 'localhost:9200/customers/_search?pretty' -H 'Content-Type: application/json' -d'
{
    "query": {
        "match" : {
              "name" : {
                  "query" : "frank norris",
                  "operator" : "or"
               }        
        }
    }
}
'
```

```
curl -XGET 'localhost:9200/customers/_search?pretty' -H 'Content-Type: application/json' -d'
{
    "query": {
        "match" : {
            "street" : "tompkins place"
        }
    }
}
'
```

---
##### 3. The `match_phrase` keyword
- 

```
curl -XGET 'localhost:9200/customers/_search?pretty' -H 'Content-Type: application/json' -d'
{
    "query": {
        "match_phrase" : {
            "street" : "tompkins place"
        }
    }
}
'
```

```
curl -XGET 'localhost:9200/customers/_search?pretty' -H 'Content-Type: application/json' -d'
{
    "query": {
        "match_phrase" : {
            "state" : "puerto rico"
        }
    }
}
'
```

---
##### 3. The `match_phrase_prefix` keyword
- 

```
curl -XGET 'localhost:9200/customers/_search?pretty' -H 'Content-Type: application/json' -d'
{
    "query": {
        "match_phrase_prefix" : {
            "name" : "ma"
        }
    }
}
'
```

```
curl -XGET 'localhost:9200/customers/_search?pretty' -H 'Content-Type: application/json' -d'
{
    "query": {
        "match_phrase_prefix" : {
            "street" : "clymer st"
        }
    }
}
'
```

---

