---
title: 'Array Basics'
type: 'topic'
section: 'Array'
course: 'Data Structures'
tags:
- js
- array
---

## What is an Array?
- An array also referred to as **a collection of elements**, is the simplest and most widely used Data Structure.
- The purpose of an Array is to group similar kinds of data for fast access.
- Each data element has a maximum of two neighbors, except the first and last one.

### Array Indexing 
- Each data element is assigned a numerical value called the index, which corresponds to the position of that item in the array.
- The value of the index is non-negative and always starts from zero.
- An index makes it possible to access the contents of the array directly.

### Types of Arrays
1. One Dimensional Array
2. Multi-Dimensional Array

- Arrays can store primitive data-type values (e.g., int, char, floats, boolean, byte, short, long, etc.), non-primitive data-type values (e.g., Java Objects, etc.) or it can even hold references of other arrays. 
- In primitive array, values are stored in a contiguous memory location. Whereas, in the non-primitive array, objects are stored in the heap segment.

---
## One-Dimensional Array  
##### Array Declaration
```
int myArray1[];
int[] myArray2;
```

##### Array Initialization
```
arrayName = new type [size];
```

##### Initialization and Declaration in One Step
```
datatype[] arrayName = new datatype [size];
datatype arrayName[] = new datatype [size];
```

##### Adding or Updating Elements in an Array
```
arrayName[index] = value;
```
- Trying to access the element outside the array size will generate an ArrayIndexOutOfBoundsException.

##### Adding Elements using Array Literal
```
datatype[] arrayName = {Comma Separated list of values};
```

---
## How are arrays stored in memory? 
- In Java, arrays are dynamically allocated. Arrays are stored in the memory using a reference pointer, which points to the first element.
- The only drawback of using arrays is that we have to specify the size of the array during the time of instantiation. That means the size remains fixed and can not be extended.
- If we want to add more elements, we will have to create a new array, copy all the items from the old array to the new one, and then insert the new element.

---
## Two Dimensional Arrays
- **References** are used to explicitly store memory locations that hold a value or an object.
- Any time you build an object in Java, you basically create a reference to that object.
- A **Two Dimensional Array** is an array of references that holds references to other arrays. These arrays are preferably used if you want to put together data items in a table or matrix-like structure.
- It is important to note that in 2D arrays, all values must have the same data type. This means that you can’t store an array of integers next to an array of strings and vice versa.

##### Initialization
Initialization in Two Dimensional Arrays is done using two values for the number of Rows and Columns.
```
int [][] my2DArray;
my2DArray = new int[3][4];  // rows = 3, columns = 4
```

##### Adding Elements in 2-D Arrays
```
my2DArray[0][1] = 10;
```

---
## Three Dimensional Arrays
These arrays are an extension to 2D Arrays but are slightly more complex as they have one additional feature. Now the values in the cell will also hold a reference to some object, any primitive type value, or any other data structure.



---