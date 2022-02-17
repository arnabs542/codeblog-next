---
title: CQRS - MySocialMedia
type: topic
section: Case Study
course: Kafka
tags:
- kafka
---
#### CQRS (Command Query Responsibility Segregation) - MySocialMedia
MySocialMedia is a company that allows you people to post images and others to react by using "likes" and "comments". The business wants the following capabilities:
1. User should be able to post, like and comment.
2. User should see the total number of likes and comments per post in real time.
3. High volume of data is expected on the first day of launch.
4. Users should be able to see "trending" posts.

#### How would you implement this using Kafka?
###### `posts`
- User client will send posts data to "Posting service" (producer) which will send data to `posts` topic.

###### `likes` and `comments`
- User client will send likes/comments data to "Like/Comment service" (producer) which will send data to `likes` and `comments` topics accordingly.

###### `posts_with_counts`
- We will read data from `posts`, `likes` and `comments` topics. Then we will perform some aggregations and put this in `posts_with_counts` topic using Kafka streams. This will be consumed by "Refresh feed service" (consumer) and then sent to the client.

###### `trending_posts`
- We will read data from `posts`, `likes` and `comments` topics. Then we will perform some logic and put this in `trending_posts` topic using Kafka streams. This will be consumed by "Trending feed service" (consumer) and then sent to the client.

###### Note:
- Responsibilities are "segregated", hence we can call the model CQRS (Command Query Responsibility Segregation).
- `posts` topic can have multiple producers. It should be highly distributed if high volume ( > 30 partitions). We can choose "user_id" as partitioning key. We probably want a high retention period of data for this topic.
- `likes` and `comments` topics have multiple producers. They should be highly distributed as the volume of data is expected to be much greater. We can choose "post_id" as partitioning key.
- The data itself in Kafka should be formatted as "events".
    - user_123 created a post_id 456 at 2pm
    - user_234 liked a post_id 456 at 3pm
    - user_123 deleted a post_id 456 at 4pm

---