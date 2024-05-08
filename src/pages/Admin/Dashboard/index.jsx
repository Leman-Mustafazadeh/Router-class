import React, { useEffect, useState } from "react";
import { getAll } from "../../../API";
import { BarChart } from "@mui/x-charts/BarChart";
import { Grid } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { PieChart } from "@mui/x-charts";

const Dashboard = () => {
  const [allcount, setallCount] = useState(0);

  useEffect(() => {
    getAll().then((res) => {
      setallCount(res.data);
    });
  }, []);
  return (
    <div>
      <h1>Admin Panel Dashboard</h1>
      <Grid container sx={{ width: "80%", margin: "30px auto" }}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <BarChart
            series={[
              { data: [35, 44, 24, 34] },
              { data: [51, 6, 49, 30] },
              { data: [15, 25, 30, 50] },
            ]}
            height={290}
            xAxis={[{ data: ["Az", "RUS", "USA"], scaleType: "band" }]}
            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
          />
        </Grid>
    
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 0.13, label: "Azerbaijan" },
                  { id: 1, value: 0.13, label: "Russia" },
                  { id: 2, value: 334, label: "USA" },
                ],
              },
            ]}
            width={400}
            height={200}
          />
        </Grid>
      </Grid>
    </div>
  );
};
export default Dashboard;
