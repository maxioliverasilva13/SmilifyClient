import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import apiRoutes from "../../utils/apiRoutes";
import { prepareHeaders } from "../../utils/prepareHeaders";
import { Paciente } from "src/types/paciente";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080/Smilify-1.0/resources",
  prepareHeaders,
});

export const PacienteService = createApi({
  reducerPath: "PacientesService",
  baseQuery: baseQuery,
  tagTypes: ["Pacientes"],
  endpoints: (builder) => ({
    getPacientes: builder.query({
      providesTags: ["Pacientes"],
      query: () => apiRoutes.getPacientes(),
      transformResponse(value) {
        const response = value as Paciente[];
        return response;
      },
    }),
  }),
});

export const { useGetPacientesQuery } = PacienteService;
