---
title: 'Design Stack Overflow'
type: 'topic'
section: 'OO Design Examples'
course: 'Object Oriented Design'
tags:
- Object Oriented Design
---
## Stack Overflow
- Stack Overflow is one of the largest online communities for developers which provides a platform for its users to ask and answer questions, and through membership and active participation, to vote questions and answers up or down.
- Users of Stack Overflow can earn reputation points and badges. For example, a person is awarded ten reputation points for receiving an “up” vote on an answer and five points for the “up” vote of a question. The can also receive badges for their valued contributions. A higher reputation lets users unlock new privileges like the ability to vote, comment on, and even edit other people’s posts.

## System Requirements
1. Any non-member (guest) can search and view questions. However, to add or upvote a question, they have to become a member.
1. Members should be able to post new questions.
1. Members should be able to add an answer to an open question.
1. Members can add comments to any question or answer.
1. A member can upvote a question, answer or comment.
1. Members can flag a question, answer or comment, for serious problems or moderator attention.
1. Any member can add a bounty to their question to draw attention.
1. Members will earn badges for being helpful.
1. Members can vote to close a question; Moderators can close or reopen any question.
1. Members can add tags to their questions. A tag is a word or phrase that describes the topic of the question.
1. Members can vote to delete extremely off-topic or very low-quality questions.
1. Moderators can close a question or undelete an already deleted question.
1. The system should also be able to identify most frequently used tags in the questions.


## Use case diagram
We have five main actors in our system:
- **Admin:** Mainly responsible for blocking or unblocking members.
- **Guest:** All guests can search and view questions.
- **Member:** Members can perform all activities that guests can, in addition to which they can add/remove questions, answers, and comments. Members can delete and un-delete their questions, answers or comments.
- **Moderator:** In addition to all the activities that members can perform, moderators can close/delete/undelete any question.
- **System:** Mainly responsible for sending notifications and assigning badges to members.

Here are the top use cases for Stack Overflow:
1. Search questions.
1. Create a new question with bounty and tags.
1. Add/modify answers to questions.
1. Add comments to questions or answers.
1. Moderators can close, delete, and un-delete any question.

## Class diagram
- **Question:** This class is the central part of our system. It has attributes like Title and Description to define the question. In addition to this, we will track the number of times a question has been viewed or voted on. We should also track the status of a question, as well as closing remarks if the question is closed.
- **Answer:** The most important attributes of any answer will be the text and the view count. In addition to that, we will also track the number of times an answer is voted on or flagged. We should also track if the question owner has accepted an answer.
- **Comment:** Similar to answer, comments will have text, and view, vote, and flag counts. Members can add comments to questions and answers.
- **Tag:** Tags will be identified by their names and will have a field for a description to define them. We will also track daily and weekly frequencies at which tags are associated with questions.
- **Badge:** Similar to tags, badges will have a name and description.
- **Photo:** Questions or answers can have photos.
- **Bounty:** Each member, while asking a question, can place a bounty to draw attention. Bounties will have a total reputation and an expiry date.
- **Account:** We will have four types of accounts in the system, guest, member, admin, and moderator. Guests can search and view questions. Members can ask questions and earn reputation by answering questions and from bounties.
- **Notification:** This class will be responsible for sending notifications to members and assigning badges to members based on their reputations.

## Activity diagrams
**Post a new question:** Any member or moderator can perform this activity. Here are the steps to post a question:

## Sequence Diagram

## Code

---

