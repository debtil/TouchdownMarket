//posteriormente adicionar este arquivo no .gitignore devido à SK
const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const { createBrotliDecompress } = require("zlib");
const { Order } = require("./order");

const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(cors({origin: true, credentials: true}));

const stripe = require("stripe")("sk_test_51OG3cBLnrzag1vMq6oCQzlgrxCOrXtGtxo9H5xBHNpdciEmlTU7Tp1RSyAHuiUKNjK4hCcCo1k37xCjp8PzYVPfD00qFafhwUp");

app.post("/checkout", async (req, res, next) => {
  
  const customer = await stripe.customers.create({
    metadata:{
      userId: req.body.userId,
      cart: JSON.stringify(req.body.items)
    },
  });
  
  try {
    const item = req.body.items;

    if (typeof item !== "object") {
      throw new Error("item property in req.body must be an object");
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'boleto'],
      shipping_address_collection: {
        allowed_countries: ['BR', 'US']
      },
        shipping_options: [{
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount:{
              amount: 0,
              currency: 'brl',
            },
            display_name: 'Livre de Frete',
            delivery_estimate:{
              minimum:{
                unit: 'business_day',
                value: 5,
              },
              maximum: {
                unit: 'business_day',
                value: 7,
              },
            }
          }
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
                amount: 1500,
                currency: 'brl',
            },
            display_name: 'Enviado no dia seguinte',
            delivery_estimate: {
                minimum: {
                unit: 'business_day',
                value: 1,
                },
                maximum: {
                unit: 'business_day',
                value: 1,
                },
            }
          }
        },
        ],
        customer: customer.id,
        line_items:  req.body.items.map((item) => ({
          price_data: {
            currency: 'brl',
            product_data: {
              name: item.name,
              images: [item.images]
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        })),
      mode: "payment",
      success_url: "http://localhost:4242/success.html",
      cancel_url: "http://localhost:4200/showdown",
    });

    res.status(200).json(session);
  } catch (error) {
    next(error);
  }
});

//Create Order
const createOrder = async(customer, data) =>{
  const Items = JSON.parse(customer.metadata.cart);

  const newOrder = Order({
    userId: customer.metadata.userId,
    customerId: data.customer,
    paymentIntentId: data.payment_intent,
    products: Items,
    subtotal: data.amount_subtotal,
    total: data.amount_total,
    shipping: data.customer_details,
    payment_status: data.payment_status,
  });
  try{
    const savedOrder = await newOrder.save();
    console.log("saved order: ", savedOrder);
    //email de confirmação pro user poder ser implementado aqui
  }catch(err){
    console.log(err);
  }
}

//webhook
let endpointSecret; 
//endpointSecret = "whsec_3fead49f34e4ad6d6e9f470d85a7530e96e70d9d8429c39458c8e8e5f79a35aa";

app.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['stripe-signature'];

  let data;
  let eventType;

  if(endpointSecret){
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      console.log("Webhook verified");
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    data = event.data.object;
    eventType = event.type;
  
  }else{
    data = req.body.data.object;
    eventType = req.body.type;
  }

  // Handle the event
  if(eventType == "checkout.session.completed"){
    stripe.customers.retrieve(data.customer).then((customer) =>{
      //console.log(customer);
      //console.log("data: ", data);
      createOrder(customer, data); 
    }).catch(err => console.log(err.message))
  }

  // Return a 200 res to acknowledge receipt of the event
  res.send().end();
});

app.listen(4242, () => console.log('app is running on port 4242'));