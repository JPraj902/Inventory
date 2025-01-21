import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ProductTable from "./ProductTable";
import BoxTable from "./BoxTable";

const Dashboard = () => {
  const [productCount, setProductCount] = useState(0);
  const [boxCount, setBoxCount] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/counts")
      .then((res) => res.json())
      .then((data) => {
        setProductCount(data.products);
        setBoxCount(data.boxes);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5">Total Products</Typography>
              <Typography variant="h2" color="primary">
                {productCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5">Total Boxes</Typography>
              <Typography variant="h2" color="secondary">
                {boxCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h5" style={{ marginTop: "40px" }}>
        Products
      </Typography>
      <ProductTable />

      <Typography variant="h5" style={{ marginTop: "40px" }}>
        Boxes
      </Typography>
      <BoxTable />
    </div>
  );
};

export default Dashboard;
