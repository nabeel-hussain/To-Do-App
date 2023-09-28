import axios from 'axios';
import { toast } from 'react-toastify';

const httpClient = axios.create({
   baseURL :'https://localhost:7049',
   headers :{
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'x-api-key': "test",
      "Access-Control-Allow-Origin": "*"
   }
});

//All request will wait 2 seconds before timeout
httpClient.defaults.timeout = 2000;
httpClient.interceptors.response.use(
   (response) => {
     // Handle successful responses here
     return response;
   },
   (error) => {
     // Handle errors here
     debugger;
     if (error.response) {
       // HTTP response error
       const errorMessage = error.response.data.Errors ?error.response.data.Errors.join(", "):"An error has been occured"
       
       toast.error(errorMessage);
       // Render the ErrorMessage component to display the error message
     } else {
       // Network error
       // You can handle network errors differently
     }
     return Promise.reject(error);
   }
 );
export default httpClient;