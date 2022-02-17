---
title: 'TF IDF Algorithm for Relevance'
type: 'topic'
section: '04 Query DSL'
course: 'ElasticSearch'
tags:
- design
- system design
- Basic Concepts
---
#### Meaning of Relevance
- The search results answered your question or solved your problem
- The user understands easily why the search engine retrieved these results

##### Relevance in Elasticsearch
- Represented by `_score` field in every search result.
- The scoring of a document for a particular search is a function of both the document itself and the terms that we are searching for.
- Higher the value of `_score` field, the more relevant the document in that result.
- A query clause is directly responsible for a relevant score that a particular document gets.
- Its possible that the same document has a different relevant score if the query were changed.
- **Fuzzy searches** might look at how similar the search term is to the word present in the document.
- **Term searches** might look at percentage of search terms that were found in the document.
- Core relevance algorithm that elasticsearch relies on is called TF/IDF Algorithm.

---
#### TF/IDF Algorithm
- Term Frequency / Inverse Document Frequency
- It has 3 components. Each of these components affect the relevance score in different ways.

##### 1.Term Frequency
- It refers to how often the search term or the search word appears in the field where we are searching.
- The more often a term occurs within a field, the more relevant that document is considered.
- If a field contains more mentions of a particular term, that document is more relevant than one where a field contains just, say, one mention.

##### 2.Inverse Document Frequency
- It refers to how often the search term appears in the entire index of documents that exist.
- The more often a word appears accross the index, the less relevant it is for a particular document.
- Really common terms such as "this", "that", "a", "if" will appear accross many documents. These become less relevant when they appear within our search terms.

##### 3.Field-length Norm
- It refers to the length of the field that was searched.
- Longer fields, less relevant
- If a term occurs in fields that are of longer length, that document is considered less relevant than those documents where the term appears in fields that are of shorter length.
- When a term appears amongst a much larger set of words, it's considered to be less important than if it were a part of a smaller set of words.

> TF/IDF score can be combined with other factors based on the query clause.





---