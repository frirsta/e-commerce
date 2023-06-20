import Box from "@mui/joy/Box";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import styles from "../../styles/CartItem.module.css";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";

const CartItem = ({ item, onUpdateCart, onRemoveCart }) => {
  return (
      <Box className={styles.Card}>
        <div className={styles.ImageContainer}>
          <img className={styles.Image} src={item.image.url} alt={item.name} />
        </div>
        <CardContent className={styles.CardContent}>
          <Typography fontWeight="lg">
            {item.name}
          </Typography>
          <Typography>{item.selected_options[0]?.option_name ? (<><span className={styles.Size}>Size:</span> {item.selected_options[0]?.option_name}</>) : (null)}</Typography>
          <Typography level="body2" fontWeight="lg" textColor="text.tertiary">
            {item.line_total.formatted_with_symbol}
          </Typography>
          <Box className={styles.ButtonsContainer}>
            <Box>
              <IconButton
              className={styles.RemoveButton}
                onClick={() => onUpdateCart(item.id, item.quantity - 1)}
                aria-label="remove"
              >
                <RemoveIcon className={`${styles.UpdateButton} ${styles.Icon}`} />
              </IconButton>
              <span className={styles.Quantity}>{item.quantity}</span>
              <IconButton
                onClick={() => onUpdateCart(item.id, item.quantity + 1)}
                aria-label="add"
              >
                <AddIcon className={`${styles.UpdateButton} ${styles.Icon}`} />
              </IconButton>
            </Box>
            <IconButton
            className={styles.DeleteButton}
              onClick={() => onRemoveCart(item.id)}
              variant="solid"
              aria-label="delete"
            >
              <ClearIcon className={`${styles.EmptyButton} ${styles.Icon}`} />
            </IconButton>
          </Box>
        </CardContent>
    </Box>
  );
};

export default CartItem;
