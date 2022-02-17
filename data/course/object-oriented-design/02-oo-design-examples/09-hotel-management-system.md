---
title: 'Design Hotel Management System'
type: 'topic'
section: 'OO Design Examples'
course: 'Object Oriented Design'
tags:
- Object Oriented Design
---
## Hotel Management System
- A Hotel Management System is a software built to handle all online hotel activities easily and safely. 
- This System will give the hotel management power and flexibility to manage the entire system from a single online portal.
- The system allows the manager to keep track of all the available rooms in the system as well as to book rooms and generate bills.

## System Requirements
1. The system should support the booking of different room types like standard, deluxe, family suite, etc.
1. Guests should be able to search the room inventory and book any available room.
1. The system should be able to retrieve information, such as who booked a particular room, or what rooms were booked by a specific customer.
1. The system should allow customers to cancel their booking - and provide them with a full refund if the cancelation occurs before 24 hours of the check-in date.
1. The system should be able to send notifications whenever the booking is nearing the check-in or check-out date.
1. The system should maintain a room housekeeping log to keep track of all housekeeping tasks.
1. Any customer should be able to add room services and food items.
1. Customers can ask for different amenities.
1. The customers should be able to pay their bills through credit card, check or cash.

## Use case diagram
Here are the main Actors in our system:
- **Guest:** All guests can search the available rooms, as well as make a booking.
- **Receptionist:** Mainly responsible for adding and modifying rooms, creating room bookings, check-in, and check-out customers.
- **System:** Mainly responsible for sending notifications for room booking, cancellation, etc.
- **Manager:** Mainly responsible for adding new workers.
- **Housekeeper:** To add/modify housekeeping record of rooms.
- **Server:** To add/modify room service record of rooms.

Here are the top use cases of the Hotel Management System:
- **Add/Remove/Edit room:** To add, remove, or modify a room in the system.
- **Search room:** To search for rooms by type and availability.
- **Register or cancel an account:** To add a new member or cancel the membership of an existing member.
- **Book room:** To book a room.
- **Check-in:** To let the guest check-in for their booking.
- **Check-out:** To track the end of the booking and the return of the room keys.
- **Add room charge:** To add a room service charge to the customer’s bill.
- **Update housekeeping log:** To add or update the housekeeping entry of a room.

## Class diagram
Here are the main classes of our Hotel Management System:
- **Hotel and HotelLocation:** Our system will support multiple locations of a hotel.
- **Room:** The basic building block of the system. Every room will be uniquely identified by the room number. Each Room will have attributes like Room Style, Booking Price, etc.
- **Account:** We will have different types of accounts in the system: one will be a guest to search and book rooms, another will be a receptionist. Housekeeping will keep track of the housekeeping records of a room, and a Server will handle room service.
- **RoomBooking:** This class will be responsible for managing bookings for a room.
- **Notification:** Will take care of sending notifications to guests.
- **RoomHouseKeeping:** To keep track of all housekeeping records for rooms.
- **RoomCharge:** Encapsulates the details about different types of room services that guests have requested.
- **Invoice:** Contains different invoice-items for every charge against the room.
- **RoomKey:** Each room can be assigned an electronic key card. Keys will have a barcode and will be uniquely identified by a key-ID.

## Activity diagrams
- Make a room booking
- Check in
- Cancel a booking

## Code

---

