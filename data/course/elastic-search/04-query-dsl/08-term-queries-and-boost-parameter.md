---
title: 'Terms Query and Boost Parameter'
type: 'topic'
section: '04 Query DSL'
course: 'ElasticSearch'
tags:
- design
- system design
- Basic Concepts
---
#### Term Query
- Term queries match those documents where the exact term is found in the inverted index for the indexed documents.

```
curl -XGET 'localhost:9200/customers/_search?pretty' -H 'Content-Type: application/json' -d'
{
  "query": {
    "bool": {
      "should": [
        {
          "term": {
            "state": {
              "value": "idaho"
            }
          }
        },
        {
          "term": {
            "state": {
              "value": "california"
            }
          }
        }
      ]
    }
  }
}
'
```

#### Boost Parameter
- `boost` parameter used 


```
curl -XGET 'localhost:9200/customers/_search?pretty' -H 'Content-Type: application/json' -d'
{
  "query": {
    "bool": {
      "should": [
        {
          "term": {
            "state": {
              "value": "idaho",
              "boost": 2.0
            }
          }
        },
        {
          "term": {
            "state": {
              "value": "california"
            }
          }
        }
      ]
    }
  }
}
'
```

---