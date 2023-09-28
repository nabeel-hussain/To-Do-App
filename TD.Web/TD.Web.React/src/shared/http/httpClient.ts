import axios from 'axios';

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

export default httpClient;