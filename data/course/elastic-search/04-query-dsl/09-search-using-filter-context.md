---
title: 'Search Using Filter Context'
type: 'topic'
section: '04 Query DSL'
course: 'ElasticSearch'
tags:
- design
- system design
- Basic Concepts
---
#### Filter Context
- When queries run within the filter context, there is no relevant ranking of documents within the search results.
- The documents are not scored on how relevant they are. They simply answer a yes/no question, should they be included or not.
- example: `range`

```
curl -XGET 'localhost:9200/customers/_search?pretty' -H 'Content-Type: application/json' -d'
{
  "query": {
    "bool": {
      "must": { "match_all": {} },
      "filter": {
        "range": {
          "age": {
            "gte": 20,
            "lte": 30
          }
        }
      }
    }
  }
}
'
```

---
##### Using filters along with search terms

```
curl -XGET 'localhost:9200/customers/_search?pretty' -H 'Content-Type: application/json' -H 'Content-Type: application/json' -d'
{
  "query": { 
    "bool": { 
      "must": 
        { "match": { 
             "state":   "alabama"
        }
      },
      "filter": [ 
        { "term":  { "gender": "female" }}, 
        { "range": { "age": { "gte": "50" }}} 
      ]
    }
  }
}
'
```

---

