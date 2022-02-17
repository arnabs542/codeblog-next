---
title: 'Inverted Index'
type: 'topic'
section: '01 Basics'
course: 'ElasticSearch'
tags:
- design
- system design
- ElasticSearch
---
#### Inverted Index

##### Steps
- All documents in any corpus have content. To know the existance of these documents so that they can be indexed, is done by running a crawler, which looks for these documents in the corpus.
- Once the documents are accessed, their contents are parsed and analyzed
- The entire text is tokenized into words. Individual words are split up and normalized by lowercasing them so that all comparisions can be in lowercase and all punctuations are removed. This is just one way of tokenizing and parsing.
- Every word is associated with a frequency. The frequency determines how often that word occurs in the corpus of documents that we have indexed.
- Along with all the words present in the text and their corresponding frequencies, the inverted index contains the source document in which those words were found.
- Every word here in inverted index is mapped to one or more source documents.
- The mapping of words to frequencies and the corresponding source documents is the **Inverted Index**.
- Words and corresponding frequencies are called **Dictionary**. Dictionary is usually sorted so looking up a particular word here becomes very easy. 
- When we enter the terms that we want to search for, those are looked up within this sorted dictionary, and the corresponding postings for those terms are found. 
- **Postings** are Basically the source documents where that word occurs.
- In search terminology, this inverted index is sometimes called the **Postings List**.
- We can also combine words with Boolean operations. Eg,
  - coming **AND** winter
  - our **OR** strong
- Inverted Index Data Structure can be used to build up terms for more complicated searches.

---
