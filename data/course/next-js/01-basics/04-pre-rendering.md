---
title: Page Pre rendering
type: topic
section: Basics
course: NextJs
tags:
- nextjs
---
## Page Pre-rendering
- By default, Next.js pre-renders all pages (server-side rendering). This is good for SEO.


## Two types of pre-rendering

#### 1. Static Page Generation
- Page component is pre-generated (with data prepared on server-side) when we build our application.
- Pages are prepared ahead of time and can be cached by the server / CDN serving the app.
- SSG: 
- ISR: Incremental Static Generation
    - When data changes frequently, we can use ISR to re-generate page on every request, at most X seconds.
    - We use `revalidate` key which takes time in seconds that next.js waits to regenerate the page.

##### `getStaticProps()`
- If we need to add data we can use `getStaticProps()` function. We can use it only in page Components.
- It can be `async` also. Any code written inside it will never get rendered on client side, so we can write server side codes (or db credentials) and its secure.
- It returns an object with field `props` which is passed to the page component.
- We can also have a field `revalidate` which is number of seconds after which it regenrates the page.
- `notFound` key is used to navigate to 404 page.
- `redirect` key is used to redirect to some other path.
- By default it receieves parameter `context` (optional) which contains a `params` key.
- `fallback` key set as true will keep the previously generated page paths even if they are not returned in `getStaticProps()`. It can have values: true, false, 'blocking'.

```js
export async function getStaticProps(ctx) {
    // fetch data from api, database or file system.
    return {
        props: {

        },
        revalidate: 2
    }
}
```

##### `getStaticPaths`
- It returns an object where we describe all the dynamic segment values.
- 

```js
export async function getStaticPaths() {
    return {
        paths: {
            
        }
    }
}
```

#### 2. Server-side page rendering
##### `getServerSideProps()`
- It loads data for every request and generates page. It works in runtime.
- It also return an object with `props` field.
- By default it receieves parameter `context` (optional) which contains `req` and `res` objects.


```js
export function getServerSideProps(context) {
    // fetch data from api, database or file system.
    return {
        props: {

        }
    }
}
```

