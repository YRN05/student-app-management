import React from 'react'
import { useCallback } from 'react';
import { useState } from 'react';
import { api } from '../../../api/api';
import { message } from 'antd';

export const useGetDetailBiodata = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();
  
    const getDetailData = useCallback(async (id) => {
      try {
        const res = await api.getStudentById(id);
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
  
    return [isLoading, data, getDetailData];
  };