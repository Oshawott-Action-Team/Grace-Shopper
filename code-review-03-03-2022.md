# Code Review for 03-03-2022

## Entities

### Product

- imageURL may need to be TEXT
- price should probably be DECIMAL(10, 2)
- category should probably be a Categories table (Not Tier 1 feature)
- productInventory: Assuming this is how many you have in stock, this is also not Tier 1.

### Orders

- You will need an orders table to keep track of user's cart and orders.
- A Cart is just an order that has not been completed yet.
- An Order might contain the following fields at a minimum:
  productId, userId, state
- An Order needs a state field because it will be multiple states during it's lifetime. At a mimimum you want a `new` state and a `completed` state. But in the future you might have a `shipped` state.  Using an ENUM field for this is probably the right thing.

## OrderItem

- An order is made up of various LineItem or OrderItem entities. 
- An OrderItem would probably contain at a minimum the following fields:
  orderId, productId, salePrice, quantity
- We need separate salePrice to record the price at checkout time.
- When a logged in user adds something to their cart, you can create a new order if one doesn't exist, and then add/update an OrderItem for that product they are buying.

### User

- You may want to expand the user table with some more fields, such as address information for shipping purposes or full name, etc.
- You may want to have an email address field.
- Example fields: email, Address1, Address2, City, State, Postcode, Fullname (or Firstname and lastname, up to you)

## Associations

- A Product can have many OrderItems
- An Order belongs to a user, a user can have many Orders.
- A Product can have many OrderItems
- An OrderItem belongs to a Product

You should definitely build a schema diagram.

### API Routes

- The routes look good so far.
- You may want to look into throw correct HTTP errors from express instead of
  just passing the database errors to next() (the http-errors npm package may help here)

## Middleware

- You will need to implement some middleware to check the JWT and verify it in order to "protect" routes so that only a logged in user can call some of the routes.

## Components

### AllProducts

- I'd like to see you attempt React Hooks for this component. You should be able to use `useSelector` and `useDispatch` to handle everything here.
- In fact once you use hooks for this one, you may want to use hooks for more components
- You might think about implementing a custom hook for products, so for example a `useProducts` hook.
- you should break out the markup inside the `.map` to it's own `<Product>` component

### Cart

- You will eventually need some cart components, and building a custom hook for products will make it easier to build a custom hook for your cart (a `useCart` hook is a great idea, as you may need to use the cart data in multiple components)

### AllProducts.js reducer

- This file name can easily be confused for the component when you have it open in the editor, I'd recommend renaming it, to `productReducer.js` or simply `products.js`
- In general try to be consistent on naming, use Capitalized filenames for Components, and other javascript files should begin with lowercase letters

## Documentation

- I'd like to see a schema diagram, this will help you all stay on one page on the structure of your entities.
- I'd also suggest you try and create API documentation for the api endpoints, at a minimum listing out all the routes you'll need in a doc and what they are for is great for keeping everyone thinking the same way on a team.
- Wire-frames are also a very useful thing to do. Having a plan for how you want your UI to look gives everyone a visual goal to strive towards.
- One other helpful thing is to build a sample JSON file showing what the state of a full redux store will look like in your app.
