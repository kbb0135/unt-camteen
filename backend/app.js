const express = require("express");
const app = express();
const cors = require("cors");
const stripe = require("stripe")("sk_test_51OA0QdECOmJ4IJcKfuj5uDatXIsEaf5GpAHML41f6DrKErJlOs1iI1jlqfyNQI7Zf42VqDgq6I2ZzNV6vMrTIWPO002giMzRjY")

app.use(express.json());
app.use(cors());

//for checkout

app.post("/api/create-checkout-session", async (req, res) => {
    const {products} = req.body;

    const lineItems = products.map((product)=> ({
        price_data:{
            currency:"usd",
            product_data:{
                name:product.name
            },
            unit_amount:product.price*100
        },
        quantity:product.quantity
    }))

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode:"payment",
        success_url:"http://localhost:3000/success",
        cancel_url:"http://localhost:3000/cancel"
    })
    res.json({id: session.id})
    
})

app.listen(7000, ()=> {
    console.log('Server is running on port 7000');
});


