import React, { useEffect, useState } from "react";
import CheckoutInput from "./CheckoutInput";
import FormLabel from "@mui/joy/FormLabel";
import Grid from "@mui/joy/Grid";
import Button from "@mui/joy/Button";
import { useForm, FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";

import { commerce } from "../../library/commerce/commerce";

const Address = ({ checkoutToken, next }) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  const methods = useForm();
  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));

  const subdivisions = Object.entries(shippingSubdivisions).map(
    ([code, name]) => ({
      id: code,
      label: name,
    })
  );

  const options = shippingOptions.map((s0) => ({
    id: s0.id,
    label: `${s0.description} - (${s0.price.formatted_with_symbol})`,
  }));
  console.log(options);

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries));
  };

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    region = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region }
    );

    setShippingOptions(options);
    setShippingOption(options[0].id);
  };
  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);
  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      );
  }, [shippingSubdivision]);

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            next({
              ...data,
              shippingCountry,
              shippingSubdivision,
              shippingOption,
            })
          )}
        >
          <CheckoutInput name="firstname" label="firstname" />
          <CheckoutInput name="lastname" label="lastname" />
          <CheckoutInput name="address" label="address" />
          <CheckoutInput name="email" label="email" />
          <CheckoutInput name="city" label="city" />
          <CheckoutInput name="zip" label="ZIP / Postal code" />
          <Grid xs={12} sm={6}>
            <FormLabel>Shipping Country</FormLabel>
            <select
              onChange={(e) => setShippingCountry(e.target.value)}
              value={shippingCountry}
            >
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.label}
                </option>
              ))}
            </select>
          </Grid>
          <Grid xs={12} sm={6}>
            <FormLabel>Subdivisions Country</FormLabel>
            <select
              onChange={(e) => setShippingSubdivision(e.target.value)}
              value={shippingSubdivision}
            >
              {subdivisions.map((subdivision) => (
                <option key={subdivision.id} value={subdivision.id}>
                  {subdivision.label}
                </option>
              ))}
            </select>
          </Grid>
          <Grid xs={12} sm={6}>
            <FormLabel>Shipping options</FormLabel>
            <select
              onChange={(e) => setShippingOption(e.target.value)}
              value={shippingOption}
            >
              {options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </Grid>
          <div>
            <Button to="/cart" component={Link}>
              Back
            </Button>
            <Button type="submit">Next</Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default Address;
