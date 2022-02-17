---
title: File Based Routing
type: topic
section: Basics
course: NextJs
tags:
- nextjs
---
## File Based Routing
- We create react component files and let NextJS infer the routes from the folder structure.
- We use special `/pages` folder for this.


#### Static Routes
- 
- Nested Routing

#### Dynamic Routes
- `[].js` is used for dynamic path. E.g., `[productId].js`
- `[...slug].js` is used for taking an array of path parameters.

---
## Navigating with Link Component
- With standard `<a></a>` link, we send a brand new HTTP request to load new page. Any application state we have on running react app will be lost.
- In Next.js, we use `Link` component which maintains the state of the running application.

```jsx
<Link href='/blog/test'>Click Here</Link>
```

- Instead of passing a string to `<Link>` component, we can also pass an object.

```jsx
<Link href={{ 
    pathname: '/client/[id]', 
    query: { id: client.id } 
    }}
>Click Here</Link>
```

#### Navigating programmatically

```javascript
const router = useRouter();
function loadProjectHandler() {
    // load data
    router.push('/client/max');
}
```

```jsx
<button onClick={loadProjectHandler}>Load Project</button>
```

---
## 404 Page
- We can add a custom 404 page (named `404.js`) in pages folder.

---
#### Public folder
- Public folder is a special folder in next.js. Whatever is stored their like images, fonts, etc are served statically.

