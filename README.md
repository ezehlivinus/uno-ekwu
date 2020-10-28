# uno-ekwu
This is a restaurant app.
#### This is an app that a restaurant's customers can use to place orders for delivery.
It allows them to pick menu items, pay for them, and specify a delivery time and address.

## Setup
- Fork/Clone
- Terminal/CLI command: `npm install` to install dependencies
- Terminal/CLI command: `cp .env.example .env` to create .env file based on the .env.example file. setup the created .env file
- Start the app in dev mode: `npm run dev`

## Usage
Routes documentation has not been prepared yet and work is still on-going for the various features. Check the `design.txt` file for more info about this simple app.

## Routes
Base route: `/api/v1`

#### Users resource
- `/users` create a user, method: `POST`
- `/users` list all users, method `GET`
- `/users/:id` get a single user, method `GET`
- `/users/:id` update a user method `PUT/PATCH`
- `/users/:id` delete users method `DELETE`
- `/users/login` login a user method `POST`

```
/**
 *
 * User request body ...POST/PUT/PATCH
 *
 * {
 *  "name": "string",
 *  "email": "string@example.com",
 *  "password": "string",
 * }
 */
```

#### Menus resource
- `/menus` create a menu, method: `POST`
- `/menus` list all menus, method `GET`
- `/menus/:id` get a single menu, method `GET`
- `/menus/:id` update a menu method `PUT/PATCH`
- `/menus/:id` delete a menu method `DELETE`

```
/**
 *
 * Menu request body ...POST/PUT/PATCH
 *
 * {
 *  "name": "some name",
 *  "quantity": 2,
 *  "description": "text not required",
 *  "price": 3
 * }
 */

```

#### Order resource
- `/orders` create an order, method: `POST`
- `/orders` list all orders, method `GET`
- `/orders/:id` get a single order, method `GET`
- `/orders/:id` update a order method `PUT/PATCH`
- `/orders/:id` delete a order method `DELETE`
- <strike>`/orders/:id/confirm` confirm an order, method: `PUT/PATCH`</strike>
- <strike>`/orders/:id/cancel` cancel an order, method: `PUT/PATCH`</strike>

```
/**
 *
 * Order request body...POST/PUT/PATCH
 *
 * {
 *  "items": "menuId",
 *  "quantity": 2,
 *  "description": "text not required",
 *  "customerId": "userId",
 *  "address": "delivery address"
 * }
 */
```

Other resources are being created according to the requirements in `design.txt`

### Completed

