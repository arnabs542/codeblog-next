---
title: IOT Example - GetTaxi
type: topic
section: Case Study
course: Kafka
tags:
- kafka
---
#### IOT Example - GetTaxi
GetTaxi is a company that allows people to match with taxi drivers on demand, right-away. The business wants following capabilities:
1. The user should match with a close by driver.
2. The pricing should surge if the number of drivers is low or number of users is high.
3. All the position data before and during the ride should be stored in an analytics store so that the cost can be computed accurately.

#### How would you implement this using Kafka?
###### `user_position`
- It gets all users positions when they open their app. "User position service" will get data from user client and send it "User position service" (producer) which sends data to `user_position`.

###### `taxi_position`
- "Taxi position service" will get taxi positions from taxi app and send it to `taxi_position` topic.

###### `surge_pricing`
- We will have "surge pricing computation model" using Kafka streams or Apache spark. It will get data from `user_position` and `taxi_position` topics and perform some computation. It will send data to `surge_pricing` topic and then to "Taxi cost service" (consumer).

###### Analytics
- There will be a analytics consumer that will get data from `user_position`, `taxi_position` and `surge_pricing` topics and send it to Analytics consumer (Kafka connect) and then to Analytics Store (eg, S3) for further processing.

###### Note:
- `taxi_position` and `user_position` topics can have multiple producers. They should be highly distributed if high volume ( > 30 partitions). We can choose partitioning key as "user_id" for `user_position` and "taxi_id" for `taxi_position`. Data is ephemeral and probably doesn't need to be kept for a long time.
- For `surge_pricing` topic, computation of surge pricing comes from the Kafka streams application
- Surge pricing may be regional and therefore that topic may be high volume.
- Other topic like `weather`, `events` etc can be included in the Kafka streams application.


---