---
title: Create a Photo Sharing App
type: blog
date: 2020-06-05
authors: ['Ashish']
image: ../cover.jpg
tags:
- database
- design
- scale
---
**How to create a photo sharing app like Instagram?**

More specifically, the system allows people to follow each other, share/comment/like pictures, and maybe some other features like explore, advertisement and so on so forth.

### High-level solution
To design a picture sharing system, it’s quite straightforward to identify two major objects – **user** object and **picture** object.

Personally, I’d like to use relational database to explain as it’s usually easier to understand. In this case, we will have a user table for sure, which contains information like name, email, registration date and so on. The same goes for picture table.

In addition, we also need to store two relations – user follow relation and user-picture relation. This comes very naturally and it’s worth to note that user follow relation is not bi-directional.

Therefore, having such data model allows users to follow each other. To check a user’s feed, we can fetch all pictures from people he follows.









---