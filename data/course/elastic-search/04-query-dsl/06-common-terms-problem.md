---
title: 'Common Terms Problem'
type: 'topic'
section: '04 Query DSL'
course: 'ElasticSearch'
tags:
- design
- system design
- Basic Concepts
---
#### Common Terms Problem
- Searching "The Quick Brown Fox". Here, "The" is a `stop word` as it will be present in almost every document.
- When we perform searches with multiple terms, elasticsearch will split the terms within the query into low and high frequency terms.
- Low: "Quick Brown Fox", High: "The"
- Elasticsearch will first search for those documents which have the rarer terms. 
- It makes sure rarer terms are given more importane that common terms, but common terms are not ignored.

##### Benefits
1. Improved relevance
2. Good performance

##### Common terms queries with `cutoff_frequency`
- Elasticsearch allows to specify `cutoff_frequency` about which we would consider a term a common term.
- Terms about the `cutoff_frequency` will be put in the high frequency bracket.

```
curl -XGET 'localhost:9200/products/_search?pretty' -H 'Content-Type: application/json' -d'
{
    "query": {
        "common": {
            "reviews": {
                "query": "this is great",
                 "cutoff_frequency": 0.001
            }
        }
    }
}
'
```

---