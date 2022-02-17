---
title: 'Hash Table Comparisons'
type: 'topic'
section: 'Hash Table'
course: 'Data Structures'
tags:
- js
- array
---
## Comparison between Trie & HashTable
you can use Hash Tables to build dictionaries, but if you need a fast lookup and have long words which share common prefixes then a Trie is the perfect data structure for you. It also makes storing words easier, as the implementation is very simple.

1. **Common Prefixes**
In Tries, the words having common prefixes share a common path until the end of the prefix. After that, they are divided into two branches. We cannot do that in Hash Tables; no matter how similar the words are, we would still need to store them at different locations. This would result in irrelevant iterations while searching. Here is an interesting example to explain what we just said: two words “interest” and “interesting” will be stored differently in a HashTable, but in a Trie we only need to add 3 new nodes for “ing” at the end of the “t” Node. Did you notice the space efficiency?

2. **Lookup for Exact Words**
As discussed in the previous lesson, Tries can perform a spell-check, but in Hashing. We can only look up exact words, otherwise, it will not be able to identify the word.

3. **No Re-hashing Required**
The most important part of a HashTable is the Hash function. It is often very difficult to build as the performance of HashTable is entirely dependent on it. But in Tries, we do not need to perform re-hashing to generate an index. It just traverses the nodes and inserts new nodes, that’s it!

4. **Collision Resolution**
One downside of using a HashTable is that we always need to come up with good collision resolution strategies to avoid collisions if the data is huge. A collision can never occur in Trie because all words are unique and can act like a “key”. This makes the implementation of Tries so much simpler!

5. **Memory Requirements**
In worst case scenarios, a Trie will definitely perform better than a HashTable, but HashTables will be more convenient to use in average cases-- depending upon the efficiency of the Hash function. As in Trie, we need to allocate 26 pointers at every node even if most of them are Null, so a HashTable would be more of a wise choice here!

If your dictionary contains a lot of words with common prefixes or suffixes then Tries would be an efficient data structure to use as compared to Hash-Tables.

---
## HashMap vs HashSet

### HashMap
- HashMap is a collection that contains all the key-value pairs; it maps the values to keys.
- There is a built-in class available in Java for HashMap, implemented by using Map interface.
- It provides the basic functionality of hashing along with some helper functions that help in the process of insertion, deletion, and search.

##### Features of HashMap
1. A HashMap stores key-value pairs to map a key to the value
2. HashMap cannot contain duplicate keys. It can, however, have duplicate values.
3. HashMap also allows multiple null values and only one null key
4. This mechanism does not support synchronous operations and is not thread-safe.

### HashSet
- HashSet class is implemented in Java using Set interface. It is also built in the same way as HashMap, i.e., using the Hash Table class, but it is still quite different from the HashMap class.

##### Features of HashSet
1. HashSet also stores values in an unordered way, using hashing, but this happens in the backend. On the backend, the HashSet class is implemented using the HashMap class. The value that we add to the HashSet is then added to the HashMap as a key, corresponding to a dummy value Object. The retrieval remains O(1)O(1)
2. HashSet is a class which implements the Set interface and this interface only stores values, not a key-value pair.
3. HashSet restricts storing multiple null values and only allows one null value in the whole table
4. HashSet does not allow storing duplicate values as a set can only contain unique elements
5. Just like HashMap, HashSet also does not support synchronous operations

---