import React from "react";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/joy/Typography";

const Order = ({ checkoutToken }) => {
  return (
    <div>
      <List>
        {checkoutToken.line_items.map((product) => (
          <ListItem key={product.id}>
            <ListItemText
              primary={product.name}
              secondary={`Quantity: ${product.quantity}`}
            />
            <Typography>{product.line_total.formatted_with_code}</Typography>
          </ListItem>
        ))}
        <ListItem>
          <ListItemText primary="Total" />
          <Typography>{checkoutToken.subtotal.formatted_with_code}</Typography>
        </ListItem>
      </List>
    </div>
  );
};

export default Order;
