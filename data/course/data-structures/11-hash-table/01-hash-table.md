---
title: 'Hash Table'
type: 'topic'
section: 'Hash Table'
course: 'Data Structures'
tags:
- js
- array
---
## What is Hashing?
- Hashing is a process used to uniquely identify objects and store each object at some pre-calculated unique index called its `key`.
- So the object is stored in the form of a `key-value` pair, and the collection of such items is called **“Dictionary”**
- Each object can be searched using that key in `O(1)`

There are different data structures based on Hashing, but the most commonly used data structure is a **Hash Table**.

---
## Hash Table
- The major target of Hash Tables is to minimize the searching time of any sort of data that needs to be fetched.

#### Implementation
- Hash Tables are generally implemented using `Arrays`, as they are the only data structures that provide access to elements in constant `O(1)` time.

##### Key-Value Pair
So the idea of data retrieval in O(1) is executed by using a key to map the data on an array (there are many ways to compute this key). In the case of arrays, you can directly use the key as an index to store data. If you pass the key to the array, the value is retrieved; alternatively (in the most naive form),
```
value = arr[key]
```

The index of array is calculated through a **Hash function**.

Hashing is often used in environments where we have to deal with crazy humongous datasets. So, the key to search the value might become so large that we need a function() to convert this large key into a smaller key that can fit into the range of 0 to n-1, where n is the size of the array. We can do this using a **Hash Function**.

#### The performance of the Hashing data structure depends upon these three factors:
1. Hash Function
2. Size of the Hash Table
3. Collision Handling Method

---
## Hash Function
- A hash function simply takes a `key` of an item and returns a calculated `index` in the array for that item.
- This index calculation can be a simple or a very complicated encryption method.

#### Commonly Used Hash Functions
1. **Arithmetic Modular:** Take mod of the key with the size of an array (called table). Hence, the index will always stay between `0` and `tableSize - 1`.
```
index = key MOD tableSize
```

2. **Truncation:** Select a part of the key as the index rather than the whole key. Once again, we can use a mod function for this operation, although it does not need to be based on the list size.
```
key = 123456 −> index = 3456
```

3. **Folding:** Divide the key into smaller chunks and apply different strategies at each chunk. For example, you can add the divided chunks and re-build a different Hashed key:
```
key = 456789  −> index = 45 + 67 + 89
```

---
## Collisions in Hash Tables
- Hash functions generate an index corresponding to every key, so it is accessed in O(1). There are times when the Hash function generates the same index of the array for two different keys; this causes the collision.

#### Strategies to Handle Collisions
##### 1. Linear Probing
- Linear Probing suggests that if the index is already filled, move to the next index. It could be achieved by adding an offset value to an already computed index. If that index is also filled, add it again and so on.

**Disadvantage:** One drawback of using this strategy is that if you don’t pick an offset wisely, you can jump back to where you started and miss out on so many possible positions in the array.

##### 2. Chaining
- Chaining was initially implemented by combining multiple arrays as buckets, but we shifted to more efficient data structures later on.
- Each cell of the table holds a pointer to a linked-list on any other suitable data structure, such as a Doubly Linked-List or even a tree.

##### 3. Re-sizing the Array
- We can set a threshold and once it is crossed, we can create a new table which is double the size of the original. All we have to do then is to copy the elements from the previous table.
- Resizing the list significantly reduces collisions, but the function itself is costly. Therefore, we need to be careful about the threshold we set. A typical convention is to set the threshold at 0.6, which means that when 60% of the table is filled, the resize operation needs to take place.
- Another factor to keep in mind is the content of the Hash Table. The stored records might be concentrated in one region, leaving the rest of the list empty. However, this behavior will not be picked up by the resize function and you will end up resizing inappropriately.

**Note:**
- Some other strategies to handle collisions include Quadratic Probing, Bucket Method, Random Probing or Re-hashing the key.


---