import Box from "@mui/joy/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/joy/Typography";
import styles from "../../styles/CartItem.module.css";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";

const CartItem = ({ item, onUpdateCart, onRemoveCart }) => {
  return (
    <>
      <div className={styles.CartItem}>
        <div className={styles.CartItemContainer}>
          <img className={styles.Image} src={item.image.url} alt={item.name} />
        </div>
        <div className={styles.ProductInformation}>
          <div className={styles.Information}>
            <div>
              <Typography className={styles.Price}
              >
                {item.line_total.formatted_with_code}
              </Typography>
              <Typography className={styles.Name}>
                {item.name}
              </Typography>
            </div>
            <Typography>
              {item.selected_options[0]?.option_name ? (
                <>
                  <span className={styles.Size}>Size: </span>
                <span className={styles.SizeItem}>{item.selected_options[0]?.option_name}</span>
                </>
              ) : null}
            </Typography>
          </div>
          <div className={styles.ButtonsContainer}>
            <div>
              <IconButton
                className={styles.DeleteButton}
                onClick={() => onRemoveCart(item.id)}
                variant="solid"
                aria-label="delete"
              >
                <ClearIcon className={`${styles.EmptyButton} ${styles.Icon}`} />
              </IconButton>
            </div>
            <Box className={styles.UpdateButtonsContainer}>
              <IconButton
                className={styles.RemoveButton}
                onClick={() => onUpdateCart(item.id, item.quantity - 1)}
                aria-label="remove"
              >
                <RemoveIcon
                  className={`${styles.UpdateButton} ${styles.Icon}`}
                />
              </IconButton>
              <span className={styles.Quantity}>{item.quantity}</span>
              <IconButton
                onClick={() => onUpdateCart(item.id, item.quantity + 1)}
                aria-label="add"
              >
                <AddIcon className={`${styles.UpdateButton} ${styles.Icon}`} />
              </IconButton>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
