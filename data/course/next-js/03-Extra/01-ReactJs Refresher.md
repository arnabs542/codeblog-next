---
title: ReactJs Refresher
type: topic
section: Extra
course: NextJs
tags: 
- nextjs
---
## What is React?
- A client-side JavaScript library for building user interfaces.
- Declarative, Component focused approach.
- Building Single Page Apps (SPAs).
- Alternatuves: Angular, Vue.js, etc.

> All HTML elements in JSX are actually react components.

---
## Create React App
- Install Node.js
- Run `npx create-react-app my-app`
- Go to project directory `cd my-app`
- Run `npm start`
- When you’re ready to deploy to production, create a minified bundle with `npm run build`

#### Imperative approach
```js
document.querySelector('btn').addEventListener('click');
```

#### Declarative approach
- Add an attribute 'action'

```html
    <div className='actions'>
        <button className='btn' onClick={deleteHandler}>Delete</button>
    </div>
```






