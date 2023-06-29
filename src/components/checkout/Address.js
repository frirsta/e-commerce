import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";
import FormLabel from "@mui/joy/FormLabel";
import Grid from "@mui/joy/Grid";
import Button from "@mui/joy/Button";
import TextField from "@mui/material/TextField";
import styles from "../../styles/Address.module.css";

import { commerce } from "../../library/commerce/commerce";

const Address = ({ checkoutToken, test }) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");
  const [shippingEmail, setShippingEmail] = useState("");
  const [shippingStreet, setShippingStreet] = useState("");
  const [shippingZip, setShippingZip] = useState("");
  const [shippingCity, setShippingCity] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const methods = useForm();

  const fetchShippingOptions = async (checkoutTokenId, country) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country }
    );

    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  useEffect(() => {
    const fetchShippingCountries = async (checkoutTokenId) => {
      const { countries } = await commerce.services.localeListShippingCountries(
        checkoutTokenId
      );

      setShippingCountries(countries);
      setShippingCountry(Object.keys(countries)[0]);
    };
    fetchShippingCountries(checkoutToken.id);
  }, [checkoutToken.id]);

  useEffect(() => {
    const fetchSubdivisions = async (countryCode) => {
      const { subdivisions } = await commerce.services.localeListSubdivisions(
        countryCode
      );
      setShippingSubdivisions(subdivisions);
      setShippingSubdivision(Object.keys(subdivisions)[0]);
    };
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      );
  }, [shippingSubdivision, checkoutToken.id, shippingCountry]);

  return (
    <>
      <FormProvider {...methods}>
        <form
          className={styles.Form}
          onSubmit={methods.handleSubmit((data) =>
            test({
              ...data,
              firstName,
              lastName,
              shippingCity,
              shippingEmail,
              shippingStreet,
              shippingZip,
              shippingCountry,
              shippingSubdivision,
              shippingOption,
            })
          )}
        >
          <Grid className={styles.InputContainer} spacing={2} container>
            <Grid xs={6}>
              <TextField
                color="secondary"
                variant="standard"
                className={styles.Input}
                required
                name="firstName"
                placeholder="firstname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid xs={6}>
              <TextField
                color="secondary"
                variant="standard"
                className={styles.Input}
                required
                name="lastName"
                placeholder="lastname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid xs={6}>
              <TextField
                color="secondary"
                variant="standard"
                className={styles.Input}
                required
                value={shippingStreet}
                onChange={(e) => setShippingStreet(e.target.value)}
                name="shippingStreet"
                placeholder="address"
              />
            </Grid>
            <Grid xs={6}>
              <TextField
                color="secondary"
                variant="standard"
                className={styles.Input}
                value={shippingEmail}
                onChange={(e) => setShippingEmail(e.target.value)}
                required
                name="shippingEmail"
                placeholder="email"
              />
            </Grid>
            <Grid xs={6}>
              <TextField
                color="secondary"
                variant="standard"
                className={styles.Input}
                required
                value={shippingCity}
                onChange={(e) => setShippingCity(e.target.value)}
                name="shippingCity"
                placeholder="city"
              />
            </Grid>
            <Grid xs={6}>
              <TextField
                color="secondary"
                variant="standard"
                className={styles.Input}
                required
                value={shippingZip}
                onChange={(e) => setShippingZip(e.target.value)}
                name="shippingZip"
                placeholder="ZIP / Postal code"
              />
            </Grid>
          </Grid>
          <Grid className={styles.Shipping} container>
            <Grid className={styles.SelectContainer} xs={12}>
              <FormLabel className={styles.Label} htmlFor="selectCountry">
                Country
              </FormLabel>
              <select
                className={styles.Select}
                id="selectCountry"
                autoComplete="off"
                onChange={(e) => setShippingCountry(e.target.value)}
                value={shippingCountry}
              >
                {Object.entries(shippingCountries)
                  .map(([code, name]) => ({
                    id: code,
                    name: name,
                  }))
                  .map((item) => (
                    <option
                      className={styles.Option}
                      key={item.id}
                      value={item.id}
                    >
                      {item.name}
                    </option>
                  ))}
              </select>
            </Grid>
            <Grid className={styles.SelectContainer} xs={12}>
              <FormLabel className={styles.Label} htmlFor="selectSubdivision">
                Subdivision
              </FormLabel>
              <select
                className={styles.Select}
                id="selectSubdivision"
                autoComplete="off"
                onChange={(e) => setShippingSubdivision(e.target.value)}
                value={shippingSubdivision}
              >
                {Object.entries(shippingSubdivisions)
                  .map(([code, name]) => ({
                    id: code,
                    name: name,
                  }))
                  .map((item) => (
                    <option
                      className={styles.Option}
                      key={item.id}
                      value={item.id}
                    >
                      {item.name}
                    </option>
                  ))}
              </select>
            </Grid>
            <Grid className={styles.SelectContainer} xs={12}>
              <FormLabel className={styles.Label} htmlFor="selectOption">
                Options
              </FormLabel>
              <select
                className={styles.Select}
                id="selectOption"
                autoComplete="off"
                onChange={(e) => setShippingOption(e.target.value)}
                value={shippingOption}
              >
                {shippingOptions
                  .map((sO) => ({
                    id: sO.id,
                    name: `${sO.description} - (${sO.price.formatted_with_code})`,
                  }))
                  .map((item) => (
                    <option
                      className={styles.Option}
                      key={item.id}
                      value={item.id}
                    >
                      {item.name}
                    </option>
                  ))}
              </select>
            </Grid>
          </Grid>
          <div className={styles.ButtonsContainer}>
            <Button className={styles.Button} to="/cart" component={Link}>
              Back
            </Button>
            <Button className={styles.Button} type="submit">
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default Address;
