---
title: Finance Application - MyBank
type: topic
section: Case Study
course: Kafka
tags:
- kafka
---
#### Finance Application - MyBank
MyBank is a company that allows real-time banking for its users. It wants to deploy a brand new capability to alert users in case of large transactions.
1. The transaction data already exists in a database.
2. Thresholds can be defined by the users.
3. Alerts must be sent in real time to the users.

#### How would you implement this using Kafka?
###### `bank_transactions`
- We will use Kafka connect (CDC connector) to get data from database into kafka.

###### `user_settings`
- Users set their threshold in apps. App Threshold service (producer) will get this data from app and send it to `user_settings` topic.

###### `user_alerts`
- Kafka streams application will take all data from `bank_transactions` and `user_settings` topics, check for transactions greater than threshold value and create a message in `user_alerts` topic. Notification service (consumer) will consume this data and trigger a notification to the user.

###### Notes:
- Bank transactions topic: Kafka connect source is a great way to expose data from existing database. There are tons of CDC (change data capture) connectors for technologies such as PostgreSQL, Oracle, MySQL, SQLServer, MongoDB, etc.
- Kafka Streams application: When a user changes their settings, alerts won't be triggered for past transactions.
- User Thresholds topics: It is better to send events to the topic (User 123 enabled threshold at $1000 at 12pm on July 12th 2018). Than sending the state of the user (User 123 threshold $1000).


---