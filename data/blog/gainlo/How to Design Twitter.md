---
title: How to Design Twitter
date: 2020-05-29
authors: ['Ashish']
image: ../cover.jpg
tags:
- database
- design
- scale
---
#### Common misunderstandings
When asked to design Twitter, many people tend to dive into technical details immediately. One common behavior is to list a bunch of tools or frameworks like MongoDB, Bootstrap, MapReduce etc. and try to explain which particular technology we should use.

What interviewers really want is high-level ideas about how you will solve the problem. It doesn’t matter what tools you will use, but how you define the problem, how you design the solution and how you analysis the issue step by step are truly important.

#### Define the problem
In this problem, what I would do first is to compress Twitter to its MVP (minimum viable product). In other words, we will only design core features of Twitter instead of everything.
So the whole product should allow people follow each other and view others feeds. It’s as simple as it is. (If any feature is needed, the interviewer should be able to clarify). Anything else like registration, moment, security etc. is out of the scope of discussion.

#### High-level solution
The common strategy I would use here is to divide the whole system into several core components. There are quite a lot divide strategies, for example, you can divide by frontend/backend, offline/online logic etc..

In this question, I would design solutions for the following two things: 1. Data modeling. 2. How to serve feeds.
1. **Data modeling** – If we want to use a relational database like MySQL, we can define user object and feed object. Two relations are also necessary. One is user can follow each other, the other is each feed has a user owner.
2. **Serve feeds** – The most straightforward way is to fetch feeds from all the people you follow and render them by time.

#### Detail questions
1. **When users followed a lot of people, fetching and rendering all their feeds can be costly. How to improve this?**
    - There are many approaches. Since Twitter has the infinite scroll feature especially on mobile, each time we only need to fetch the most recent N feeds instead of all of them. Then there will many details about how the pagination should be implemented.
    - You may also consider **cache**, which might also be helpful to speed things up.
2. **How to detect fake users?**
    - This can be related to machine learning. One way to do it is to identify several related features like registration date, the number of followers, the number of feeds etc. and build a machine learning system to detect if a user is fake.
3. **Can we order feed by other algorithms?**
    - There are a lot of debate about this topic over the past few weeks. If we want to order based on users interests, how to design the algorithm?
    - I would say few things we should clarify to the interviewer.
      - How to measure the algorithm? Maybe by the average time users spend on Twitter or users interaction like favorite/retweet.
      - What signals to use to evaluate how likely the user will like the feed? Users relation with the author, the number of replies/retweets of this feed, the number of followers of the author etc. might be important.
      - If machine learning is used, how to design the whole system?
4. **How to implement the @ feature and retweet feature?**
    - For @ feature, we can simply store a list of user IDs inside each feed. So when rendering your feeds, you should also include feeds that have your ID in its @ list. This adds a little bit complexity to the rendering logic.
    - For retweet feature, we could do the similar thing. Inside each feed, a feed ID (pointer) is stored, which indicates the original post if there’s any.
    - But be careful that when a user retweets a tweet that has been retweeted, you should be able to figure out the correct logic. This is a product decision whether you want to make it into many layers or only keep the original feed.

#### Trending topics
Twitter shows trending topics at both the search page and your left column of the home page (maybe somewhere else as well). Clicking each topic will direct you to all related tweets.

In a nutshell, I would divide the problem into two subproblems: 
1. How to get trending topic candidates? 
2. How to rank those candidates?

For topic candidates, there are various ideas. We can get the most frequent hashtags over the last N hours. We can also get the hottest search queries. Or we may even fetch the recent most popular feeds and extract some common words or phrases. But personally, I would go with the first two approaches.

Ranking can be interesting. The most straightforward way is to rank based on frequency. But we can further improve it. For instance, we can integrate signals like reply/retweet/favorite numbers, freshness. We may also add some personalized signals like whether there are many follows/followers talking about the topic.

#### Who to follow
Twitter also shows you suggestions about who to follow. Actually, this is a core feature that plays an important role in user onboarding and engagement.

If you play around the feature, you will notice that there are mainly two kinds of people that Twitter will show you – people you may know (friends) and famous account (celebrities/brands…).

It won’t be hard to get all these candidates as you can just search through user’s “following graph”and people within 2 or 3 steps aways are great candidates. Also, accounts with most followers can also be included.

The question would be how to rank them given that each time we can only show a few suggestions. I would lean toward using a machine learning system to do that.

There are tons of features we can use, e.g. whether the other person has followed this user, the number of common follows/followers, any overlap in basic information (like location) and so on so forth.

This is a complicated problem and there are various follow-up questions:
- How to scale the system when there are millions/billions of users?
- How to evaluate the system?
- How to design the same feature for Facebook (bi-directional relationship)

#### Moments
Twitter shows you what’s trending now in hashtags. The feature is more complicated than trending topics and I think it’s necessary to briefly explain here.

Basically, Moments will show you a list of interesting topics for different categories (news, sports, fun etc.). For each topic, you will also get several top tweets discussing it. So it’s a great way to explore what’s going on at the current moment.

I’m pretty sure that there are a lot of ways to design this system. One option is to get hottest articles from news websites for the past 1-2 hours. For each article, find tweets related to it and figure out which category (news, sport, fun etc.) it belongs to. Then we can show this article as a trending topic in Moments.

Another similar approach is to get all the trending topics (same as the first section), figuring out each topic’s category, show them in Moment.

For both approaches, we would have the following three subproblems to solve: 
A. Categorize each tweet/topic to a category (news, sports etc.) 
B. Generate and rank trending topics at current moment 
C. Generate and rank tweets for each topic.

For A, we can pre-define several topics and do supervised learning. Or we may also consider clustering. In fact, text in tweets, user’s profile, follower’s comments contain a lot of information to make the algorithm accurate.
For B and C, since it’s similar to the first section of this post, I won’t talk about it now.

#### Search
Twitter’s search feature is another popular function that people use every day. If you totally have no idea about how search engine works, you may take a look at this tutorial.

If we limit our discussion only to the general feed search function (excluding users search and advanced search), the high-level approach can be pretty similar to Google search except that you don’t need to crawl the web. Basically, you need to build indexing, ranking and retrieval.

Things become quite interesting if you dig into how to design the ranking algorithm. Unlike Google, Twitter search may care more about freshness and social signals.

The most straightforward approach is to give each feature/signal a weight and then compute a ranking score for each tweet. Then we can just rank them by the score. Features can include reply/retweet/favorite numbers, relevance, freshness, users popularity etc..

But how do we evaluate the ranking and search? I think it’s better to define few core metrics like total number of searches per day, tweet click even followed by a search etc. and observe these metrics every day. They are also stats we should care whatever changes are made.

---
## How to Design a Trending Algorithm for Twitter
As to design a trending algorithm for Twitter, the system should be able to provide a list of topics that are popular at the current moment. I like to make the problem general and a little bit vague since I want to see how a candidate can approach this kind of open-ended question. For instance, there’s no clear definition of what popular means here.

#### General Ideas
A general idea is that let’s use a term (or a word) to represent a topic and it can be a hashtag (like #gainlo) or just a phrase (like Donald Trump). If a term has a huge volume in recent tweets compared to the past, the term should be identified as popular. For example, if millions of people are talking about #gainlo today but in the past only hundreds of people talked about it, #gainlo should definitely be a hot topic at the current moment.

The reason we should compare to past volume is that for some common terms like “Monday” or “weather”, they have a huge volume at any time and shouldn’t be selected as trending in most cases.

To sum up, the basic idea is that for each term, if the ratio of term volume within last several hours and term volume of last X days is high, it will be regarded as a trending topic.

#### Infrastructure
Of course the trending topics should be displayed instantly, which means we can ask users to wait for an hour so that the system can calculate and rank all the terms. So what the underline infrastructure looks like?

Obviously, the calculation can be costly given the huge amount of tweets everyday. In this case, we can consider using **offline pipelines**.

More specifically, we can **keep several pipelines running in the offline that calculates the ratio of each term and output the results to some storage system**. The pipelines may refresh every several hours assuming there’s no big difference between a short period of time. So when a user checks the trending topics from the front end, we can just this user with pre-computed results.

#### Absolute term volume
If you simply calculate the ratio as explained above, I’m pretty sure there will be some very weird terms selected. Think about the following scenario, suppose there are only 300 people who tweeted about a weird topic “#gailo-mock-interview” and in the past no one has ever talked about it. The ratio (volume within last few hours / volume within last X days) is 1, which can rank at the top of the list.

Apparently, this is not something we want to show to users. I believe that you’ve already identified the problem here. **If the absolute volume is not big enough, some unpopular terms may get picked**. You can calculate the ratio like volume within **last few hours / (volume within last X days + 10000)** so that small volume gets diluted. Or you can use a separate signal as absolute term volume score to combine with the ratio.

#### Influencers
Another idea is that if some topics are discussed by high profile people, they might be more likely to be interesting and popular.

There are many ways to design this algorithm. One approach is to first identify who are high profile users. We can simply use follower number (although there are lots of fake influencers who bought followers). If a topic was tweeted by any influencer, we can count this topic tweeted by multiple times. So just multiply the tweet counts with a parameter based on the popularity of the influencer.

One may argue that we should not give influencers more weight since if a topic is trending, there must be a huge number of normal users talking about it. That might be true. The point here is that you will never know the result until you give it a try. So I’m definitely not saying that this is the right thing to do, but it may be worth to have an experiment.

#### Personalization
Different people have different taste and interests. We can adjust the trends list according different users. This can be quite complicated since there are so many things you can do to make it personalized.

For instance, you can calculate a relevance score between each topic and the user based on signals including his previous tweets, who he has followed and what tweets he has favorited etc.. Then the relevance score can be used together with the trending ratio.

In addition, location should also be a valuable signal. We may even calculate trending topics for each location (maybe city level).

---