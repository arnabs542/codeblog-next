---
title: 'Design Restaurant Management system'
type: 'topic'
section: 'OO Design Examples'
course: 'Object Oriented Design'
tags:
- Object Oriented Design
---
## Restaurant Management system
- A Restaurant Management System is a software built to handle all restaurant activities in an easy and safe manner.
- This System will give the Restaurant management power and flexibility to manage the entire system from a single portal.
- The system allows the manager to keep track of available tables in the system as well as the reservation of tables and bill generation.

## System Requirements
1. The restaurant will have different branches.
1. Each restaurant branch will have a menu.
1. The menu will have different menu sections, containing different menu items.
1. The waiter should be able to create an order for a table and add meals for each seat.
1. Each meal can have multiple meal items. Each meal item corresponds to a menu item.
1. The system should be able to retrieve information about tables currently available to seat walk-in customers.
1. The system should support the reservation of tables.
1. The receptionist should be able to search for available tables by date/time and reserve a table.
1. The system should allow customers to cancel their reservation.
1. The system should be able to send notifications whenever the reservation time is approaching.
1. The customers should be able to pay their bills through credit card, check or cash.
1. Each restaurant branch can have multiple seating arrangements of tables.

## Use case diagram
Here are the main Actors in our system:
- **Receptionist:** Mainly responsible for adding and modifying tables and their layout, and creating and canceling table reservations.
- **Waiter:** To take/modify orders.
- **Manager:** Mainly responsible for adding new workers and modifying the menu.
- **Chef:** To view and work on an order.
- **Cashier:** To generate checks and process payments.
- **System:** Mainly responsible for sending notifications about table reservations, cancellations, etc.

Here are the top use cases of the Restaurant Management System:
- **Add/Modify tables:** To add, remove, or modify a table in the system.
- **Search tables:** To search for available tables for reservation.
- **Place order:** Add a new order in the system for a table.
- **Update order:** Modify an already placed order, which can include adding/modifying meals or meal items.
- **Create a reservation:** To create a table reservation for a certain date/time for an available table.
- **Cancel reservation:** To cancel an existing reservation.
- **Check-in:** To let the guest check in for their reservation.
- **Make payment:** Pay the check for the food.

## Class diagram
Here is the description of the different classes of our Restaurant Management System:
- **Restaurant:** This class represents a restaurant. Each restaurant has registered employees. The employees are part of the restaurant because if the restaurant becomes inactive, all its employees will automatically be deactivated.
- **Branch:** Any restaurants can have multiple branches. Each branch will have its own set of employees and menus.
- **Menu:** All branches will have their own menu.
- **MenuSection and MenuItem:** A menu has zero or more menu sections. Each menu section consists of zero or more menu items.
- **Table and TableSeat:** The basic building block of the system. Every table will have a unique identifier, maximum sitting capacity, etc. Each table will have multiple seats.
- **Order:** This class encapsulates the order placed by a customer.
- **Meal:** Each order will consist of separate meals for each table seat.
- **Meal Item:** Each Meal will consist of one or more meal items corresponding to a menu item.
- **Account:** We’ll have different types of accounts in the system, one will be a receptionist to search and reserve tables and the other, the waiter will place orders in the system.
- **Notification:** Will take care of sending notifications to customers.
- **Bill:** Contains different bill-items for every meal item.

## Activity diagrams
- Place order
- Make a reservation
- Cancel a reservation

## Code

---

