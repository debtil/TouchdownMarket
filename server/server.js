//posteriormente adicionar este arquivo no .gitignore devido à SK
const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(cors({origin: true, credentials: true}));

const stripe = require("stripe")("sk_test_51OG3cBLnrzag1vMq6oCQzlgrxCOrXtGtxo9H5xBHNpdciEmlTU7Tp1RSyAHuiUKNjK4hCcCo1k37xCjp8PzYVPfD00qFafhwUp");

app.post("/checkout", async (req, res, next) => {
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
      cancel_url: "http://localhost:4242/cancel.html",
    });

    res.status(200).json(session);
  } catch (error) {
    next(error);
  }
});

app.listen(4242, () => console.log('app is running on port 4242'));