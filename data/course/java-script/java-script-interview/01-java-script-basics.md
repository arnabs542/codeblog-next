---
title: 'JavaScript Basics'
type: 'topic'
section: 'JavaScript Interview'
course: 'JavaScript'
tags:
- design
- system design
- ElasticSearch
---
### 1. Hoisting
- In JavaScript, a variable can be declared after it has been used. This is because variable declarations using `var` are **hoisted** to the top of their **functional scope** at compile time. Hence, a variable can be initialized and used before it has been declared.
- Only the **declarations** get hoisted to the top, not the **initializations**.

##### a. Code snippet
```
function Add(){
    console.log(answer)
    var answer = 2
};
Add()
```
Output:
```
undefined
```

##### b. Code snippet
```
var temp= 'hi';
function display(){
    console.log(temp);
    var temp = 'bye';
};
display();
```
Output: 
```
undefined
```

---
### 2. Arrow Functions
Arrow functions were introduced in the ES6 version of JavaScript to offer a new syntax for writing functions. They present a more concise way of writing function expressions. They use the => token.

##### How does the arrow function differ from other functions?
1. Arrow functions implicitly return values; hence, the use of the `return` keyword can also be avoided.
2. It is anonymous. There is no need for a name or the `function` keyword in an arrow function.
3. Inherits the value of `this` from its enclosing scope. Arrow functions bind `this` lexically; meaning since they don’t have their own context in which they execute, `this` gets inherited from the parent function. Hence, they don’t have their own `this` value.
4. It cannot be used as a constructor, as it does not have its own `new.target` property. It cannot be called by `new` as there is no internal method `[[Construct]]` that allows it. They don’t have any `prototype` property either.

##### Arrow function’s uses cases?
1. Arrow functions bind the context statically hence, they should not be used if `this` is bound dynamically.
2. Using arrow functions in codes using promises or asynchronous callbacks makes the code easier to read and more concise. This is because such codes tend to have a lot of function and return keywords, and with promises, these function expressions can be used for chaining too. Hence, using arrow functions, the code is simplified.
3. Arrow functions should not be used to create object methods since they would create problems if you attempt to subclass/use this object as a prototype.
4. One of the common operations you might need to perform on an array is to `map` or `reduce` them. Doing this using arrow functions makes the code more concise and easier to read.

> The `this` keyword works differently in arrow functions. None of the functions `call`, `bind`, or `apply` can change its value, so **it remains the same as when the function was first called**.

---
### 3. Call, Apply & Bind
##### `Function.call`
- The `call` method allows for a method that was defined for one object to be assigned and called on by another object.
- This allows for a method to get defined once and then get inherited by other objects without having to re-write it for other objects.

```
var animal = {
  animalInfo: function() {
    return this.name + " is " + this.age + " years old"
  }
}
var cat = {
  name : "Tom",
  age : 5
}
console.log(animal.animalInfo.call(cat))
```
Output:
```
Tom is 5 years old
```

##### `Function.apply`
- `apply` serves the exact same purpose as `call`.
- The only difference between the two is that `call` expects all parameters to be passed individually, whereas `apply` expects the second argument to be an array of all the parameters.
- Both call and apply can only be called on other functions;

```
var animal = {
  animalInfo: function(sound,food) {
    return this.name + " is " + this.age + " years old" + " . He makes the sound "+ sound + " and eats " + food
  }
}
var cat = {
  name : "Tom",
  age : 5
}
console.log(animal.animalInfo.apply(cat,["meow", "fish"]))
```
Output:
```
Tom is 5 years old . He makes the sound meow and eats fish
```

##### `Function.prototype.bind`
- The `bind` function creates a new function whose `this` value can be set to the value provided during the function call, enabling the calling of a function with a specified `this` value (the first parameter to `bind` function).

```
var obj = {
    name:"Tom"
};
var info = function(a,b,c){
    return this.name + " likes to eat " + a + " " + b + " and " +c;
};
var bound = info.bind(obj,"Pasta"); 
console.log(bound("Donuts","Chips","Cake")); //calling the bound function later
```
Output:
```
Tom likes to eat Pasta Donuts and Chips
```

**Problem**
- Create a function, bind, that is equivalent to Function.protototype.bind.

```
const bind = (fn, obj) => (...args) => fn.apply(obj, args)

function multiply(a) {
  console.log(this.val * a.val2);
}

var obj = {val : 2}
function callingBind(){
  const bindFunc = bind(multiply, obj)
  bindFunc.call(this,{val2 : 2}) 
}
callingBind()
```


---
### 4. Closure
- A closure is a function that can access the variables from another function’s scope.
- This is possible by creating nested functions. The enclosing/outer function will, however, not have access to the inner scope.
- Closures are used to enable data privacy. The enclosed variables are only in scope within the outer function. The data cannot be accessed through an outside scope except through the use of **privileged methods**. Similarly, they are also used in event handlers and callback functions, as well as currying.

---
### 5. Call Stack & Event Loop
- JavaScript is single-threaded, meaning it can only run one command at a time. Due to this, commands are not run in parallel. Because the execution happens line-by-line, each command is considered synchronous hence blocking.

**`setTimeout`** - It is a web API provided by the browser that takes a callback function as its first parameter and time in milliseconds as its second parameter. It executes the callback function after the specified number of milliseconds pass.

```
console.log("Before Function")
setTimeout(function(){
  console.log("Inside Function")
},3000)
console.log("After Function")
```

##### Event table & queue
- The **call stack** stores all your running JavaScript code. The interpreter reads the code line-by-line, pushes each statement into the call stack one-by-one, and pops them once they execute.
- However, if the statement is **asynchronous**, it is removed from the call stack and forwarded to the **event table**. This table is responsible for moving the asynchronous code to the **event queue** after a specified time. Here the statement waits for execution.

**When will the statements from the event queue execute?**
The **event loop** is responsible for keeping check of both the **call stack** and the **event queue**. It keeps checking if all the statements from the call stack have finished execution; that is, if the call stack is empty. If so, it pops the statement from the event queue (if present) to the call stack to execute.

> **Note:** All synchronous statements execute first, and only then can the asynchronous ones execute.

##### Event loop
1. First, the command `console.log("Before Function")` (line 1) enters the call stack and executes.
1. Next, the `setTimeout` function statement enters the call stack, but since it is an asynchronous web API, the code (callback passed to `setTimeout` and the time) is removed from the call stack and put in the event table.
1. In the event table, the `setTimeout` callback function waits for the time specified, `3000ms` in this case. After this time passes, the callback function moves from the event table to the event queue to wait for execution.
1. In the meantime, the command `console.log("After Function")` (line 5) enters the call stack and executes.
1. All this time, the event loop will continuously check the call stack. When the last command (on line 5) finishes execution, it’ll check the event queue for any commands. There it’ll find the code for the `setTimeout` callback function, `console.log("Inside Function")`, which it’ll remove and pass to the call stack to execute, displaying it last.

> Note: Even though the time delay is passed in `setTimeout`, it does not necessarily mean the callback will execute right after. That’ll only happen once all the commands in the call stack execute.

##### Code Snippet
```
const array = [5, 11, 18, 25];
for (var i = 0; i < array.length; i++) {
  setTimeout(function() {
    console.log('Element: ' + array[i] + ', at index: ' + i);
  }, 3000);
}
```
Output:
```
Element: undefined, at index: 4
Element: undefined, at index: 4
Element: undefined, at index: 4
Element: undefined, at index: 4
```
**Explaination:**
- `setTimeout` creates a function (closure) that has access to the variables outside its scope, meaning it has access to the iterator i in the loop outside.
- `for` loop statements present in the call stack will execute first, meaning the loop will perform all its iterations: 0,1,2,3, up until 4, after which the condition, `i < array.length`, will become false, and only then will the `setTimeout` function callback be triggered. On each iteration of the loop, `setTimeout` is called; however, since it’s an asynchronous web API, the command enters the event queue, after which the next loop iteration occurs. Hence, the event queue waits for the loop commands to execute first and call stack to get empty, after which the four `setTimeout` commands move from the event queue to call stack and execute.

---
### 6. Immediately Invoked Function Expressions (IIFE)
- IIFE stands for Immediately Invoked Function Expressions. As the name implies, it is a way to execute the functions as soon as they are created.
- What we have is a function defined inside parentheses, and then we append () to invoke that function.
```
(function display() {
  console.log("Hello World")
})()
```

##### Code Snippet
```
const array = [5, 11, 18, 25];
for (let i = 0; i < array.length; i++) {
  setTimeout(function() {
    console.log('Element: ' + array[i] + ', at index: ' + i);
    }, 3000);
}
```
Output:
```
Element: 5, at index: 0
Element: 11, at index: 1
Element: 18, at index: 2
Element: 25, at index: 3
```
**Explaination:**
- Changing `var` to `let` changes the implementation so that the value of `i` is “held” until after the timeout finishes. It creates a new binding (storage space) for each loop iteration; each `i` refers to the binding of one specific iteration and preserves the value that was current at that time. Previously, using `var`, a single binding was created for `i`, each loop iteration referred to the same binding hence returning the same value.

##### Code Snippet
```
const array = [5, 11, 18, 25];
for (var i = 0; i < array.length; i++) {
  setTimeout(function(local_i) {
  return function(){
  console.log('Element: ' + array[local_i] + ', at index: ' + local_i);
  }
 }(i), 3000);
}
```
Output:
```
Element: 5, at index: 0
Element: 11, at index: 1
Element: 18, at index: 2
Element: 25, at index: 3
```
**Explaination:**
- Here the `setTimeout` function has another function as its first parameter. That function takes the parameter `local_i`, that is the variable i. It calls another function in return, an anonymous function that displays the value of i stored in the variable `local_i`
- `(i)` means the function passed to the setTimeout is being invoked for the respective value of `i` immediately. Such a function is known as **IIFE** (Immediately Invoked Function Expression). And the second parameter, `3000`, is the time delay before `setTimeout` executes the IIFE.

---
### 7. Rest & Spread Syntax
##### How is rest syntax different from spread syntax?
- **Rest** follows the same syntax as the **spread** syntax, i.e., placing three dots `...` before what we choose to copy. However, the difference lies in the purpose. Where spread is used to create copies of arrays/objects, rest is used to collect all the remaining values into an array.
- JavaScript ES6 offers the spread syntax, which is beneficial when it comes to functional programming because it allows us to create copies of arrays and objects easily.

**Code Snippet: Rest**
```
function display(a, b, ...rest) {
   console.log(a, b, rest);
}
display(9,10,11,12,13,14,15,16);
```
Output:
```
9 10 [ 11, 12, 13, 14, 15, 16 ]
```
**Code Snippet: Spread**
```
function display(arr) {
  return [...arr, 5,6,7];
}
const arr = [1,2,3,4];
console.log(display(arr)); 
```
Output:
```
[ 1, 2, 3, 4, 5, 6, 7 ]
```

---
### 8. Destructuring

**Code Snippet**
```
function display(){
    const exampleObject = {collection: [{name: "Kelly",}, {name: "Anna",}],}
    const {collection: [,{name:secondObject,}]} = exampleObject
    console.log(secondObject)
}
display() 
```
Output:
```
Anna
```

**Code Snippet**
```
function removeFirstTwo(list) {
  const [, , ...arr] = list; 
  return arr;
} 
var arrLiteral = [8,9,10,11,12]
console.log("arr contains: " + removeFirstTwo(arrLiteral))
```
Output:
```
arr contains: 10,11,12
```

**Code Snippet**
```
function pointValues(point){
    const {name:n,age:a} = {...point} 
    console.log(n)
    console.log(a)
}
pointValues({name:"jerry", age:2})
pointValues(undefined)
```
Output:
```
jerry
2
undefined
undefined
```

---