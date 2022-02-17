---
title: Design a Recommendation System
type: blog
date: 2020-06-04
authors: ['Ashish']
image: ../cover.jpg
tags:
- database
- design
- scale
---
### Recommendation system
[Recommendation system](https://en.wikipedia.org/wiki/Recommender_system) has been a hot topic for a long time. It seems that almost every company is building such systems. For instance, Amazon is using recommendation system to provide goods that customers might also like. Hulu is using recommendation system to suggest other popular shows or episodes.

To limit the scope of discussion, we can mainly focus on recommendation system for Youtube. More specifically, the system is responsible for recommending videos that a user might like to watch.

### Heuristic solution
Although machine learning (ML) is commonly used in building recommendation systems, it doesn’t mean it’s the only solution. There are many cases where we want simpler approaches, for example, we may have very few data, or we may want to build a minimal solution fast etc..

In such cases, we can start with some heuristic solutions. In fact, there are lots of hacks we can do to build a simple recommendation system. For instance, based on videos a user has watched, we can simply suggest videos from same authors. We can also suggest videos with similar titles or labels. If we use the popularity (number of comments, shares) as another signal, the recommendation system can work pretty well as a baseline.

### Collaborative filtering
When talking about recommendation system, I can hardly avoid mentioning [**collaborative filtering (CF)**](https://en.wikipedia.org/wiki/Collaborative_filtering), which is the most popular technique used in recommendation systems. Since not everyone has a machine learning background, I won’t go deeper about the algorithm. In fact, the beauty of collaborative filtering is that the basic idea is so simple that everyone can easily understand it.

In a nutshell, to recommend videos for a user, I can provide videos liked by similar users. For instance, if user A and B have watched a bunch of same videos, it’s highly likely that user A will like videos liked by B. Of course, there are many ways to define what “similar” means here. It could be two users have liked same videos, it could also mean that they share the same location.

The above algorithm is called **user-based collaborative filtering**. Another version is called **item-based collaborative filtering**, which means to recommend videos (items) that are similar to videos a user has watched.

### Feature engineer
In fact, mentioning collaborative filtering in a system design interview is not impressive at all since the algorithm is so common. What most interviewers care about is how to build the system specific to the interview question. So for Youtube video recommendation, what features can be used to build the recommendation system?

Usually, there are two types of features – explicit and implicit features. Explicit features can be ratings, favorites etc.. In Youtube, it can be the like/share/subscribe actions. Implicit features are less obvious. If a user has watched a video for only a couple of seconds, probably it’s a negative sign. Given a list of recommended videos, if a user clicks one over another, it can mean that he prefer to the one clicked. Usually, we need to explore a lot about implicit features.

Back to the Youtube problem, there are several features are quite obvious:
- Like/share/subscribe
- Watch time
- Video title/labels/categories
- Freshness

It’s worth to note that when building machine learning systems, you have to experiment a lot with different combination of features so that you won’t know which one is good unless you give it a try.

### Infrastructure
Another reason that recommendation system is a great system design interview question is that it can also be used to discuss infrastructure. Apparently, the system contains multiple steps/components. so how would you design the whole system in terms of infrastructure?

Given that comparing similar users/videos can be time-consuming on Youtube, this part should be done in offline pipelines. Therefore, we can divide the whole system into online and offline.

For the offline part, all the user models and videos need to store in distributed systems. Pipelines that calculate similar users/videos are also running regularly in order to keep data updated. In fact, for most machine learning systems, it’s common to use offline pipeline to process big data as you won’t expect it to finish with few seconds.

For the online part, based on the user profile and his actions (like videos just watched), we should be able to provide a list of recommended videos from offline data. Normally, the system fetches more videos than needed and then do filtering and ranking on the fly. We can filter videos that are obviously irrelevant like videos the user has watched. And then we should also rank the suggestions. Few factors should be considered include video popularity (share/comment/like numbers), freshness, quality and so on.

### Summary
In reality, there are many ways to improve the system that we haven’t covered yet. I’d like to briefly mention few techniques:
- Freshness can be a very important factor. We should figure out how to recommend fresh content.
- Eval is an essential component of recommendation system, which allows us to understand how well the system works.
- To train the collaborative filtering system, we may also include video position signals. Usually, videos ranked on top have much higher chance to be clicked.

It’s hard to predict what will be discussed in a system design interview, that’s why I try to cover as many topics as possible in the post instead of digging deeper into a particular area.










---