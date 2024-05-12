import { useCallback } from "react";
import { useState } from "react";
import { message } from "antd";
import { api } from "../../../api/api";


// untuk ambil semua data dari biodata
export const useGetBiodata = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();
  
    const getData = useCallback(async () => {
      try {
        const res = await api.getBiodata();
        setData(res?.data);
      } catch (err) {
        message.open({
          type: "error",
          content: `${err?.message}`,
        });
      } finally {
        setIsLoading(false);
      }
    }, []);
  
    return [isLoading, data, getData];
  };