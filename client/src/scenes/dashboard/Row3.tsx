import DashboardBox from "@/components/DashboardBox";
import  { useMemo } from "react";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import {
  useGetTransactionsQuery,
  useGetKpisQuery,
  useGetProductsQuery,
} from "@/state/api";
import BoxHeader from "@/components/BoxHeader";
import { useTheme, Box, Typography } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";
import { PieChart, Pie, Cell } from "recharts";
const Row3 = () => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[500]];
  const { data: transactionData } = useGetTransactionsQuery();
  const { data: productData } = useGetProductsQuery();
  const { data: kpiData } = useGetKpisQuery();

  console.log("transactionData", transactionData);

  const productColumns = [
    { field: "_id", headerName: "id", flex: 1, headerClassName: "header" },
    {
      field: "expense",
      headerName: "Expense",
      flex: 0,
      renderCell: (params: GridCellParams) => `$${params.value}`,
      headerClassName: "header",
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
      headerClassName: "header",
    },
  ];

  const transactionColumns = [
    { field: "_id", headerName: "id", flex: 1, headerClassName: "header" },
    {
      field: "buyer",
      headerName: "Buyer",
      flex: 0.65,
      headerClassName: "header",
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.35,
      headerClassName: "header",
    },
    {
      field: "productIds",
      headerName: "Count",
      flex: 0.35,
      headerClassName: "header",
      renderCell: (params: GridCellParams) =>
        (params.value as Array<string>).length,
    },
  ];
  // const transactionRows = transactionData?.map(({_id, buyer, amount, productIds}) => ({
  //   id:_id,
  //   _id,
  //   buyer,
  //   amount,
  //   productIds: productIds.length,
  // }));

  const pieData = useMemo(() => {
    if (kpiData) {
      const totalExpenses = kpiData[0].totalExpenses;
      return Object.entries(kpiData[0].expensesByCategory)
        .filter(([key, value]) => value !== null && value !== "")
        .map(([key, value]) => {
          return [
            {
              name: key,
              value: value,
            },
            {
              name: `${key} of Total`,
              value: totalExpenses - value,
            },
          ];
        });
    }
  }, [kpiData]);

  console.log("pieData", pieData);

  return (
    <>
      <DashboardBox gridArea="g">
        <BoxHeader
          title="List of Products"
          sideText={`${productData?.length} products`}
        />
        <Box
          mt="0.5rem"
          p="0 0.5rem"
          height="75%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={productData || []}
            columns={productColumns}
            sx={{
              "& .MuiDataGrid-cell": {
                borderColor: palette.grey[800],
                borderBottom: `1px solid ${palette.grey[800]} !important`,
              },
              "& .MuiDataGrid-columnSeparator": {
                visibility: "hidden",
              },
              "& .header": {
                backgroundColor: palette.background.light,
                borderBottom: `1px solid ${palette.grey[800]} !important`,
              },
              "& .MuiDataGrid-scrollbarFiller": {
                backgroundColor: palette.background.light,
                borderBottom: `1px solid ${palette.grey[800]} !important`,
              },
              "& ::-webkit-scrollbar": {
                width: "12px",
              },
              "& ::-webkit-scrollbar-track": {
                backgroundColor: palette.background.default,
              },
              "& ::-webkit-scrollbar-thumb": {
                // boxShadow: "inset 0 0 6px rgba(0,0,0,.3)",
                backgroundColor: palette.grey[800],
              },
            }}
          />
        </Box>
      </DashboardBox>
      <DashboardBox gridArea="h">
        <BoxHeader
          title="Recent Orders"
          sideText={`${transactionData?.length} latest transactions`}
        />
        <Box
          mt="0.5rem"
          p="0 0.5rem"
          height="75%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={transactionData || []}
            columns={transactionColumns}
            sx={{
              "& .MuiDataGrid-cell": {
                borderColor: palette.grey[800],
                borderBottom: `1px solid ${palette.grey[800]} !important`,
              },
              "& .MuiDataGrid-columnSeparator": {
                visibility: "hidden",
              },
              "& .header": {
                backgroundColor: palette.background.light,
                borderBottom: `1px solid ${palette.grey[800]} !important`,
              },
              "& .MuiDataGrid-scrollbarFiller": {
                backgroundColor: palette.background.light,
                borderBottom: `1px solid ${palette.grey[800]} !important`,
              },
              "& ::-webkit-scrollbar": {
                width: "12px",
              },
              "& ::-webkit-scrollbar-track": {
                backgroundColor: palette.background.default,
              },
              "& ::-webkit-scrollbar-thumb": {
                // boxShadow: "inset 0 0 6px rgba(0,0,0,.3)",
                backgroundColor: palette.grey[800],
              },
            }}
          />
        </Box>
      </DashboardBox>
      <DashboardBox gridArea="i">
        <BoxHeader title="Expense Breakdown By Category" sideText="+4%" />
        <FlexBetween
          mt="0.5rem"
          gap="0.5rem"
          p="0 1rem"
          textAlign="center"
          marginTop="-0.5rem"
        >
          {pieData?.map((data, index) => (
            <Box key={`${data[0].name}-${index}`}>
              <PieChart width={110} height={100}>
                <Pie
                  data={data}
                  innerRadius={18}
                  outerRadius={35}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
              </PieChart>
              <Typography variant="h5" marginTop="-0.5rem">
                {data[0].name}
              </Typography>
            </Box>
          ))}
        </FlexBetween>
      </DashboardBox>
      <DashboardBox gridArea="j">
        <BoxHeader
          title="Overall Summary and Explanation Data"
          sideText="+15%"
        />
        <Box
          height="15px"
          margin="1.25rem 1rem 0.4rem 1rem"
          bgcolor={palette.primary[800]}
          borderRadius="1rem"
        >
          <Box
            height="15px"
            bgcolor={palette.primary[600]}
            borderRadius="1rem"
            width="40%"
          ></Box>
          <Typography margin="1 1rem" paddingTop="0.5rem" variant="h6">
            Orci aliquam enim vel diam. Venenatis euismod id donec mus lorem
            etiam ullamcorper odio sed. Ipsum non sed gravida etiam urna egestas
            molestie volutpat et. Malesuada quis pretium aliquet lacinia ornare
            sed. In volutpat nullam at est id cum pulvinar nunc.
          </Typography>
        </Box>
      </DashboardBox>
    </>
  );
};

export default Row3;
