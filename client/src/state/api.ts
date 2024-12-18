import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getKpiResponse, getProductResponse, getTransactionResponse } from './types';

export const api = createApi({
    reducerPath: "main",
    baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_BASE_URL}),
    tagTypes:["kpis", "products", "transactions"],
    endpoints: (builder) => ({
        getKpis: builder.query<Array<getKpiResponse>, void>({
            query: () => "kpi/kpis",
            providesTags:["kpis"]
        }),
        getProducts: builder.query<Array<getProductResponse>, void>({
            query: () => "product/products",
            providesTags:["products"]
        }),
        getTransactions: builder.query<Array<getTransactionResponse>, void>({
            query: () => "transaction/transactions",
            providesTags:["transactions"]
        }),
    }),


})

export const { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery} = api;
