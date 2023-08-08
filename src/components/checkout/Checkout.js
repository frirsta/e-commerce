import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { commerce } from "../../library/commerce/commerce";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import styles from "../../styles/Checkout.module.css";
import Address from "./Address";
import Payment from "./Payment";
import Divider from "@mui/material/Divider";
import Button from "@mui/joy/Button";

const steps = ["Shipping", "Payment details"];

const Checkout = ({ order, onCaptureCheckout, error }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const [cart, setCart] = useState({});
  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };
  useEffect(() => {
    fetchCart();
  }, []);

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
    // console.log(shippingData);
    nextStep();
  };

  const Confirmation = () =>
    order.customer ? (
      <>
        <div className={styles.Order}>
          <div className={styles.OrderConfirmation}>
            Thank you for your order,
          </div>
          <div className={styles.Name}>
            {order.customer.firstname} {order.customer.lastname}
          </div>
          <Divider className={styles.Divider} variant="middle" />
          <div className={styles.Summary}>Order summary</div>

          <div className={styles.OrderReference}>
            Order ref: <div>{order.customer_reference}</div>
          </div>

          {order.order.line_items.map((item) => (
            <div key={item.id} className={styles.Table}>
              <div>
                <div className={`${styles.OrderReference}`}>
                  Name: <div>{item.product_name}</div>
                </div>
                <Divider variant="middle" />

                <div className={`${styles.OrderReference}`}>
                  Quantity: <div>{item.quantity}</div>
                </div>
                <Divider variant="middle" />

                <div className={`${styles.OrderReference}`}>
                  Price:
                  <div>{item.price.formatted_with_code}</div>
                </div>
                <Divider variant="middle" />

                {item.selected_options.map((option) => (
                  <div
                    key={option.option_name}
                    className={`${styles.OrderReference}`}
                  >
                    {option.group_name}
                    <div>{option.option_name}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <Divider className={styles.Divider} />

          <div className={styles.Table}>
            <div className={styles.TableItems}>
              <div className={`${styles.OrderReference}`}>
                Tax:
                <div>{order.tax.amount.formatted_with_code}</div>
              </div>
              <Divider variant="middle" />

              <div className={`${styles.OrderReference}`}>
                Total:
                <div>{order.order_value.formatted_with_code}</div>
              </div>
              <Divider variant="middle" />
            </div>
          </div>

          <Button className={styles.Button} component={Link} to={"/"}>
            Home
          </Button>
        </div>
      </>
    ) : error ? (
      <>
        Error: {error}
        <Divider className={styles.Divider} variant="middle" />
        <Button
          className={styles.Button}
          variant="secondary"
          component={Link}
          to={"/"}
        >
          Home
        </Button>
      </>
    ) : null;

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
    <div className={styles.Checkout}>
      <Typography className={styles.Title}>Checkout</Typography>
      <Paper className={styles.Container}>
        <Stepper className={styles.Label} activeStep={activeStep}>
          {steps.map((step) => (
            <Step className={styles.Label} key={step}>
              <StepLabel className={styles.Label}>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>
      {activeStep === steps.length ? (
        <Confirmation />
      ) : (
        checkoutToken && <Form />
      )}
    </div>
  );
};

export default Checkout;
