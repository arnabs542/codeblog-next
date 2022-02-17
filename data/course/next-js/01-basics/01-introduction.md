---
title: Introduction to Next.js
type: topic
section: Basics
course: NextJs
tags:
- nextjs
---
## What is Next.js?
- The React framework for production
- A fullstack framework for ReactJs. ReactJs is a javascript library for building user interfaces.

## Key Feature
1. Automatic page Pre-rendering, both static generation (SSG) and server-side rendering (SSR) are supported on a per-page basis.
    - Preparing the content of a page on the server instead of on the client.
    - Great for SEO and initial load for static pages.
    - Fetch data on the server and render finished pages.
2. An intuitive page-based routing system (with support for dynamic routes). Define pages and routes with file and folders instead of code.
3. **Fullstack compatibilities:** Easily add backend code to our Next/React apps. Storing data, getting data, authentication etc.
4. API routes to build API endpoints with Serverless Functions
5. Built-in CSS and Sass support, and support for any CSS-in-JS library.

**Note:**
- A standard react app page is basically empty with a basic html skeleton. It has an entry point "div" of id "root" typically into which the react app is loaded and rendered. Since react is a client side library, all of rendering is done by react and happens on client side, not on the server. As a result, the actual html code sent from the server to the client is pretty empty. This might cause a problem when the page fetches some data from a server and displayed, then the user might initially see some loading state for fraction of a second.
- React router gives user the illusion of routing to multiple pages. When the url changes, it prevents the browser from sending a request to some backed server and instead renders different components on the page.


---