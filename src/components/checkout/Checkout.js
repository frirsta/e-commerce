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
import { Divider } from "@mui/material";
import { Button } from "@mui/joy";
import { Link } from "react-router-dom";
import Table from "@mui/joy/Table";
import Card from "@mui/joy/Card";

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
    console.log(shippingData);
    nextStep();
  };

  const Confirmation = () =>
    order.customer ? (
      <>
        <div className={styles.Order}>
          <span className={styles.OrderConfirmation}>
            Thank you for your order,
          </span>
          <span className={styles.Name}>
            {order.customer.firstname} {order.customer.lastname}
          </span>
          <Divider className={styles.Divider} variant="middle" />
          <span className={styles.Summary}>Order summary</span>

          <span className={styles.OrderReference}>
            Order ref: <span>{order.customer_reference}</span>
          </span>

          {order.order.line_items.map((item) => (
            <Card>
              <Table key={item.id} className={styles.Table}>
                <tbody>
                  <span className={styles.Product}>
                    <tr className={styles.Row}>
                      <th>Name:</th> <td>{item.product_name}</td>
                    </tr>
                  </span>
                  <span className={styles.Product}>
                    <tr className={styles.Row}>
                      <th>Quantity:</th> <td>{item.quantity}</td>
                    </tr>
                  </span>
                  <span className={styles.Product}>
                    <tr className={styles.Row}>
                      <th>Price:</th> <td>{item.price.formatted_with_code}</td>
                    </tr>
                  </span>
                  {item.selected_options.map((option) => (
                    <span className={styles.Product} key={option.id}>
                      <tr className={styles.Row}>
                        <th>{option.group_name}</th>{" "}
                        <td>{option.option_name}</td>
                      </tr>
                    </span>
                  ))}
                </tbody>
              </Table>
            </Card>
          ))}

          <Divider className={styles.Divider} />
          <Card>
          <Table className={styles.Table}>
            <tbody className={styles.TableItems}>
            <span className={styles.Product}> <tr className={styles.Row}><th>Tax: </th> <td>{order.tax.amount.formatted_with_code}</td></tr></span>
            <span className={styles.Product}> <tr className={styles.Row}><th>Total: </th> <td>{order.order_value.formatted_with_code}</td></tr></span>
            </tbody>
          </Table>
          </Card>
        
          <Button className={styles.Button} component={Link} to={"/"}>
            Home
          </Button>
        </div>
      </>
    ) : error ? (
      <>
        Error: {error}
        <Divider className={styles.Divider} variant="middle" />
        <Button className={styles.Button} variant="secondary" component={Link} to={"/"}>
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
