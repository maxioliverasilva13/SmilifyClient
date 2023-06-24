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
  tagTypes: ["Pacientes", "PacienteInfo", "DientesInfo", "ConstulasByPaciente"],
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
    getReservasByPaciente: builder.query({
      providesTags: ["ConstulasByPaciente"],
      query: (pacienteId: any) => apiRoutes.reservasByPaciente(pacienteId),
      transformResponse(value) {
        const response = value as any[];
        return response || [];
      },
    }),
    cambiarEstado: builder.mutation({
      invalidatesTags: ["PacienteInfo"],
      query: (data: any) => ({
        url: apiRoutes.cambiarEstado(),
        method: "POST",
        body: {
          pacienteId: data?.pacienteId,
          alta: data?.alta,
          fechaAlta: data?.fechaAlta,
        },
      }),
      transformResponse(value) {
        const response = value as PacienteInfoResponse;
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
    getDientesInfo: builder.query({
      providesTags: ["DientesInfo"],
      query: (data) => apiRoutes.getDientesInfo(data),
      transformResponse(value) {
        const response = value as any[];
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
          fechaDeNacimiento: data.fechaDeNacimiento,
        },
      }),
      transformResponse(value) {
        const response = value;
        return response;
      },
    }),
    createTratamiento: builder.mutation({
      query: (data) => ({
        url: `${apiRoutes.tratamiento()}`,
        method: "POST",
        body: {
          paciente_id: data?.paciente_id,
          descripcion: data?.descripcion,
        },
      }),
      invalidatesTags: ["Pacientes"],
      transformResponse(value) {
        const response = value;
        return response;
      },
    }),
    createConsulta: builder.mutation({
      query: (data) => ({
        url: `${apiRoutes.consultas()}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["PacienteInfo", "ConstulasByPaciente"],
      transformResponse(value) {
        const response = value;
        return response;
      },
    }),
  }),
});

export const {
  useGetPacientesQuery,
  useGetPacienteInfoQuery,
  useCambiarEstadoMutation,
  useGetPacienteByIdQuery,
  usePostPacienteMutation,
  useGetDientesInfoQuery,
  useCreateTratamientoMutation,
  useGetReservasByPacienteQuery,
  useCreateConsultaMutation,
} = PacienteService;
