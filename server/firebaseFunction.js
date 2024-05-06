// firebase.js
let db;

const initializeFirebase = async () => {
  const { getFirestore } = await import('@angular/fire/firestore');
  db = getFirestore();
};

initializeFirebase().then(() => {
  console.log('Firebase initialized');
}).catch(error => {
  console.error('Error initializing Firebase:', error);
});

const storeOrder = async (customer, data) => {
  try {
    const firestore = await db;
    const orderRef = await firestore.collection('orders').add({
      customerId: customer.id,
      userId: customer.metadata.userId,
      cart: JSON.parse(customer.metadata.cart),
      data,
    });

    console.log('Order stored successfully with ID:', orderRef.id);
  } catch (error) {
    console.error('Error storing order:', error);
  }
};

module.exports = { storeOrder };
