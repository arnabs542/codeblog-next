---
title: 'Design ATM'
type: 'topic'
section: 'OO Design Examples'
course: 'Object Oriented Design'
tags:
- Object Oriented Design
---
## ATM
- An automated teller machine (ATM) is an electronic telecommunications instrument that provides the clients of a financial institution with access to financial transactions in a public space without the need for a cashier or bank teller.

## System Requirements
The main components of the ATM that will affect interactions between the ATM and its users are:
1. **Card reader:** to read the users’ ATM cards.
1. **Keypad:** to enter information into the ATM e.g. PIN. cards.
1. **Screen:** to display messages to the users.
1. **Cash dispenser:** for dispensing cash.
1. **Deposit slot:** For users to deposit cash or checks.
1. **Printer:** for printing receipts.
1. **Communication/Network Infrastructure:** it is assumed that the ATM has a communication infrastructure to communicate with the bank upon any transaction or activity.

The user can have two types of accounts: 1) Checking, and 2) Savings, and should be able to perform the following 
five transactions on the ATM:
1. **Balance inquiry:** To see the amount of funds in each account.
1. **Deposit cash:** To deposit cash.
1. **Deposit check:** To deposit checks.
1. **Withdraw cash **To withdraw money from their checking account.
1. **Transfer funds:** To transfer funds to another account.

## How ATM works?
1. Identify the system user through their PIN.
1. In the case of depositing checks, the amount of the check will not be added instantly to the user account; it is subject to manual verification and bank approval.
1. It is assumed that the bank manager will have access to the ATM’s system information stored in the bank database.
1. It is assumed that user deposits will not be added to their account immediately because it will be subject to verification by the bank.
1. It is assumed the ATM card is the main player when it comes to security; users will authenticate themselves with their debit card and security pin.

## Use case diagram
Here are the actors of the ATM system and their use cases:

**Operator:** The operator will be responsible for the following operations:
1. Turning the ATM ON/OFF using the designated Key-Switch.
1. Refilling the ATM with cash.
1. Refilling the ATM’s printer with receipts.
1. Refilling the ATM’s printer with INK.
1. Take out deposited cash and checks.

**Customer:** The ATM customer can perform the following operations:
1. Balance inquiry: the user can view his/her account balance.
1. Cash withdrawal: the user can withdraw a certain amount of cash.
1. Deposit funds: the user can deposit cash or checks.
1. Transfer funds: the user can transfer funds to other accounts.

**Bank Manager:** The Bank Manager can perform the following operations:
1. Generate a report to check total deposits.
1. Generate a report to check total withdrawals.
1. Print total deposits/withdrawal reports.
1. Checks the remaining cash in the ATM.

## Class diagram
Here are the main classes of the ATM System:

**ATM:** The main part of the system for which this software has been designed. It has attributes like ‘atmID’ to distinguish it from other available ATMs, and ‘location’ which defines the physical address of the ATM.

**CardReader:** To encapsulate the ATM’s card reader used for user authentication.

**CashDispenser:** To encapsulate the ATM component which will dispense cash.

**Keypad:** The user will use the ATM’s keypad to enter their PIN or amounts.

**Screen:** Users will be shown all messages on the screen and they will select different transactions by touching the screen.

**Printer:** To print receipts.

**DepositSlot:** User can deposit checks or cash through the deposit slot.

**Bank:** To encapsulate the bank which ownns the ATM. The bank will hold all the account information and the ATM will communicate with the bank to perform customer transactions.

**Account:** We’ll have two types of accounts in the system: 1)Checking and 2)Saving.

**Customer:** This class will encapsulate the ATM’s customer. It will have the customer’s basic information like name, email, etc.

**Card:** Encapsulating the ATM card that the customer will use to authenticate themselves. Each customer can have one card.

**Transaction:** Encapsulating all transactions that the customer can perform on the ATM, like BalanceInquiry, Deposit, Withdraw, etc.

## Activity diagrams
1. **Customer authentication**
2. **Withdraw**
3. **Deposit check**
4. **Transfer**

## Code

---

