import AspectRatio from "@mui/joy/AspectRatio";
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

export default function NewArrivals({ products }) {
  return (
    <div className={styles.Trendy}>
      <span className={styles.Popular}>New Arrivals</span>
      <span className={styles.TrendyTitle}>Trending now</span>
      <Divider className={styles.Divider} variant="middle" />
      <Grid className={styles.ProductGrid} container>
        {products.map((item) => (
          <Grid key={item.id}>
            <Card
              className={styles.Product}
              sx={{
                bgcolor: "initial",
                boxShadow: "none",
                "--Card-padding": "0px",
              }}
            >
              <Box sx={{ position: "relative" }}>
                <AspectRatio ratio="4/4">
                  <figure>
                    <img src={item.image.url} alt={item.name} />
                  </figure>
                </AspectRatio>

                <CardCover
                  className="gradient-cover"
                  sx={{
                    "&:hover, &:focus-within": {
                      opacity: 1,
                    },
                    opacity: 0,
                    transition: "0.1s ease-in",
                    background:
                      "linear-gradient(180deg, transparent 62%, rgba(0,0,0,0.00345888) 63.94%, rgba(0,0,0,0.014204) 65.89%, rgba(0,0,0,0.0326639) 67.83%, rgba(0,0,0,0.0589645) 69.78%, rgba(0,0,0,0.0927099) 71.72%, rgba(0,0,0,0.132754) 73.67%, rgba(0,0,0,0.177076) 75.61%, rgba(0,0,0,0.222924) 77.56%, rgba(0,0,0,0.267246) 79.5%, rgba(0,0,0,0.30729) 81.44%, rgba(0,0,0,0.341035) 83.39%, rgba(0,0,0,0.367336) 85.33%, rgba(0,0,0,0.385796) 87.28%, rgba(0,0,0,0.396541) 89.22%, rgba(0,0,0,0.4) 91.17%)",
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
                          <Button variant="soft" color="info">Shop now</Button>
                        </Link>
                      </Typography>
                    </Box>
                  </Box>
                </CardCover>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
