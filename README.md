# TO START THE APP:
1. npm run build
2. npm run start

---

# E-Commerce Store Simulator (TypeScript + OOP + TypeORM)

A simplified e-commerce backend built with **TypeScript**, **OOP principles**, **TypeORM**, and **PostgreSQL**, featuring **modular architecture**, **services for CRUD operations**, **decorators for restricted actions**, and **async flows** (e.g., simulated payments).  
> Data is seeded programmatically with **mock/random values** instead of database migration seeders.

---

## Goals
- Apply **encapsulation & inheritance** via domain classes and private fields.  
- Demonstrate **TypeORM** with PostgreSQL.  
- Organize logic in **modules** with dedicated **services** for CRUD.  
- Use **design patterns** like Singleton (Store).  
- Implement **async/await** flows.  
- Enforce business rules with **decorators** (e.g., Premium-only actions).  

---

## Tech Stack
- **Language:** TypeScript  
- **Database:** PostgreSQL  
- **ORM:** TypeORM  

---

## Architecture Overview

- **Modules**: product, customer, order, order item, store.  
- **Services**: implement CRUD.  
- **Store**: Singleton orchestrator for cross-module actions.  
- **Decorators**: restrict certain actions to Premium customers.  

---

### Product Module
- **Service:** CRUD for products.  

### Customer Module
- **RegularCustomer:** default, no perks.  
- **PremiumCustomer:** discounts & priority.  

### Order Module
- **Service:** create orders, calculate totals, assign customer.  
- **Utility types:** `OrderSummary` for simplified order info.  
- **Decorator `@RequirePremium`:** enforces access control.  

### Store Module
- Implemented as a **Singleton**.  
- Centralized manager for **products, customers, orders**.  

---

## Design Patterns Used
- **Singleton**: Only one `StoreService` instance exists.  
- **Inheritance**: `BaseService` extends the other services.  
- **Decorator**: `@RequirePremium` checks if a customer can access restricted actions.  

---

## Database & Configuration
- **Database:** PostgreSQL.  
- **ORM:** TypeORM.  

---

## Core Flows

1. **Customer places an order**
   - Fetch product stock.  
   - Deduct quantities.  
   - Create `Order` + `OrderItems`.  
   - Simulate payment.  
   - On success → mark `Order.PAID`.  

2. **Premium-only features**
   - Attempting restricted route triggers `@RequirePremium`.  

3. **Product restock**
   - Stock updated.  

---

## Scripts
- `npm run start` — run the app.  
- `npm run build` — compile TypeScript.  

---