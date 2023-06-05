import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import apiRoutes from "../../utils/apiRoutes";
import { prepareHeaders } from "../../utils/prepareHeaders";
import { Paciente, PacienteInfoResponse } from "src/types/paciente";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080/Smilify-1.0/resources",
  prepareHeaders,
});

export const PacienteService = createApi({
  reducerPath: "PacientesService",
  baseQuery: baseQuery,
  tagTypes: ["Pacientes", "PacienteInfo"],
  endpoints: (builder) => ({
    getPacientes: builder.query({
      providesTags: ["Pacientes"],
      query: () => apiRoutes.getPacientes(),
      transformResponse(value) {
        const response = value as Paciente[];
        return response;
      },
    }),
    getPacienteInfo: builder.query({
      providesTags: ["PacienteInfo"],
      query: (pacienteId: any) => apiRoutes.getPacienteInfo(pacienteId),
      transformResponse(value) {
        const response = value as PacienteInfoResponse;
        return response;
      },
    }),
    cambiarEstado: builder.mutation({
      invalidatesTags: ["PacienteInfo"],
      query: (data: any) => ({
        url: apiRoutes.cambiarEstado(),
        method: "POST",
        body : {
          pacienteId: data?.pacienteId,
          alta: data?.alta,
          fechaAlta: data?.fechaAlta,
        }
      }),
      transformResponse(value) {
        const response = value as PacienteInfoResponse;
        return response;
      },
    }),
  }),
});

export const { useGetPacientesQuery, useGetPacienteInfoQuery, useCambiarEstadoMutation } = PacienteService;
