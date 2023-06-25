import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import styles from "../../styles/Checkout.module.css";
import Address from "./Address";
import Payment from "./Payment";
import { commerce } from "../../library/commerce/commerce";

const steps = ["Shipping", "Payment details"];

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });
        setCheckoutToken(token);
      } catch (error) {}
    };
    generateToken();
  }, [cart]);

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const test = (data) => {
    setShippingData(data);
    console.log(shippingData);
    nextStep();
  };

  const Confirmation = <h2>Confirmation</h2>;

  const Form = () =>
    activeStep === 0 ? (
      <Address
        test={test}
        setShippingData={setShippingData}
        checkoutToken={checkoutToken}
        nextStep={nextStep}
      />
    ) : (
      <Payment
        checkoutToken={checkoutToken}
        nextStep={nextStep}
        backStep={backStep}
        shippingData={shippingData}
        onCaptureCheckout={onCaptureCheckout}
      />
    );
  return (
    <div>
      <Paper className={styles.Container}>
        <Typography>Checkout</Typography>
        <Stepper activeStep={activeStep}>
          {steps.map((step) => (
            <Step key={step}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? Confirmation : checkoutToken && <Form />}
      </Paper>
    </div>
  );
};

export default Checkout;