import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    reducerPath: "main",
    baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_BASE_URL}),
    tagTypes:["kpis"],
    endpoints: (builder) => ({
        getKpis: builder.query<void, void>({
            query: () => "kpi/kpis",
            providesTags:["kpis"]
        }),
    }),


})

export const { useGetKpisQuery} = api;
