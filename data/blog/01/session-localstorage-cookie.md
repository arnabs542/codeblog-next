---
title: Session Local Storage Cookie
type: blog
date: 2020-06-17
authors: ['Ashish']
image: ../cover.jpg
tags:
- node
---

||Cookies|Local Storage|Session|
|-|-|-|-|
|**Capacity** |4kb|10mb|5mb|
|**Browsers**|HTML4/HTML5|HTML5|HTML5|
|**Accessible from**|Any window|Any window|Same tab|
|**Expires**|Manually set|Never|On tab close|
|**Storage location**|Browser and server|Browser only|Browser only|
|**Sent with requests**|Yes|No|Yes|
|**Example**||`localStorage.setItem('Local storage Timestamp', new Date());`|`sessionStorage.setItem('Session storage Timestamp', new Date());`|
|||Local storage stays even if we close the tab|Session storage gets lost as soon we close the tab|

#### Note
- All 3 of them are stored on the user's actual browser. They won't be available on another browser on the same computer. 
- Users do not share cookies and local storage between them. It is present only on local computer and not aywhere else.






