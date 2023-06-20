import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

const CheckoutInput = ({ name, label,  }) => {
  const { control } = useFormContext();
  return (
    <>
      <Grid>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <TextField fullWidth label={label} required />
          )}
        />
      </Grid>
    </>
  );
};

export default CheckoutInput;
