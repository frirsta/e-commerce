import React from "react";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Order from "./Order";

const Payment = ({ checkoutToken }) => {
  return (
    <div>
      <Order checkoutToken={checkoutToken} />
    </div>
  );
};

export default Payment;
