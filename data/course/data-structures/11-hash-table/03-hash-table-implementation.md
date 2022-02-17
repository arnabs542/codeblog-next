---
title: 'Hash Table Implementation'
type: 'topic'
section: 'Hash Table'
course: 'Data Structures'
tags:
- js
- array
---
## Hash Table Implementation using Buckets
- Here, we will use Bucket strategy to avoid collisions.
- A typical Hash entry consists of three data members: a key, the data itself, and the reference to a new entry.

**Note:** hashCode method might return a negative integer. If a string is long enough, its hashcode will be bigger than the largest integer we can store on 32 bits CPU. In this case, due to integer overflow, the value returned by hashCode can be negative. Therefore, we will get a negative index. In this case, we add slots to the current index to make it positive and then take a mod of it to get a positive index.


---
## Java Classes
1. `Map<K, V>`
2. `Hashtable<K, V>`
3. `HashMap<K, V>`

