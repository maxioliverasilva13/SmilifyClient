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

    createReserva: builder.mutation({
      query: (data) => ({
        url: `${apiRoutes.postReserva()}`,
        method: "POST",
        body: {
          fecha: data?.fecha,
          estado: data?.estado,
          pacienteId: data?.pacienteId
        },
      }),
      transformResponse(value) {
        const response = value;
        return response;
      },
    }),

    getReservasByUserCedula: builder.query({
      providesTags: ["Reservas"],
      query: (dataCedula) => apiRoutes.getReservasByUserCedula(dataCedula),
      transformResponse(value) {
        const response = value as boolean; // modificar al type reserva.ts
        return response;
      },
    }),

    getReservasByFecha: builder.query({
      providesTags: ["Reservas"],
      query: (data) => apiRoutes.getReservasByFecha(data),
      transformResponse(value) {
        const response = value as Reserva[]; // modificar al type reserva.ts
        return response;
      },
    }),
  }),
});

export const { 
  useGetReservasQuery,
  useCreateReservaMutation,
  useGetReservasByFechaQuery,
  useGetReservasByUserCedulaQuery
} = ReservaService;
