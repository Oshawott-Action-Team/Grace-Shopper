'use strict';

const {
  db,
  models: { User, Product },
} = require('../server/db');
const Order = require('../server/db/models/Order');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const users = await Promise.all([
    User.create({
      username: 'cody',
      password: '123',
      firstName: 'cody',
      lastName: 'cafe',
      email: 'abc@gmail.com',
      address1: 'dsfdsg',
      address2: 'daasdasd',
      city: 'raleigh',
      state: 'NC',
      postCode: 27560,
    }),
    User.create({
      username: 'murphy',
      password: '123',
      firstName: 'murphy',
      lastName: 'cafe',
      email: 'ab@gmail.com',
      address1: 'dsfdsg',
      address2: 'daasdasd',
      city: 'raleigh',
      state: 'NC',
      postCode: 27560,
    }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);

  let orders = await Promise.all([
    Order.create({
      orderStatus: 'completed',
    }),
    Order.create({
      orderStatus: 'completed',
    }),
    Order.create({
      orderStatus: 'completed',
    }),
    Order.create({
      orderStatus: 'new',
    }),
    Order.create({
      orderStatus: 'new',
    }),
  ]);

  // Creating Products
  const products = await Promise.all([
    Product.create({
      name: 'Graceful Mermaid',
      imageUrl:
        'https://partycity6.scene7.com/is/image/PartyCity/_pdp_sq_?$_500x500_$&$product=PartyCity/P815188',
      price: 45,
      description:
        'Ariel the mermaid WHO??? Your dog will dazzle in this purple sequin, teal fish scale print',
    }),
    Product.create({
      name: 'Dino',
      imageUrl:
        'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1532720004-51JAxI-xRyL.jpg?crop=1xw:1xh;center,top&resize=768%3A%2A',
      price: 24.99,
      description:
        'Let your dog live out their dino fantasies with this stunning headpiece',
    }),
    Product.create({
      name: 'Mail Man',
      imageUrl:
        'https://partycity6.scene7.com/is/image/PartyCity/_pdp_sq_?$_500x500_$&$product=PartyCity/P856120',
      price: 12.0,
      description:
        "Neither snow nor rain nor heat nor gloom of night will keep your pup from trick-or-treating when they're dressed in this US Mail Carrier Dog Costume. The blue outfit features foam arms that hold up a USPS box, giving the illusion that your dog is walking on two legs. This easy, slip-on outfit stays closed with a hook-and-loop closure. People will be more excited for this little mail carrier than they are for the package they bring! ",
    }),
    Product.create({
      name: 'Butterfly',
      imageUrl:
        'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1532720256-51Jngn8Yx4L.jpg?crop=1xw:1xh;center,top&resize=768%3A%2A',
      price: 7.99,
      description:
        'Your pup will feel like a beautiful, post-metamorphasis butterfly from the inside out while wearing this piece.',
    }),
  ]);

  await products[0].addOrders([orders[0], orders[1]]);
  await products[1].addOrders([orders[0], orders[1]]);
  await orders[2].addProducts([products[2], products[3]]);
  await orders[3].addProducts([products[0], products[1]]);
  // console.log(Object.keys(Product.prototype));
  // console.log(Object.keys(Order.prototype));
  // console.log(Object.keys(User.prototype));
  await users[0].addOrders([orders[0], orders[2], orders[4]]);
  await users[1].addOrders([orders[3], orders[1]]);

  await orders[3].addProducts([products[1], products[2], products[3]]);
  await orders[4].addProducts([products[0], products[1]]);

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
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
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
