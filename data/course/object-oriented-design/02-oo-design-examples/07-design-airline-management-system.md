---
title: 'Design Airline Management System'
type: 'topic'
section: 'OO Design Examples'
course: 'Object Oriented Design'
tags:
- Object Oriented Design
---
## Airline Management System
- An Airline Management System is a managerial software which targets to control all operations of an airline. Airlines provide transport services for their passengers. They carry or hire aircraft for this purpose. All operations of an airline company are controlled by their airline management system.

## System Requirements
1. Customers should be able to search for flights for a given date and source/destination airport.
1. Customers should be able to reserve a ticket for any scheduled flight. Customers can also build a multi-flight itinerary.
1. Users of the system can check flight schedules, their departure time, available seats, arrival time, and other flight details.
1. Customers can make reservations for multiple passengers under one itinerary.
1. Only the admin of the system can add new aircrafts, flights, and flight schedules. Admin can cancel any pre-scheduled flight (all stakeholders will be notified).
1. Customers can cancel their reservation and itinerary.
1. The system should be able to handle the assignment of pilots and crew members to flights.
1. The system should be able to handle payments for reservations.
1. The system should be able to send notifications to customers whenever a reservation is made/modified or there is an update for their flights.

## Use case diagram
We have five main Actors in our system:
- **Admin:** Responsible for adding new flights and their schedules, canceling any flight, maintaining staff-related work, etc.
- **Front desk officer:** Will be able to reserve/cancel tickets.
- **Customer:** Can view flight schedule, reserve and cancel tickets.
- **Pilot/Crew:** Can view their assigned flights and their schedules.
- **System:** Mainly responsible for sending notifications regarding itinerary changes, flight status updates, etc.

Here are the top use cases of the Airline Management System:
- **Search Flights:** To search the flight schedule to find flights for a suitable date and time.
- **Create/Modify/View reservation:** To reserve a ticket, cancel it, or view details about the flight or ticket.
- **Assign seats to passengers:** To assign seats to passengers for a flight instance with their reservation.
- **Make payment for a reservation:** To pay for the reservation.
- **Update flight schedule:** To make changes in the flight schedule, and to add or remove any flight.
- **Assign pilots and crew:** To assign pilots and crews to flights.

## Class diagram
Here are the main classes of our Airline Management System:
- **Airline:** The main part of the organization for which this software has been designed. It has attributes like ‘name’ and an airline code to distinguish the airline from other airlines.
- **Airport:** Each airline operates out of different airports. Each airport has a name, address, and a unique code.
- **Aircraft:** Airlines own or hire aircraft to carry out their flights. Each aircraft has attributes like name, model, manufacturing year, etc.
- **Flight:** The main entity of the system. Each flight will have a flight number, departure and arrival airport, assigned aircraft, etc.
- **FlightInstance:** Each flight can have multiple occurrences; each occurrence will be considered a flight instance in our system. For example, if a British Airways flight from London to Tokyo (flight number: BA212) occurs twice a week, each of these occurrences will be considered a separate flight instance in our system.
**WeeklySchedule **and CustomSchedule: Flights can have multiple schedules and each schedule will create a flight instance.
- **FlightReservation:** A reservation is made against a flight instance and has attributes like a unique reservation number, list of passengers and their assigned seats, reservation status, etc.
- **Itinerary:** An itinerary can have multiple flights.
- **FlightSeat:** This class will represent all seats of an aircraft assigned to a specific flight instance. All reservations of this flight instance will assign seats to passengers through this class.
- **Payment:** Will be responsible for collecting payments from customers.
- **Notification:** This class will be responsible for sending notifications for flight reservations, flight status update, etc.

## Activity diagrams
- **Reserve a ticket**
- **Cancel a reservation**

## Code

---

