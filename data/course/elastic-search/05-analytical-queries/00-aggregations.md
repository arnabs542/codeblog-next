---
title: 'Aggregations'
type: 'topic'
section: '05 Analytical Queries'
course: 'ElasticSearch'
tags:
- design
- system design
- Basic Concepts
---
#### Aggregations
- Aggregations are computations that we perform on the data that we have indexed in elasticsearch allowing us to extract meaningful information and business intelligence from our documents.
- 4 kinds of aggregations
  1. Metric
  2. Bucketing
  3. Matrix
  4. Pipeline

##### 1. Metric
- Metric aggregations are mathematic computations or statistics that we want to extract from our documents.
- These are aggregations over an entire set of documents.
- These aggregators can have a single value as a result or multiple values.
- **Aggregations over a set of documents**
  - All documents in a search result
  - Documents within a logical group

##### 2. Bucketing
- Bucketing aggregations are used when we want to logically group data in some manner.
- A document falls into a bucket if the criteria matches.
- Every bucket in a bucketing aggregation is associated with a key.

##### 3. Matrix
- Matrix aggregation operates on multiple fields and produces a matrix result.
- Every value from field A is combined with every other value from field B.
- Matrix aggregations are experimental and may change in future releases.

##### 4. Pipeline
- Pipleline aggregation allow one set of aggregation to serve as an input for another set of aggregations.
- They are also experimental and may change in future releases.

---
#### Search vs Aggregations
|Search   |Aggregation   |
|---|---|
|Inverted index of the terms present in documents   |Actual value of fields present in documents   |
|Terms can be hashed and stored in the index   |Actual values of the terms are needed, hash values do not suffice   |
|Which documents contain this term?   |What is the value of this field for this document?   |

##### Getting value of Text field
- Text fields are stored in an `in-memory` data structure called, **fielddata**.
- fielddata is built on demand when a field is used for aggregation, sorting, etc.
- Elasticsearch constructs this fielddata in a lazy manner because it takes up lots of heap memory space.
- That is why elasticsearch disables fielddata by default for text fields. We have to explicitly request for it.

---