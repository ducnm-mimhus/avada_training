const { rejects } = require("assert/strict");
const { resolve } = require("path");

const users = [
  { id: 1, name: "Minh" },
  { id: 2, name: "Duc" },
];

const orders = [
  { userId: 1, price: 100 },
  { userId: 1, price: 200 },
  { userId: 2, price: 300 },
];

const getUserById = (id, callback) => {
  setTimeout(() => {
    const user = users.find((u) => u.id === id);
    if (!user) {
      return callback("User not found!");
    }
    callback(null, user);
  }, 2000);
};

const getOrderByUserId = (userId, callback) => {
  setTimeout(() => {
    const order = orders.filter((o) => o.userId === userId);
    callback(null, order);
  }, 2000);
};

/*============================================================*/
const getTotalPriceCallback = (userId, callback) => {
  getUserById(userId, (err, user) => {
    if (err) {
      return callback(err);
    }

    getOrderByUserId(userId, (err, orders) => {
      if (err) {
        return callback(err);
      }

      let totalPrice = 0;
      orders.forEach((element) => {
        totalPrice += element.price;
      });

      callback(null, totalPrice);
    });
  });
};

// console.log(
//   getTotalPriceCallback(1, (err, total) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(total);
//     }
//   })
// );

/*================================================================*/

const getUserByIDPromise = (userId) => {
  return new Promise((resolve, reject) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      resolve(user);
    } else {
      reject("User not found!");
    }
  });
};

const getOrderByUserIdPromise = (userID) => {
  return new Promise((resolve, reject) => {
    const order = orders.filter((o) => o.userId === userID);
    if (order.length > 0) {
      resolve(order);
    } else {
      reject("Order nor found!");
    }
  });
};

const getTotalPriceByUserIdHandle = async (userId) => {
  try {
    const user = await getUserByIDPromise(userId);
    const order = await getOrderByUserIdPromise(userId);

    let total = 0;
    order.forEach((element) => {
      total += element.price;
    });
    console.log(total);
  } catch (err) {
    console.error(err);
  } finally {
    console.log("Done!");
  }
};

getTotalPriceByUserIdHandle(2);
