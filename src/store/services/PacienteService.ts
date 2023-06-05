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

    getPacienteById: builder.query({
      providesTags: ["Pacientes"],
      query: (data) => apiRoutes.getPacientesById(data),
      transformResponse(value) {
        const response = value as Paciente;
        return response;
      },
    }),

    postPaciente: builder.mutation({
      query: (data) => ({
        url: `${apiRoutes.postPaciente()}`,
        method: "POST",
        body: {
          id: data?.cedula,
          nombre: data?.nombre,
          apellido: data?.apellido,
          telefono: data?.telefono,
          correo: data?.correo,
          direccion: data?.direccion,
          activo: false,
          fechaDeNacimiento: data.fechaNacimiento,
        },
      }),
      transformResponse(value) {
        const response = value;
        return response;
      },
    }),

  }),
});

export const { useGetPacientesQuery, useGetPacienteByIdQuery } = PacienteService;
export const { usePostPacienteMutation } = PacienteService;
