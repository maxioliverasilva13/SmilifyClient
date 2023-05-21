import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import apiRoutes from "../../utils/apiRoutes";
import { prepareHeaders } from "../../utils/prepareHeaders";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080/Smilify-1.0/resources",
  prepareHeaders,
});
  
export const FileService = createApi({
  reducerPath: "FileService",
  baseQuery: baseQuery,
  tagTypes: ["ListFiles"],
  endpoints: builder => ({
    createArchivo: builder.mutation({
      query: data => {
        return {
          url: apiRoutes.uploadFile(),
          method: "POST",
          body: { url: data?.url, tipo: data?.tipo, paciente_id: data?.paciente_id },
        };
      },
      transformResponse(value) {
        const response = value;
        return response;
      },
      invalidatesTags: ["ListFiles"],
    }),
    getArchivosByPacienteId: builder.query({
        query: (uid) => `${apiRoutes.getArchivosByPacienteId() + uid}`,
        providesTags: ["ListFiles"],
        transformResponse(value) {
          const response = value;
          return response;
        },
      }),
  }),
});

export const {
  useCreateArchivoMutation,
  useGetArchivosByPacienteIdQuery,
} = FileService;
