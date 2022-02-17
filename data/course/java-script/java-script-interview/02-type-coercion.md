---
title: 'Type coercion'
type: 'topic'
section: 'JavaScript Interview'
course: 'JavaScript'
tags:
- design
- system design
- ElasticSearch
---
### typeof
The following are the only built-in data types in JavaScript:
1. primitives (boolean, string, function, number, null, undefined)
2. Object

**Code Snippet**
```
var arr = [true,1,"tom",3.3]
typeof arr
```
Output: _(In JavaScript, an array is an object)_
```
object
```

---
### instanceof

**Code Snippet**
```
var names = ["Tom","Anna",2,true]
console.log(names instanceof String)
console.log(names instanceof Number)
console.log(names instanceof Object)
console.log(names instanceof Array)
```
Output:
```
false
false
true
true
```

**Code Snippet**
```
var str1 = 'This is a string'
var str2 = new String("String using new")
console.log(str1 instanceof String)
console.log(str2 instanceof String)
console.log(str2 instanceof Object)
console.log(str1 instanceof Object)
```
Output:
```
false
true
true
false
```

**Code Snippet**
```
console.log(typeof(Object.prototype))         //true
console.log(Object.prototype instanceof Object) //false
```
Output:
```
true
false
```

**Note:** `instanceof` searches the entire prototype chain to see if any constructor in the chain is equal to the given class. This way, it also takes inheritance into account.

**Code Snippet**
```
function MyClass() {}
MyClass.prototype = Object.create(null);
(new MyClass()) instanceof Object;
```
Output:
```
false
```

**Note:** JavaScript objects inherit from `Object` by default. However, this is not the case if you explicitly create the object with `null` as its prototype, as with `Object.create(null)`. Now the prototype property of `Func` points to an empty object without a prototype, i.e., `null`.

---
### Instance of Array

**Code Snippet**
```
function check(){
    var tempFunc = function () {}
    return new tempFunc instanceof Array; 
}
console.log(check())
```
Output:
```
false
```

**Code Snippet**
```
function check(){
    var tempFunc = function () {}
    tempFunc.prototype = Array.prototype
    return new tempFunc instanceof Array; 
}
console.log(check())
```
Output:
```
true
```

**Note:** we use `tempFunc` as a constructor function to create a new instance. We use the `new` operator to create a new object from `tempFunc`. Object is not an instance of an Array because the object instance of Array will check if `Array.prototype` is present in the prototype chain of the object. It is not, so it returns false. 

**Code Snippet**
```
var tempFunc1 = function () {
    return {}
}
function check(){
    var object1 = new tempFunc1();
    var object2 = tempFunc1();
    return (object1 instanceof tempFunc1 === object2 instanceof tempFunc1);     
}
console.log(check())
```
Output:
```
true
```

**Code Snippet**
```
console.log(Object.prototype.toString.call(new (function Custom(){})));
```
Output:
```
[object Object]
```

**Note:** `Custom` is defined with an empty body. Since we call it with the keyword `new`, it acts as a **constructor function**. Hence, it creates and returns an **object instance**. So when `Object.prototype.toString` is called on this object instance, we get `[object Object]` as the answer.

**Code Snippet**
```
(function tempFunc() {
    function func() {
        return
        {
            val: "deb"
        }
    }
    console.log(typeof func());
})();
```
Output:
```
undefined
```

**Note:** `typeof` operator is not called on `func` but on `func()`, meaning the function is invoked. `return` statement does not return over a newline. The line break causes `undefined` to be returned

##### Validate Date
```
const isValidDate = dateString => {
  const date = new Date(dateString);
  if (
    Object.prototype.toString.call(date) === "[object Date]" &&
    !isNaN(date.getTime())
  ) {
    return true;
  } else {
    return false;
  }
};
console.log(isValidDate("foo"));
console.log(isValidDate("October 30, 2019"));
console.log(isValidDate("May 8, 2016 10:12:00"));
console.log(isValidDate("April 15, 2012 11:xyz"));
```

Output:
```
false
true
true
false
```

---