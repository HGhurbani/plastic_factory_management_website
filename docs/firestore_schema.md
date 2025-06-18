# Firestore Database Structure

This project relies on Firestore to store all factory management data. Below is the proposed collection layout.

## users
`users/{uid}`
- `email`: string
- `name`: string
- `nameEn`: string
- `role`: string *(e.g. `factoryManager`, `machineOperator`)*
- `avatar`: string (photo URL)
- `createdAt`: timestamp

## productionOrders
`productionOrders/{orderId}`
- `productName`: string
- `quantity`: number
- `produced`: number
- `status`: string *(pending, moldInstalled, inProgress, qualityCheck, completed)*
- `startDate`: timestamp
- `dueDate`: timestamp
- `moldId`: string
- `machineId`: string
- `operatorId`: string *(reference to users)*
- `priority`: string
- `qualityStatus`: string *(pending, approved, rejected)*
- `createdAt`: timestamp
- `updatedAt`: timestamp
- **Sub‑collection** `logs/{logId}` – chronological log of actions

## molds
`molds/{moldId}`
- `name`: string
- `status`: string *(available, installed, maintenance)*
- `location`: string
- `createdAt`: timestamp

## faults
`faults/{faultId}`
- `machineId`: string
- `description`: string
- `reportedBy`: string *(user id)*
- `status`: string *(open, inProgress, closed)*
- `createdAt`: timestamp
- **Sub‑collection** `logs/{logId}` – maintenance updates

## salesOrders
`salesOrders/{orderId}`
- `customer`: string
- `items`: array
- `status`: string *(pending, approved, fulfilled)*
- `createdAt`: timestamp
- `invoiceId`: string
- **Sub‑collection** `logs/{logId}` – sales workflow actions

## invoices
`invoices/{invoiceId}`
- `orderId`: string
- `amount`: number
- `status`: string *(unpaid, paid)*
- `issuedDate`: timestamp
- `createdAt`: timestamp

## inventory
`inventory/{itemId}`
- `name`: string
- `quantity`: number
- `location`: string
- `updatedAt`: timestamp

## qualityChecks
`qualityChecks/{checkId}`
- `orderId`: string
- `inspectorId`: string
- `status`: string *(pending, approved, rejected)*
- `notes`: string
- `createdAt`: timestamp

Each collection contains a `logs` sub‑collection to keep a history of actions with timestamps and the user who performed them.
