import DashboardBox from "@/components/DashboardBox";
import React, { useMemo } from "react";
import { useTheme } from "@mui/material";
import { useGetKpisQuery, useGetProductsQuery } from "@/state/api";
import BoxHeader from "@/components/BoxHeader";
import FlexBetween from "@/components/FlexBetween";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";

import { Typography, Box } from "@mui/material";

const Row2 = () => {
  const { data: operationalData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  const { palette } = useTheme();
  console.log("productData", productData);
  const pieData = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 600 },
  ];

  const pieColors = [palette.primary[800], palette.primary[300]];

  const operationalExpenses = useMemo(() => {
    return (
      operationalData &&
      operationalData[0].monthlyData.map(
        ({ month, operationalExpenses, nonOperationalExpenses }) => {
          return {
            name: month.substring(0, 3),
            "Operational Expenses": operationalExpenses,
            "Non Operational Expenses": nonOperationalExpenses,
          };
        }
      )
    );
  }, [operationalData]);

  const productExpenseData = useMemo(() => {
    return productData && productData.map(({_id, price, expense}) => {
      return {id: _id, price, expense}
    })
  }, [productData])

  return (
    <>
      <DashboardBox gridArea="d">
        <BoxHeader
          title="Operational vs Non-Operational Expenses"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={400}
            data={operationalExpenses}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 55,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="left"
              axisLine={{ strokeWidth: "0" }}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              axisLine={{ strokeWidth: "0" }}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />

            <Tooltip />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="Non Operational Expenses"
              dot={true}
              stroke={palette.tertiary[500]}
              fillOpacity={1}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="Operational Expenses"
              dot={true}
              stroke={palette.primary.main}
              fillOpacity={1}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="e">
        <BoxHeader title="Campaigns and Targets" sideText="+4%" />
        <FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem">
          <PieChart width={110} height={100}>
            <Pie
              data={pieData}
              innerRadius={18}
              outerRadius={38}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index]} />
              ))}
            </Pie>
          </PieChart>
          <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
            <Typography variant="h5">Target Sales</Typography>
            <Typography m="0.3rem 0" variant="h3" color={palette.primary[300]}>
              83
            </Typography>
            <Typography variant="h6">
              Finance goals of the campaign that is desired
            </Typography>
          </Box>
          <Box flexBasis="40%">
            <Typography variant="h5">Losses in Revenue</Typography>
            <Typography variant="h6">Losses are down 25%</Typography>
            <Typography variant="h5" mt="0.4rem">
              Profit Margins
            </Typography>
            <Typography variant="h6">
              Margins are up by 30% from last month.
            </Typography>
          </Box>
        </FlexBetween>
      </DashboardBox>
      <DashboardBox gridArea="f">
        <BoxHeader title="Product Prices vs Expenses" sideText="+4%" />
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 20,
              right: 25,
              bottom: 40,
              left: -10,
            }}
          >
            <CartesianGrid stroke={palette.grey[800]} />
            <XAxis
              type="number"
              dataKey="price"
              name="price"
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `$${v}`}
            />
            <YAxis
              type="number"
              dataKey="expense"
              name="expense"
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `$${v}`}
            />
            <ZAxis type="number" range={[20]} />
            <Tooltip formatter={(v) => `$${v}`} />
            <Scatter
              name="Product Expense Ratio"
              data={productExpenseData}
              fill={palette.tertiary[500]}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row2;
