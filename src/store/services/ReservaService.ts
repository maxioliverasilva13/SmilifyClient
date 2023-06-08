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
  tagTypes: ["Reservas", "ReservasHoy", "ReservasMonth"],
  endpoints: (builder) => ({
    getReservas: builder.query({
      providesTags: ["Reservas"],
      query: () => apiRoutes.getReservas(),
      transformResponse(value) {
        const response = value as Reserva[]; // modificar al type reserva.ts
        return response;
      },
    }),
    getReservasHoy: builder.query({
      providesTags: ["ReservasHoy"],
      query: () => apiRoutes.getReservasHoy(),
      transformResponse(value) {
        const response = value as Reserva[];
        return response;
      }
    }),
    getReservasMonth: builder.query({
      providesTags: ["ReservasMonth"],
      query: ({month, year}) => apiRoutes.getReservasMonth(month, year),
      transformResponse(value) {
        const response = value as Reserva[];
        return response;
      }
    }),
    createReserva: builder.mutation({
      invalidatesTags: ["Reservas", "ReservasHoy", "ReservasMonth"],
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
  useGetReservasByUserCedulaQuery,
  useGetReservasHoyQuery,
  useGetReservasMonthQuery,
} = ReservaService;
