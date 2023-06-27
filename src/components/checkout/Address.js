import React, { useEffect, useState } from "react";
import FormLabel from "@mui/joy/FormLabel";
import Grid from "@mui/joy/Grid";
import Button from "@mui/joy/Button";
import { useForm, FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";
import Input from "@mui/joy/Input";

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
          onSubmit={methods.handleSubmit((data) =>
            test({
              ...data,
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
          <Input required name="firstName" placeholder="firstname" />
          <Input required name="lastName" placeholder="lastname" />
          <Input
            required
            value={shippingStreet}
            onChange={(e) => setShippingStreet(e.target.value)}
            name="shippingStreet"
            placeholder="address"
          />
          <Input
            value={shippingEmail}
            onChange={(e) => setShippingEmail(e.target.value)}
            required
            name="shippingEmail"
            placeholder="email"
          />
          <Input
            required
            value={shippingCity}
            onChange={(e) => setShippingCity(e.target.value)}
            name="shippingCity"
            placeholder="city"
          />
          <Input
            required
            value={shippingZip}
            onChange={(e) => setShippingZip(e.target.value)}
            name="shippingZip"
            placeholder="ZIP / Postal code"
          />
          <Grid xs={12} sm={6}>
            <FormLabel>Shipping Country</FormLabel>
            <select
              onChange={(e) => setShippingCountry(e.target.value)}
              value={shippingCountry}
            >
              {Object.entries(shippingCountries)
                .map(([code, name]) => ({
                  id: code,
                  name: name,
                }))
                .map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
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
              {Object.entries(shippingSubdivisions)
                .map(([code, name]) => ({
                  id: code,
                  name: name,
                }))
                .map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
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
              {shippingOptions
                .map((sO) => ({
                  id: sO.id,
                  name: `${sO.description} - (${sO.price.formatted_with_code})`,
                }))
                .map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
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
