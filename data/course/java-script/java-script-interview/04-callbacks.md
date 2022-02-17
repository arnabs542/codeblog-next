---
title: 'Callbacks'
type: 'topic'
section: 'JavaScript Interview'
course: 'JavaScript'
tags:
- design
- system design
- ElasticSearch
---
### Callback Functions
```
const checkName = (firstName, lastName, callback) => {
    if (!firstName) return callback(new Error('No First Name Entered'))
    if(!lastName) return callback(firstName)
    const fullName = `${firstName}` + `${lastName}`

    return callback(fullName)
}
function callback(arg){
  console.log(arg)
}
```

### Asynchronous Callback Functions
**Code Snippet**

```
const getTodo = () => {
    setTimeout(() => {
        return { text: 'Complete Code Example' }
    }, 2000)
}
function display(){
    const todo = getTodo()
    console.log(todo.text)
}
```
Output:
```
Cannot read property 'text' of undefined
```

**Code Snippet**

```
const getTodo = callback => {
    setTimeout(() => {
       callback ({ text: 'Complete Code Example' })
    }, 2000)
    
}
function display(){
   getTodo(todo => {
        console.log(todo.text) 
    })
}
```
Output:
```
Complete Code Example	
```



---