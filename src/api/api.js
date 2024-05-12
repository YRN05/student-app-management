import { baseApi } from "../config/api-service";

export const api = {
    getBiodata: () => {
        return baseApi.get(`/biodatas`);
      },
}