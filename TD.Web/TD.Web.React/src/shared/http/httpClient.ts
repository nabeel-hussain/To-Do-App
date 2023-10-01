import axios from 'axios';
import { toast } from 'react-toastify';

const baseURL = import.meta.env.VITE_API_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;
const httpClient = axios.create({
   baseURL,
   headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'x-api-key': apiKey,
      'Access-Control-Allow-Origin': '*',
   },
});

// Handling Global API Calls error here.
// Axios interceptor allows to act like a middleware and hanlde appropriate response and errors.
httpClient.interceptors.response.use(
   (response) => {
      return response;
   },
   async (error) => {
      if (error.response !== null && error.response !== undefined) {
         const errorMessage =
            error.response.data.Errors !== null
               ? error.response.data.Errors.join(', ')
               : 'An error has been occured';

         toast.error(errorMessage);
      } else {
         // Network error
         // You can handle network errors differently
      }
      return await Promise.reject(error);
   },
);
export default httpClient;
