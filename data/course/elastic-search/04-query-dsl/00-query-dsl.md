---
title: 'Query DSL'
type: 'topic'
section: '04 Query DSL'
course: 'ElasticSearch'
tags:
- design
- system design
- Basic Concepts
---
#### Query DSL
- A flexible, expressive search language that Elasticsearch uses to expose most of the power of Lucene through a simple JSON interface.
- It is what  you should be using to write your queries in production.
- It makes your queries more flexible, more precise, easier to read, and easier to debug.
- Default number of results returned by elasticsearch is 10.

> `_score` in the results indicates the relevance of the documents.

##### Query Context
- _How well the documents match the query_
- **Included or Not:** Determine whether the document should be part of the result.
- **Relevance Score:** Calculated for every search term the document maps to.
- **High score, more relevant:** More relevant documents, higher in the search rankings.

##### Filter Context
- _Does this document match the query clause_
- **Included or Not:** Yes/No determines whether included in the result.
- **No scoring:** No additional relevance ranking in the search results.
- **Structured Data:** Exact matches, range queries.
- **Faster:** Only detemine inclusion in results, no scoring to consider.

---
##### Search Terms can be specified in 2 ways:
1. URL query parameters
2. Within request body of URL


---
