import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';

export const api = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? 'https://notesapp.caldarmallafrica.org/api/v1/notes' : 'http://localhost:8000/api/v1/notes',

});

export const fetcher = <Data>(
  url: string,
  method: AxiosRequestConfig['method'] = 'GET',
  payload?: any,
): Promise<AxiosResponse<Data>> => {
  return new Promise<AxiosResponse<Data>>((resolve, reject) => {
    const config: AxiosRequestConfig = {
      url,
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (payload) {
      config.data = payload;
    }

    api
      .request<Data>(config)
      .then((response: AxiosResponse<Data>) => {
        resolve(response);
      })
      .catch((error) => {
        console.log("roo", error.message)
        if (error.response) {

          let errorResponse = error.response.data;

          console.log("xxx", errorResponse)

          // errors from express-validator
          if (errorResponse.type === "validation") {
            errorResponse.error.forEach((err: any) => {
              toast.error(err.msg, {
                position: 'top-center',
              });
            })
            return;
          }

          toast.error(errorResponse.error.message, {
            position: 'top-center',
          });
        }
        // else {
        //   openModal({ title: "Error", message: error.message })
        // }
        reject(error);
      })
  });
};
