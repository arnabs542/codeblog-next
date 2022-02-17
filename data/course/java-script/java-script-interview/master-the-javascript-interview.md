---
title: 'Master the JavaScript Interview'
type: 'topic'
section: 'JavaScript Interview'
course: 'JavaScript'
tags:
- design
- system design
- ElasticSearch
---
## Strings & Arrays
#### 1. Is Unique
Create a function that determines whether all characters in a string are unique or not.

**Method 1:** O(n)
```
function isUnique(str) {
    for(let i = 0; i < str.length; i++) {
        if(str.lastIndexOf(str[i]) !== i) {
            return false;
        }
    }
    return true;
}
```

**Method 2:** O(n)
```
function isUnique(str) {
    const chars = {};
    for(let i = 0; i < str.length; i++) {
        const thisChar = str[i];
        if(chars[thisChar]) {
            return false;
        }
        chars[thisChar] = true;
    }
    return true;
}
```

**Method 3: ES6**
```
function isUnique(str) {
    const chars = new Set();
    for(let i = 0; i < str.length; i++) {
        const thisChar = str[i];
        if(chars.has(thisChar)) {
            return false;
        }
        chars.add(thisChar);
    }
    return true;
}
```

**Method 4: ES6**
```
function isUnique(str) {
    return new Set(str).size === str.length;
}
```

---
#### 2. Flatten Array
Write a function that will take an array of deeply nested arrays and extract every item, flattening the array. It should return a new array that contains the items of each internal array, preserving order.

**Method 1: Recursion**
```
function flatten(nestedArray) {
    const newArray = [];
    for(let i = 0; i < nestedArray.length; i++) {
        const thisItem = nestedArray[i];
         if(Array.isArray(thisItem)) {
             const flatItem = flatten(thisItem);
             for(let j = 0; j < flatItem.length; j++) {
                 newArray.push(flatItem[j]);
             }
         } else {
             newArray.push(thisItem);
         }
    }   
    return newArray;
}
```

---
#### 3. Remove Duplicates
Write a function that takes in a string and returns a new string. The new string should be the same as the original with every duplicate character removed.

**Method 1:**
```
function removeDupes(str) {
    const characters = {};
    const uniqueCharacters = [];
    for(let i = 0; i < str.length; i++) {
        const thisChar = str[i];
        if(!characters[thisChar]) {
            characters[thisChar] = true;
            uniqueCharacters.push(thisChar);
        }
    }   
    return uniqueCharacters.join('');
}
```

**Method 2:**
```
function removeDupes(str) {
    const uniqueCharacters = new Set(str);
    return Array.from(uniqueCharacters).join('');
}
```

---
#### 4. Highest Frequency
Write a function that takes an array of strings and returns the most commonly occurring string in that array.

**Method 1:**
```
function highestFrequency(strings) {
    const frequencies = {};
    let maxFrequency = 0;
    let mostFrequentString = strings[0];
    for(let i = 0; i < strings.length; i++) {
        const thisStr = strings[i];
        if(frequencies[thisStr] === undefined) {
            frequencies[thisStr] = 1;
        } else {
            frequencies[thisStr]++;
        }
        if(frequencies[thisStr] > maxFrequency) {
            maxFrequency = frequencies[thisStr];
            mostFrequentString = thisStr;
        }
    }   
    return mostFrequentString;
}
```

---
#### 5. String Rotation
Create a function that takes in 2 strings as parameters. Return true if the strings are rotations of each other. Otherwise, return false.

**Method 1:**
```
function stringRotation(str1, str2) {
    if(str1.length !== str2.length) {
        return false;
    }
    for(let i = 0; i < str1.length; i++) {
        const rotation = str1.slice(i, str1.length) + str1.slice(0, i);
        if(rotation === str2) {
            return true;
        }
    }
    return false;
}
```

**Method 2:**
```
function stringRotation(str1, str2) {
    return str1.length === str2.length && (str1 + str1).includes(str2);
}
```

---