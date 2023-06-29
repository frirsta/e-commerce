import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import Typography from "@mui/joy/Typography";
import Link from "@mui/joy/Link";
import Button from "@mui/joy/Button";
import { Link as RouterLink } from "react-router-dom";
import styles from "../../styles/NewArrivals.module.css";
import Grid from "@mui/joy/Grid";
import Divider from "@mui/material/Divider";
import CardMedia from "@mui/material/CardMedia";
import CardOverflow from "@mui/joy/CardOverflow";

export default function NewArrivals({ products }) {
  return (
    <div className={styles.Trendy}>
      <span className={styles.Popular}>New Arrivals</span>
      <span className={styles.TrendyTitle}>Trending now</span>
      <Divider className={styles.Divider} variant="middle" />
      <Grid className={styles.ProductGrid} container>
        {products.map((item) => (
          <Grid key={item.id}>
            <Card className={styles.Product}>
              <CardOverflow className={styles.CardOverflow}>
                <Link to={`/item/${item.id}`} className={styles.ProductLink}>
                  <CardMedia
                    className={styles.Image}
                    component={"img"}
                    image={item.image.url}
                  />
                </Link>
                <CardCover
                  className={`${styles.CardCover} gradient-cover"`}
                  sx={{
                    "&:hover, &:focus-within": {
                      opacity: 1,
                    },
                    opacity: 0,
                    transition: "0.3s ease-in",
                    background:
                      "linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.44796380090497734) 50%, rgba(0,0,0,0.45) 100%)",
                  }}
                >
                  <Box>
                    <Box
                      sx={{
                        p: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        flexGrow: 1,
                        alignSelf: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography level="h2" noWrap sx={{ fontSize: "lg" }}>
                        <Link
                          component={RouterLink}
                          to={`/item/${item.id}`}
                          overlay
                          underline="none"
                          sx={{
                            color: "#fff",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            display: "block",
                          }}
                        >
                          <Button
                            className={styles.ProductButton}
                            variant="outlined"
                          >
                            Shop now
                          </Button>
                        </Link>
                      </Typography>
                    </Box>
                  </Box>
                </CardCover>
              </CardOverflow>
            </Card>
          </Grid>
        ))}
      </Grid>

      <div>
        <Button
          color="info"
          className={styles.Button}
          component={RouterLink}
          to={"/shop"}
        >
          View all
        </Button>
      </div>
    </div>
  );
}
