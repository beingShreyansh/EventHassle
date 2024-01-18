const RazorPay = require('razorpay');
const crypto = require('crypto');

const orderCreate = async (req, res) => {
  try {
    const instance = new RazorPay({
      key_id: process.env.KEY_ID,
      key_secret: process.env.KEY_SECRET,
    });
    const options = {
      amount: req.body.amount * 100,
      currency: 'INR',
      receipt: crypto.randomBytes(10).toString('hex'),
    };
    instance.orders.create(options, (err, order) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Something went Wrong' });
      }
      res.status(200).json({ data: order });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
};
const verifyPayment = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.KEY_SECRET)
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature === expectedSign)
      return res.status(200).json({ msg: 'Payment Verified Successfully' });
    else return res.status(500).json({ msg: 'Invalid Signature' });
  } catch (error) {
    console.log(err);
  }
};

module.exports = { orderCreate, verifyPayment };
