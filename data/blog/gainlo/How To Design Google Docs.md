---
title: How To Design Google Docs
date: 2020-05-27
authors: ['Ashish']
image: ../cover.jpg
tags:
- database
- design
- scale
---
Google Docs is a huge system with tons of features. If you spend few minutes thinking about his problem, you may realize that Google Docs is much more complex than it seems to be.

#### Divide into components
It’s recommended to provide high-level solutions when the question is big. And one way to abstract your solution is dividing a big system into smaller components.

Apparently, Google Docs is a huge system that has a bunch of features, including doc storage, share docs, formatting, editing and so on.

We can divide the whole system into the following major components:
1. **File storage**. Since Google Docs is part of Google Drive, I include the storage feature as well. The system allows users to group files (docs) into folders and support features like edit/create/remove etc.. It works like an OS.
1. **Online editing and formatting**. There’s no doubt that one of the core features of Google Docs is online editing. It supports almost everything of Microsoft Office and maybe more.
1. **Collaboration**. It’s truly amazing that Google Docs allows multiple people to edit a single doc simultaneously. This is a technical challenge for sure.
1. **Access Control**. You can share docs with your friends and give different permissions (owner, read-only, allow comment etc.).

A bunch of less important features are ignored here, like add-ons, spell-checking, publish to the web and so on.

#### Storage and Formatting
Storage and formatting can be regarded as backend and front-end to some extent. IMHO, the storage system of Google Docs (or Google Drive) is very close to an operating system. It has notions like folders, files, owners etc..

Therefore, to build such system, the basic building block is a **file object**, which contains **content**, **parent**, **owner** and some other meta data like **creation date**. Parent denotes the folder relation and the root directory has empty parent. I won’t discuss how to scale the system as building a distributed system can be extremely complicated. There are tons of things to be considered like consistency, replication.

For the front-end formatting, an interesting question is how you would store documents with corresponding formats. If you know **Markdown**, it’s definitely one of the best solutions. Although Google Docs can be more complicated, the basic idea of Markdown still applies.

#### Concurrency
One of the coolest features of Google Docs is that multiple people can edit a single doc simultaneously. How would you design this feature? f you have tried the collaborative editing feature, you can actually see what the other person is doing and you get instant feedback.

If you have used Git for version control, some of the ideas here can be similar. First, let’s consider the simplest case – only 2 people are editing the same doc. Assuming the doc is “abc”.

Basically, the server can keep 2 copies of the same doc to each person and tracks the full revision history as well. When A edits the doc by adding “x” in the beginning, this change will be sent to the server together with the last revision seen by A. Suppose at this time, B deletes the last character “c” and this change is sent to the server as well.

Since the server knows the change is made on which revision, it will adjust the change accordingly. More specifically, B’s change is deleting the 3rd character “c”, which will be transformed to deleting the 4th character as A adds “x” in the beginning.

This is called **operational transformation**. It’s okay if you never heard of this. The basic idea is to transform each person’s mutation based on its revision and revisions from other collaborators.

#### Access Control
Google Docs allows you to invite collaborators to each doc with different level of permissions.

A naive solution shouldn’t be hard. For each file, you can keep a list of collaborators with corresponding permissions like read-only, owner etc.. When one wants to do specific actions, the system checks his permission.

What are challenges to scale such access control system.

As is known to all, when scaling system to millions of users, there can be a lot of issues. Few things I’d like to mention here are:
1. **Speed:** When the owner updates the permission of a folder (e.g. remove a specific viewer), this update should be propagated to all its children. speed can be a concern.
1. **Consistency:** When there are multiple replications, it’s non-trivial to keep every replica consistent especially when multiple people update the permission at the same time.
1. **Propagation:** There can be a lot of propagation cases. Besides updating the permission of a folder should reflect on all its children, if you give read permission of a doc D to someone, he may have read permission to all the parents of doc D as well. If someone deleted doc D, we may revoke his read permission of D’s parents (maybe not, this is more of a product decision).





---