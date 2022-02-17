---
title: 'Metric Aggregation'
type: 'topic'
section: '05 Analytical Queries'
course: 'ElasticSearch'
tags:
- design
- system design
- Basic Concepts
---
#### Metric Aggregation
- These are numeric aggregations like sum, average, count, min, max, etc.
- `size` is the number of documents to be returned.

```
curl -XPOST 'localhost:9200/customers/_search?&pretty' -H 'Content-Type: application/json' -d'
{
   "size" : 0,
    "aggs" : {
        "avg_age" : { 
             "avg" : { 
                 "field" : "age" 
             } 
         }
    }
}
'
```
```
curl -XPOST 'localhost:9200/customers/_search?&pretty' -H 'Content-Type: application/json' -d'
{
   "size" : 0,
    "aggregations" : {
        "avg_age" : { 
             "avg" : { 
                 "field" : "age" 
             } 
         }
    }
}
'
```
```
curl -XPOST 'localhost:9200/customers/_search?&pretty' -H 'Content-Type: application/json' -d'
{
   "size" : 1,
    "aggs" : {
        "avg_age" : { 
             "avg" : { 
                 "field" : "age" 
             } 
         }
    }
}
'
```

##### Average with some search terms
```
curl -XPOST 'localhost:9200/customers/_search?&pretty' -H 'Content-Type: application/json' -d'
{
    "size" : 0,
     "query" : {
          "bool" : {
               "filter" : {
                   "match" : { "state" : "minnesota" }
               }
           }
     },
    "aggs" : {
        "avg_age" : { 
             "avg" : { 
                 "field" : "age" 
             } 
         }
    }
}
'
```

##### Stats
```
curl -XPOST 'localhost:9200/customers/_search?&pretty' -H 'Content-Type: application/json' -d'
{
    "size" : 0,
    "aggs" : {
        "age_stats" : { 
             "stats" : { 
                 "field" : "age" 
             } 
         }
    }
}
'
```

---
#### Cardinality Aggregations
```
curl -XPOST 'localhost:9200/customers/_search?&pretty' -H 'Content-Type: application/json' -d'
{
   "size" : 0,
    "aggs" : {
        "age_count" : { 
             "cardinality" : { 
                 "field" : "age" 
             } 
         }
    }
}
'
```

- Field data is disabled on text fields by default. So we need to enable it.
- **to enable field data**

```
curl -XPUT 'localhost:9200/customers/_mapping/personal?pretty' -H 'Content-Type: application/json' -d'
{
  "properties": {
    "gender": { 
      "type": "text",
      "fielddata": true
    }                              
  }            
}         
'
```

```
curl -XPOST 'localhost:9200/customers/_search?&pretty' -H 'Content-Type: application/json' -d'
{
   "size" : 0,
    "aggs" : {
        "gender_count" : { 
             "cardinality" : { 
                 "field" : "gender" 
             } 
         }
    }
}
'
```



---