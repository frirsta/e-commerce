import React from "react";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Order from "./Order";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import styles from "../../styles/Address.module.css";

const StripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Payment = ({
  checkoutToken,
  nextStep,
  backStep,
  shippingData,
  onCaptureCheckout,
}) => {
  // console.log(shippingData);
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      // console.log(error);
    } else {
      const orderData = {
        line_items: checkoutToken.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.shippingEmail,
        },
        shipping: {
          name: "Primary",
          street: shippingData.shippingStreet,
          town_city: shippingData.shippingCity,
          county_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.shippingZip,
          country: shippingData.shippingCountry,
        },
        fulfillment: { shipping_method: shippingData.shippingOption },
        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };
      onCaptureCheckout(checkoutToken.id, orderData);
      nextStep();
      // console.log(orderData);
    }
  };
  return (
    <div>
      <Order checkoutToken={checkoutToken} />
      <Divider />
      <Typography>Payment Method</Typography>
      <Elements stripe={StripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br /> <br />
              <div className={styles.ButtonsContainer}>
                <Button className={styles.Button} onClick={backStep}>
                  Back
                </Button>
                <Button
                  className={styles.Button}
                  type="submit"
                  disabled={!stripe}
                >
                  Pay {checkoutToken.subtotal.formatted_with_code}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </div>
  );
};

export default Payment;
