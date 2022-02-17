---
title: Execution Context
type: 'topic'
section: 'Understanding the Weird Parts'
course: 'JavaScript'
tags:
- design
- system design
- ElasticSearch
---
## Syntax Parser
- A program that reads your code and determines what it does and if its grammer is correct.

## Lexical Environment
- Where something sits physically in the code you write.
- 'Lexical' means "having to do with words or grammar".
- A Lexical environment exists in programming languages in which **where** you write something is **important**.

## Execution Context
- A wrapper to help manage the code that is running.
- There are lots of lexical environments. Which one is currently running is managed via execution contexts.
- It can contain things beyond what you have written in your code.

---
## Name/Valur Pair
- A name which maps to a unique value.
- The name may be defined more than once, but only can have one value in any given context. That value may be more name/value pairs (object).

```js
name = 'Sachin' // name-value pair

```

## Object
- A collection of name value pairs.

```js
Adress = {
    city: 'Bangalore',
    street: 'MG Road',
    house: {
        floor: 4,
        number: 104
    }
}
```

## Global environment and Global object
JavaScript engine creates 2 things as part of execution context:
1. Global Object
2. 'this' variable

### Global
- Global means code or variable not inside a function.
- In JavaScript, when you create variables and functions, and you are not inside a function, they get attached to global object.

```js
var a = 10
console.log(this.a) // 10
```

#### Execution Context Phases:
1. **Creation Phase:** Execution Context is created.
    - Global object is steup in memory
    - 'this' variable is created
    - Outer environment
    - Sets up memory space for variables and functions called **"Hoisting"**. It puts a placeholder for variables initially set to `undefined`.
2. **Execution Phase:** Execution Context runs code line by line

```js
b() // c equals 20
console.log(a)  // undefined

var a = 'Hello World'

function b() {
    var c = 20  // function scope
    console.log('c equals '+ c)
}
```

> `undefined` is a special value that JabaScript has internally, it means that variable hasn't been set.

## Single Threaded Synchronous Execution
- Single Threaded: One command is executed at a time.
- Synchronous Execution: One line of code is executed at a time and in order.

## Function Invocation and Execution Stack
- **Invocation** means running a function by using parenthesis "()".
- **Execution Stack** is a stack of execution context, and whichever is on top is the one that is currently running.
- Whenever a function is called, a new execution context is created and placed on the Execution Stack.

```js
function a() {
    console.log('called A')
    b()
    var c
}
function b() {
    console.log('called B')
    var d
}
a()
console.log(c)  // error
console.log(d)  // error
```

## Variable Environment
- Variable Environment is where the variables live.

```js
function a() {
    console.log('called A')
    var x
    console.log('inside A: ' + x)
    b()
}
function b() {
    console.log('called B')
    var x = 2
    console.log('inside B: ' + x)
}

var x = 1
console.log('Global: ' + x)
a()
console.log('Global: ' + x)
```

## Scope chain
- Every execution context has access to its outer environment. 
- Where a function sits lexically determines its outer environment.

```js
function a() {
    var x = 20
    b()
}
function b() {
    console.log(x)  // 10
}
var x = 10
a()
```

- For `a()` and `b()`, **outer environment** is global execution context. Because lexically `b()` sits on top of global environment, not inside `a()`.

```js
function a() {
    function b() {
        console.log(x)
    }
    b() // undefined
    var x = 20
    b() // 20
}
var x = 10
a()
b() // error, because b() is not added in global level, so it was not found in creation phase
```

- Here, `b()` sits inside `a()`, so outer environment of `b()` is `a()`.
- `b()` is not created untill execution environment of `a()` is created.

```js
function a() {
    function b() {
        console.log(x)  // 10
    }
    b()
}
var x = 10
a()
```

---
#### Scope, ES6 and `let`
- Where a variable is available in your code and if it's truly the same variable or a new copy.

---
#### Asynchronous Callbacks
- **Asynchronous** means more than one at a time.

### Event Queue
```js
function waitSeconds(seconds) {
    let ms = seconds * 1000 + new Date().getTime()
    while (new Date() < ms) {}
    console.log('finished function')
}
function clickHandler() {
    console.log('Click handle')
}
document.addEventListener('click', clickHandler)
waitSeconds(3)
console.log('finished execution')
// click before 3 seconds
```