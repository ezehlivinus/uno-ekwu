# uno-ekwu
This is a restaurant app.
#### This is an app that a restaurant's customers can use to place orders for delivery.
It allows them to pick menu items, pay for them, and specify a delivery time and address.

## Setup
It is assumed that you have nodejs, and mongodb installed.
- Fork/Clone
- Install dependencies, on terminal do: `npm install` 
- Setup environment
    - use this command  `cp .env.example .env` or npm run `setup:env`
    - Any of the above commands creates `.env` file based on the `.env.example` file.
    - setup the created .env file
- Start the server in development by running: `npm run dev`

## Usage
Routes documentation has not been prepared yet and work is still on-going for the various features. Check the `design.txt` file for more info about this simple app.

## Routes
Base route: `/api/v1`

#### Users resource
- `/users` create user, method: `POST`
- `/users` list all users, method `GET`
- `/users/:id` get a single user, method `GET`
- `/users/:id` update a user method `PUT/PATCH`
- `/users/:id` delete users method `DELETE`
- `/users/login` login a user method `POST`

#### Menus resource
- `/menus` create menu, method: `POST`
- `/menus` list all menus, method `GET`
- `/menus/:id` get a single menu, method `GET`
- `/menus/:id` update a menu method `PUT/PATCH`
- `/menus/:id` delete menus method `DELETE`

Other resources are being created according to the requirements in `design.txt`

