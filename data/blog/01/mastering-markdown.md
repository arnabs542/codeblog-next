---
title: 'Mastering Markdown'
date: 2020-01-09
authors: ['Ashish']
image: ../cover.jpg
tags:
- node
---
###What is Markdown?
Markdown is a way to style text on the web. You control the display of the document; formatting words as bold or italic, adding images, and creating lists are just a few of the things we can do with Markdown. 
Mostly, Markdown is just regular text with a few non-alphabetic characters thrown in, like # or *.
Files with the .md or .markdown extension

```
It's very easy to make some words **bold** and other words *italic* with Markdown. 
You can even [link to Google!](http://google.com)
```
It's very easy to make some words **bold** and other words *italic* with Markdown. 
You can even [link to Google!](http://google.com)

Headers:
```
# This is an <h1> tag
## This is an <h2> tag
### This is an <h3> tag
#### This is an <h4> tag
##### This is an <h5> tag
###### This is an <h6> tag
```
# This is an h1 tag
## This is an h2 tag
### This is an h3 tag
#### This is an h4 tag
##### This is an h5 tag
###### This is an h6 tag

Emphasis:
```
*This text will be italic*
_This will also be italic_
**This text will be bold**
__This will also be bold__
_You **can** combine them_
```
*This text will be italic*
_This will also be italic_
**This text will be bold**
__This will also be bold__
_You **can** combine them_

Unordered List:
```
* Item 1
* Item 2
  * Item 2a
  * Item 2b
```
* Item 1
* Item 2
  * Item 2a
  * Item 2b

Ordered List
```
1. Item 1
1. Item 2
1. Item 3
   1. Item 3a
   1. Item 3b
```
1. Item 1
1. Item 2
1. Item 3
   1. Item 3a
   1. Item 3b

```
![GitHub Logo](./cover.jpg)
Format: ![Alt Text](url)
```
![GitHub Logo](./cover.jpg)
Format: ![Alt Text](url)

```
http://github.com - automatic!
[GitHub](http://github.com)
```
http://github.com - automatic!
[GitHub](http://github.com)

Blockquotes
```
As Kanye West said:

> We're living the future so
> the present is our past.
```
As Kanye West said:

> We're living the future so
> the present is our past.

inline code
```
I think you should use an
`<addr>` element here instead.
```
I think you should use an
`<addr>` element here instead.

GITHUB Flavoured markdowns

```javascript
function fancyAlert(arg) {
  if(arg) {
    $.facebox({div:'#foo'})
  }
}
```

Task Lists
- [x] @mentions, #refs, [links](), **formatting**, and <del>tags</del> supported
- [x] list syntax required (any unordered or ordered list supported)
- [x] this is a complete item
- [ ] this is an incomplete item

Tables

First Header | Second Header
------------ | -------------
Content from cell 1 | Content from cell 2
Content in the first column | Content in the second column

#1
mojombo#1
mojombo/github-flavored-markdown#1


```
int main(void) {
    return 0;
}
```


