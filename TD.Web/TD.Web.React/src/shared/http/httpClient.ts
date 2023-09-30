import axios from 'axios';
import { toast } from 'react-toastify';


const baseURL = import.meta.env.VITE_API_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;
const httpClient = axios.create({
   baseURL : baseURL,
   headers :{
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'x-api-key': apiKey,
      "Access-Control-Allow-Origin": "*"
   }
});

// All request will wait 2 seconds before timeout
httpClient.defaults.timeout = 2000;
httpClient.interceptors.response.use(
   (response) => {
     // Handle successful responses here
     return response;
   },
   async (error) => {
     // Handle errors here
     if (error.response!==null && error.response!==undefined) {
       // HTTP response error
       const errorMessage = error.response.data.Errors!==null ?error.response.data.Errors.join(", "):"An error has been occured"
       
       toast.error(errorMessage);
       // Render the ErrorMessage component to display the error message
     } else {
       // Network error
       // You can handle network errors differently
     }
     return await Promise.reject(error);
   }
 );
export default httpClient;