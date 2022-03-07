# Code Review 03-07-2022

## Authentication and Security

- Good to see validations, just perhaps customize the messages going back to the frontend to be more user friendly.
- requireToken middleware should be separated from the routes files so it can be used in multiple routes.
- In particular I can call and get the list of users from the API without being logged in.
- State in the redux store isn't cleared out when a user logs out.

## Add to Cart

- createToCart function is confusingly named. Consider using hooks for the SingleProduct component to make the naming easier. (In fact you almost have this but it's commented out, there's only a small syntax error in it)
- Adding a product that already exists in the cart should just update the quantity, right now it errors out with a constraint violation.
- Add to cart button available when a user isn't logged in, but it doesn't seem to do anything.

## Cart

- Should display all the items in the cart, probably using a more condensed view, with a total near the proceed to checkout button. (add them up in the component or in the API call)
- Still need to implement localStorage of the cart when not logged in.

## Orders

- Should only be in the nav bar when the user is logged in
- Should display the list of orders, and the total, plus the details of the items in the order (could be a separate page, up to you)
- Probably needs to include the right information in the API call.

## Code Quality

- Don't leave commented out lines of code in files that get merged to main.

## Styling

- Needs some basic styling, choose a custom font for the main text of the site, but keep it a nice readable sans-serif font.  You can choose a different font for the site title, and perhaps a logo or image for the site branding.
- flex-wrap can be useful for the product cards. The images are also probably too large for the product listings.

## Project Management

- In general for commits and PRs be more descriptive. What exactly changed? Why did it change? Avoid simple verbs like "added" or "updated" or "adjusted" without having qualifiers about the details of what was added or what was updated.
  - Example: `update: User model`. What was updated about the user model? In what way was it changed and why did it change?
