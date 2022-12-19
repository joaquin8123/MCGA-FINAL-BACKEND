# MCGA-FINAL-BACKEND

## It is developed with nodejs, Express, Mongoose and JWT.
### How to run local server?
- set environment variables in the .env file
- npm i
- npm run start

### Url vercel deploy
- https://mcga-final-backend2-joaquin8123.vercel.app/

### How to call endpoints?
| ENDPOINT NAME  | URL              | HTTP METHOD | BODY                                                                    |
| -------------- | ---------------- | ----------- | ----------------------------------------------------------------------- |
| CreateProduct          | `/product`    | POST        | `{name: "test", price: 500, stock: 23}`                                            |
| GetAllProduct       | `/product/` | GET         | -    
| GetProductById       | `/product/:id` | GET         |                                          |      
| GetAllProductPublic       | `/public/` | GET         | - 
| UpdateProduct       | `/product/:id/` | PUT         | `{name: "test update", price: 1000, stock: 150}`                    
| DeleteProduct       | `/product/:id` | DELETE         | - 
| Register       | `/auth/register` | POST         | `{user: "joaquin", password: "argentinacampeon2022"}` 
| Login       | `auth/login` | POST         | `{user: "joaquin", password: "argentinacampeon2022"}`

