---
title: 'Introduction to ElasticSearch'
type: 'topic'
section: '01 Basics'
course: 'ElasticSearch'
tags:
- design
- system design
- ElasticSearch
---
#### What is ElasticSearch?
- It is a open source search and **analytical engine** that allows us to build and deploy efficient and robust search quickly.
- It uses inverted index which is a datastructure at the heart of every search engine.
- **Theory behind search:** TF/IDF algorithms for search ranking and relevence
- **Variety of searches:** Full-text query, compound query, filters

##### Objective of Search
- To find the most relevant documents that exist which have your search terms.

---
#### How does Search works?
1. Search engine has to know if document exists
2. Index the document for lookup
3. Know how relevant the document is
4. Retrieve documents ranked by relevance

##### 1. Web Crawler
- It crawls across all web pages following links as it sees them in order to create a massive corpus of all documents that exist.

##### 2.  Inverted index
- Every document found by the web crawler is indexed, that is it is parsed and tokenized, the individual terms extracted and stored in a data structure called an inverted index.
- Inverted index is a mapping from a term to the document where that term is found.
- It's inverted because it goes from the search term to the web page of the document.

##### 3. Scoring
- Every document in the corpus will have an associated score called the relevant score.
- Documents have to be scored before the results are returned so that those documents with the highest scores are shown on top of the search results.
- The highest scoring documents are the most relevant for those particular search terms.
- Relevance is a function of the search term as well as of the document itself.

##### 4. Search
- It looks up documents in the inverted index, finds the most relevant ones, and return those at the top of search results.

> Search algorithms in the real world are way more complicated than these 4 steps. We have to take care of spammers, irrelevant results, etc.

---
