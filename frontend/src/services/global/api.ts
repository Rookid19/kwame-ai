import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

export const api = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? 'https://notesapp.caldarmallafrica.org' : 'http://localhost:8000',

});

export const fetcher = <Data>(
  url: string,
  method: AxiosRequestConfig['method'] = 'GET',
  payload?: any,
  openModal?: any,
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
          openModal({ title: "Error", message: error.response.data.message })
        } else {
          openModal({ title: "Error", message: error.message })
        }
        reject(error);
      })
  });
};
