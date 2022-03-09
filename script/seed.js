"use strict";

const {
  db,
  models: { User, Product },
} = require("../server/db");
const Order = require("../server/db/models/Order");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({
      username: "cody",
      password: "123",
      firstName: "cody",
      lastName: "cafe",
      email: "abc@gmail.com",
      address1: "dsfdsg",
      address2: "daasdasd",
      city: "raleigh",
      state: "NC",
      postcode: 27560,
    }),
    User.create({
      username: "murphy",
      password: "123",
      firstName: "cody",
      lastName: "cafe",
      email: "ab@gmail.com",
      address1: "dsfdsg",
      address2: "daasdasd",
      city: "raleigh",
      state: "NC",
      postcode: 27560,
    }),
    User.create({
      username: "lucy",
      password: "1234",
      firstName: "lucy",
      lastName: "harris",
      email: "abcd@gmail.com",
      address1: "dsfdsg",
      address2: "daasdasd",
      city: "raleigh",
      state: "NC",
      postcode: 27560,
    }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);

  let orders = await Promise.all([
    Order.create({
      orderStatus: "completed",
    }),
    Order.create({
      orderStatus: "completed",
    }),
    Order.create({
      orderStatus: "completed",
    }),
    Order.create({
      orderStatus: "new",
    }),
    Order.create({
      orderStatus: "new",
    }),
  ]);

  // Creating Products
  const products = await Promise.all([
    Product.create({
      name: "Graceful Mermaid",
      imageUrl:
        "https://partycity6.scene7.com/is/image/PartyCity/_pdp_sq_?$_500x500_$&$product=PartyCity/P815188",
      price: 60.0,
      description:
        "Ariel the mermaid WHO??? Your dog will dazzle in this purple sequin, teal fish scale print",
    }),
    Product.create({
      name: "Dino",
      imageUrl:
        "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1532720004-51JAxI-xRyL.jpg?crop=1xw:1xh;center,top&resize=768%3A%2A",
      price: 24.99,
      description:
        "Let your dog live out their dino fantasies with this stunning headpiece",
    }),
    Product.create({
      name: "Mail Man",
      imageUrl:
        "https://partycity6.scene7.com/is/image/PartyCity/_pdp_sq_?$_500x500_$&$product=PartyCity/P856120",
      price: 39.99,
      description:
        "Neither snow nor rain nor heat nor gloom of night will keep your pup from trick-or-treating when they're dressed in this US Mail Carrier Dog Costume. The blue outfit features foam arms that hold up a USPS box, giving the illusion that your dog is walking on two legs. This easy, slip-on outfit stays closed with a hook-and-loop closure. People will be more excited for this little mail carrier than they are for the package they bring! ",
    }),
    Product.create({
      name: "Butterfly",
      imageUrl:
        "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1532720256-51Jngn8Yx4L.jpg?crop=1xw:1xh;center,top&resize=768%3A%2A",
      price: 27.99,
      description:
        "Your pup will feel like a beautiful, post-metamorphasis butterfly from the inside out while wearing this piece.",
    }),
    Product.create({
      name: "UPS Worker",
      imageUrl:
        "https://m.media-amazon.com/images/I/81Q+re4XnqL._AC_SL1500_.jpg",
      price: 45.0,
      description:
        "Neither snow nor rain nor heat nor gloom of night will keep your pup from trick-or-treating when they're dressed in this UPS Carrier Dog Costume. The brown outfit features foam arms that hold up a UPS box, giving the illusion that your dog is walking on two legs. This easy, slip-on outfit stays closed with a hook-and-loop closure. People will be more excited for this little mail carrier than they are for the package they bring! ",
    }),
    Product.create({
      name: "Hamborkger",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/2222/5817/products/Untitleddesign_89_1200x1200.png?v=1632172446",
      price: 16.99,
      description:
        "Your pup will feel delicious while wearing this yummy little hat.",
    }),
    Product.create({
      name: "Rambo",
      imageUrl:
        "https://odditymall.com/includes/content/upload/rambo-dog-costume-9899.jpg",
      price: 46.99,
      description:
        "Woof if you want to live, the world is a barking dangerous place",
    }),
    Product.create({
      name: "Shrek",
      imageUrl:
        "https://inst-1.cdn.shockers.de/hs_cdn/out/pictures/master/product/1/shrek_hundekostuem_delxue-kostuem_fuer_tiere-mit_dem_original_lizenzierten_shrek_hundekostuem_kannst_du_deinem_vierbeiner_eine_freude_machen-film_look-20614.jpg",
      price: 16.99,
      description: "Get out of my swamp! Woof!",
    }),
  ]);

  await products[0].addOrders(orders[0], {
    through: { quantity: 5, salesPrice: 20 },
  });
  await products[0].addOrders(orders[1], {
    through: { quantity: 8, salesPrice: 20 },
  });

  await products[1].addOrders(orders[0], {
    through: { quantity: 2, salesPrice: 30 },
  });
  await products[1].addOrders(orders[1], {
    through: { quantity: 1, salesPrice: 30 },
  });

  await orders[2].addProducts(products[2], {
    through: { quantity: 6, salesPrice: 40 },
  });
  await orders[2].addProducts(products[3], {
    through: { quantity: 10, salesPrice: 50 },
  });

  await orders[3].addProducts(products[0], {
    through: { quantity: 4, salesPrice: 20 },
  });
  await orders[3].addProducts(products[1], {
    through: { quantity: 6, salesPrice: 30 },
  });

  await users[0].addOrders([orders[0], orders[2], orders[4]]);
  await users[1].addOrders([orders[3], orders[1]]);

  await orders[3].addProducts(products[1], {
    through: { quantity: 9, salesPrice: 30 },
  });
  await orders[3].addProducts(products[2], {
    through: { quantity: 12, salesPrice: 40 },
  });
  await orders[3].addProducts(products[3], {
    through: { quantity: 1, salesPrice: 50 },
  });

  await orders[4].addProducts(products[0], {
    through: { quantity: 4, salesPrice: 20 },
  });
  await orders[4].addProducts(products[1], {
    through: { quantity: 3, salesPrice: 30 },
  });

  return {
    users: {
      cody: users[0],
      murphy: users[1],
      lucy: users[2],
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
