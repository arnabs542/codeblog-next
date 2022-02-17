---
title: 'Trie'
type: 'topic'
section: 'Binary Tree'
course: 'Data Structures'
tags:
- js
- array
---
## What is a Trie?
- It is a tree-like data structure which proves to be really efficient while solving programming problems related to Strings. It is also known as “Prefix Trees”.
- Trie basically comes from the word “retrieval”, as the main purpose of using this structure is that it provides fast retrieval. 
- Tries are mostly used for searching words in the dictionary, providing auto-suggestions in search engines, and for IP routing.

#### Applications of Tries
Tries are basically used where fast retrieval is required.
1. Auto-Complete Words
2. Spell-Checking
3. Searching for a Contact in Phone

#### Properties of Trie
1. Tries are similar to Graphs, as they are a combination of nodes where each node represents a unique alphabet.
2. Tries are more like ordered trees where each of the children can either be Null or points to a node.
3. The size of the Trie depends upon the number of letters. For example, in English there are 26 letters, so the size of a Trie node cannot exceed 26.
4. The depth of a Trie depends on the longest word that it stores.
5. Another important property of Tries is that they provide the same path for words that share a common prefix. For example, “there” and “their” have a common prefix “the”, so they will share the same path till “e”. After that, they will be divided into two branches. The whole working of Trie depends on this property, so we will discuss this later in detail.

---
## Trie Implementation

#### Inserting in a Trie
Insertion is simple for individual characters in the trie. If the character is already present, we follow the path; if that character is not present, then we insert the corresponding nodes. While inserting the last node, we must also set the value of isEndWord() to true.

The Insert() function takes an argument of a string key, indicating a word which will be stored for that particular word/key.

Null-keys are not allowed, and keys are stored in lowercase.

We simply iterate the key character by character, and we generate an index for each character using getIndex(). Afterward, we check the child of currentNode at that particular index, and if it’s null then we create a new TrieNode at that index indicating the specific character of the given key.

In the end, we mark the currentNode as leaf; i.e we’re setting the last character as the end of the word we just stored as “key”.

#### Search in a Trie
If we want to search whether a word is present in the Trie or not, then we just need to keep tracing the path in the Trie that corresponds to the characters in the word.

The Search() function takes in the “key” of type string as an argument and returns a boolean true or false based on if the “key” is found in Trie or not.

As we know from insertion, null keys aren’t allowed and all characters are stored in lowercase.

Just like we did in insertion, we’ll traverse the key character by character, and for each character, we will see if children exist for currentNode for that particular index. We generate an index of each character by calling getIndex()), and we will simply return false if children don’t exist. We only return true if the key is completely traversed and isEndWord() is set for the last node in the path.

#### Deletion in a Trie
While deleting a word from a Trie, we make sure that the node that we are trying to delete does not have any further branches. If there are no branches, then we can easily remove the node. However, if the node contains further branches then this opens up a lot of the scenarios covered below.
1. If the word to be deleted has no common subsequence, then all the nodes of that word are deleted.
2. If the word to be deleted is a prefix of some other word, then the value of `isEndWord` of the last node of that word is set to `false`, and no node is deleted.
3. If the word to be deleted has a common prefix and the last node of that word is also the leaf node (i.e. the last node of its branch), then this node is deleted along with all the higher-up nodes in its branch that do not have any other children and whose `isEndWord` is false.

In main() function, we first check if the string we want to delete is present in our Trie. If the search results are positive then the Delete("key") function is called.

It takes in a “key” of type String and then checks if either the Trie is empty or the key is null; if any of the cases is true, it simply returns from the function.

If the Trie is not empty and the “key” is also not null, then deleteHelper() is called to delete the key. It is a recursive function and takes in a “key” of type String, root of Trie, length of the key, and an integer indicating level as an argument.

It goes through all the cases explained above, while the base case for this recursive function is when the level becomes equal to the length of the key; i.e we’ve reached the last node in a Trie path, indicating the last character for the particular word. At this point, we check if the last node has any further children or not. If it does then we simply unMark it (i.e set isEndWord to false). On the other hand, if the last node doesn’t contain any children, then we simply set it to null and move up in Trie to check for the remaining nodes of the path.




---