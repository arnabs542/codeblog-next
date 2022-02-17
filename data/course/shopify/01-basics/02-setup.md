---
title: App Setup
type: topic
section: Basics
course: Shopify
tags:
- shopify
---
#### Node Modules
- `react` and `react-dom`: 
- `next`: 
- `koa`: Koa is an HTTP middleware framework used for creating applications, servers, or APIs.
- `koa-session`: Session middleware for koa used to create cookie-based sessions. We will only use it to set attributes `{secure:true,sameSite:none}`. It will make our app compatible with most browsers.
- `@shopify/koa-shopify-auth`: Used to create Shopify authentication and for generating access tokens.
- `isomorphic-fetch`: Allows to use a better version of fetch API in our node project. It will cover a wide range of browsers.
- `@shopify/polaris`: UI library
- `@zeit/next-css`: css library
- `@koa/router`: 
- `axios`: 
- `interweave`: to parse text to html

#### Note:
- `createShopifyAuth`: 
- `verifyRequest`: It is used to verify if the merchant is a shopify store or not.
- 


---
#### Proxy Setup
###### Ngrok



###### LocalTunnel (Better alternative)
- `npm i -g localtunnel`
- `lt --port 3000 --subdomain=ashishnitw`
- `your url is: https://ashishnitw.loca.lt`

---