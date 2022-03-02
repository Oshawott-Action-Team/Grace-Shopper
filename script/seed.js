"use strict";

const {
  db,
  models: { User, Product },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({ username: "cody", password: "123" }),
    User.create({ username: "murphy", password: "123" }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);

  // Creating Products
  const products = await Promise.all([
    Product.create({
      name: "Blue Buffalo Life Protection Dog Food",
      imgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkbDbfzh3o6ritcPcTsMhCEiXU7c_MZMbAwg&usqp=CAU",
      price: 45,
      description: "Holistic formula for health and well-being of dog and a healthy shinny coat. Contains all natural ingredients",
      productCatergory: "Food",
      productInventory: 100,
    }),
    Product.create({
      name: "Lifetime Leash",
      imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmTDgIGYbRRhrktvZyUPFjnDzw4TIYswnbXw&usqp=CAU",
      price: 24.99,
      description: "Rope style leash for all dog types built to last a life time",
      productCatergory: "Accessory",
      productInventory: 100,
    }),
    Product.create({
      name: "Arm & Hammer Dental Chew Toy: Gorilla",
      imgUrl: "https://images-na.ssl-images-amazon.com/images/I/71uC4K3GgrL._AC_SL1500_.jpg",
      price: 12.00,
      description: "Extremely durable. Designed to clean your canines teeth, freshen their breath, promote gum health, and keep them entertained throughout the day.",
      productCatergory: "Toy",
      productInventory: 100,
    }),
    Product.create({
      name: "Chuckit! Flying Squirrel",
      imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSspfzrcZyh1AEM94DjOk2dhoBkVlN2Y6tfTA&usqp=CAU",
      price: 7.99,
      description: "If your dog loves chasing squirrels and playing fetch, this toy combines the best of both worlds. Perfect for flinging across any park, yard, or lake(it floats!)".,
      productCatergory: "Toy",
      productInventory: 100,
    }),
  ]);

  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
