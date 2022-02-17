---
title: 'Bucketing Aggregation'
type: 'topic'
section: '05 Analytical Queries'
course: 'ElasticSearch'
tags:
- design
- system design
- Basic Concepts
---
#### Bucketing Aggregation
- It is analogous to the `group by` operation in SQL.

```
curl -XPOST 'localhost:9200/customers/_search?&pretty' -H 'Content-Type: application/json' -d'
{
   "size" : 0,
   "aggs" : {
        "age_bucket" : { 
             "terms" : { 
                 "field" : "age" 
             } 
         }
    }
}
'
```

##### Range aggregation
```
curl -XPOST 'localhost:9200/customers/_search?&pretty' -H 'Content-Type: application/json' -d'
{
   "size" : 0,
   "aggs" : {
       "age_ranges" : {
           "range" : {
               "field" : "age",
               "ranges" : [
                   { "to" : 30 },
                   { "from" : 30, "to" : 40 },
                   { "from" : 40, "to" : 55 },
                   { "from" : 55 }
                ]
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
   "aggs" : {
       "age_ranges" : {
           "range" : {
               "field" : "age",
               "keyed" : true,
               "ranges" : [
                   { "to" : 30 },
                   { "from" : 30, "to" : 40 },
                   { "from" : 40, "to" : 55 },
                   { "from" : 55 }
                ]
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
   "aggs" : {
       "age_ranges" : {
           "range" : {
               "field" : "age",
               "keyed" : true,
               "ranges" : [
                   { "key": "young", "to" : 30 },
                   { "key": "quarter-aged", "from" : 30, "to" : 40 },
                   { "key": "middle-aged", "from" : 40, "to" : 55 },
                   { "key": "senior", "from" : 55 }
                ]
            }
        }
     } 
}
'
```
---
#### Nested Aggregations
##### 2 level nesting
```
curl -XPOST 'localhost:9200/customers/_search?&pretty' -H 'Content-Type: application/json' -d'
{
   "size" : 0,
   "aggs" : {
        "gender_bucket" : { 
             "terms" : { 
                 "field" : "gender" 
             }, 
             "aggs": {
                 "average_age": {
                      "avg": {
                          "field": "age"
                      }
                 }
              }
         }
    }
}
'
```

##### 3 level nesting
```
curl -XPOST 'localhost:9200/customers/_search?&pretty' -H 'Content-Type: application/json' -d'
{
   "size" : 0,
   "aggs" : {
        "gender_bucket" : { 
             "terms" : { 
                 "field" : "gender" 
             }, 
             "aggs" : {
                 "age_ranges" : {
                     "range" : {
                         "field" : "age",
                         "keyed" : true,
                         "ranges" : [
                             { "key": "young", "to" : 30 },
                             { "key": "middle-aged", "from" : 30, "to" : 55 },
                             { "key": "senior", "from" : 55 }
                          ]
                      },
                      "aggs": {
                          "average_age": {
                               "avg": {
                                   "field": "age"
                               }
                          }
                       }
                  }
               } 
         }
    }
}
'
```

---
#### Filter and filters aggregations
```
curl -XPOST 'localhost:9200/customers/_search?size=0&pretty' -H 'Content-Type: application/json' -d'
{
    "aggs" : {
        "state" : {
            "filter" : { "term": { "state": "texas" } },
            "aggs" : {
                "avg_age" : { "avg" : { "field" : "age" } }
            }
        }
    }
}
'
```

##### Filters
```
curl -XGET 'localhost:9200/customers/_search?pretty'  -H 'Content-Type: application/json' -d'
{
  "size": 0,
  "aggs" : {
    "states" : {
      "filters" : {
        "filters" : {
          "washington" :   { "match" : { "state" : "washington"   }},
          "north carolina" :   { "match" : { "state" : "north carolina"   }},
          "south dakota" : { "match" : { "state" : "south dakota" }}
        }
      }
    }
  }
}
'
```

##### (Anonymous filters, returned in the same order as the original filter specification)
```
curl -XGET 'localhost:9200/customers/_search?pretty'  -H 'Content-Type: application/json' -d'
{
  "size": 0,
  "aggs" : {
    "states" : {
      "filters" : {
        "filters" : [
          { "match" : { "state" : "washington"   }},
          { "match" : { "state" : "north carolina"   }},
          { "match" : { "state" : "south dakota" }}
        ]
      }
    }
  }
}
'
```

##### Other bucket
```
curl -XGET 'localhost:9200/customers/_search?pretty'  -H 'Content-Type: application/json' -d'
{
  "size": 0,
  "aggs" : {
    "states" : {
      "filters" : {
        "other_bucket_key": "other_states",  
        "filters" : {
          "washington" :   { "match" : { "state" : "washington"   }},
          "north carolina" :   { "match" : { "state" : "north carolina"   }},
          "south dakota" : { "match" : { "state" : "south dakota" }}
        }
      }
    }
  }
}
'
```


---