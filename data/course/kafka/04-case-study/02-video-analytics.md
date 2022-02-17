---
title: Video Analytics - MovieFlix
type: topic
section: Case Study
course: Kafka
tags:
- kafka
---
#### Video Analytics - MovieFlix
MovieFlix is a company that allows you to watch TV shows and movies on demand. The business wants the following capabilities:
1. Make sure the user resume the video where they left it off.
2. Build a user profile in real time.
3. Recommend the next show to the user in real time.
4. Store all the data in analytics store.

#### How would you implement this using Kafka?
###### `show_position`
While Playing
- It tells us how far the users have consumed a TV show even within a video.
- Video player running (playing video) in client will send data to "Video position service" (producer) once in while.
- "Video position" service will send data to Kafka topic `show_position`.

While Starting
- "Resuming service" (consumer) will get data from `show_position` topic and save in a database of how far each user of each show has been consumed.

###### `Recommendations`
- There will be a "recommendation Engine" (Kafka Streams) running in real time. 
- It will take `show_positions` data, perform some algorithms and create recommendations in real time.
- "Recommendations service" will consume from `recommendations` topic and send it the client.

###### Analytics
- There will be a analytics consumer that will get data from `show_position` and `Recommendations` topics and send it to Analytics Store (eg, Hadoop) for further processing.

###### Note:
- `show_positions` topic can have multiple producers. It should be highly distributed if high volume ( > 30 partitions). We can choose "user_id" as partitioning key.
- Kafka streams recommendation engine may source data from the analytics store for historical training. `recommendations` topic may be a low volume topic. We can choose "user_id" as partitioning key.

---