import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import apiRoutes from "../../utils/apiRoutes";
import { prepareHeaders } from "../../utils/prepareHeaders";
import { Paciente } from "src/types/paciente";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080/Smilify-1.0/resources",
  prepareHeaders,
});

export const CategoriaService = createApi({
  reducerPath: "CategoriaService",
  baseQuery: baseQuery,
  tagTypes: ["Categorias"],
  endpoints: (builder) => ({
    getcategorias: builder.query({
      providesTags: ["Categorias"],
      query: () => apiRoutes.getCategorias(),
      transformResponse(value) {
        const response = value as any[];
        return response;
      },
    }),
    createCategoria: builder.mutation({
      query: data => {
        return {
          url: apiRoutes.createCategoria(),
          method: "POST",
          body: data,
        }
      },
      transformResponse(value) {
        const response = value;
        return response;
      },
    }),
  }),
});

export const {useGetcategoriasQuery, useCreateCategoriaMutation} = CategoriaService;
