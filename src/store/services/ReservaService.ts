import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import apiRoutes from "../../utils/apiRoutes";
import { prepareHeaders } from "../../utils/prepareHeaders";
import { Reserva } from "src/types/reserva";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080/Smilify-1.0/resources",
  prepareHeaders,
});

export const ReservaService = createApi({
  reducerPath: "ReservaService",
  baseQuery: baseQuery,
  tagTypes: ["Reservas"],
  endpoints: (builder) => ({
    getReservas: builder.query({
      providesTags: ["Reservas"],
      query: () => apiRoutes.getReservas(),
      transformResponse(value) {
        const response = value as Reserva[]; // modificar al type reserva.ts
        return response;
      },
    }),
  }),
});

export const { useGetReservasQuery } = ReservaService;