import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import apiRoutes from "../../utils/apiRoutes";
import { prepareHeaders } from "../../utils/prepareHeaders";
import { Arancel } from "src/types/arancel";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080/Smilify-1.0/resources",
  prepareHeaders,
});

export const ArancelService = createApi({
  reducerPath: "ArancelesService",
  baseQuery: baseQuery,
  tagTypes: ["Aranceles"],
  endpoints: (builder) => ({
    getAranceles: builder.query({
      providesTags: ["Aranceles"],
      query: () => `${apiRoutes.getAranceles()}`,
      transformResponse(value) {
        const response = value as Arancel[];
        return response;
      },
    }),
  }),
});

export const { useGetArancelesQuery } = ArancelService;
