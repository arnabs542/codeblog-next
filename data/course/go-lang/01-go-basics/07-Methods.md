---
title: Methods
type: topic
section: Basics
course: Go Lang
tags:
- GoLang
---
## Function
##### Function declarations
```go
func functionName() {}
```
Between the mandatory parentheses ( ) no, one, or more parameters (separated by ,) can be given as input to the function. After the name of each parameter variable must come its type.
```go
func func_Name(param1 type1, param2 type2, ...){
  ...
}
```
If the function is returning an object of type `type1`, we follow the syntax as:
```go
func func_Name(param1 type1, param2 type2, ...) type1 {
  ...
}
```
if variable `ret1` of type `type1` is to be returned,
```go
func func_Name(param1 type1, param2 type2, ...) ret1 type1 {
  ...
}
```
general function returning multiple variables looks like:
```go
func func_Name(param1 type1, param2 type2, ...) (ret1 type1, ret2 ret2, ...) {
...
}
```
Smaller functions can be written on one line like:
```go
func Sum(a, b int) int { return a + b }
```

##### `Main` function
The `main` function as a starting point is required (usually the first function), otherwise the build-error: `undefined: main.main` occurs. The main function has no parameters and no return type (in contrary to the C-family) otherwise, you get the build-error: `func main must have no arguments and no return values`.

When the program executes, after initializations the first function called (the entry-point of the application) will be the `main.main()` (like in C). The program exits immediately and successfully when `main.main` returns.










---