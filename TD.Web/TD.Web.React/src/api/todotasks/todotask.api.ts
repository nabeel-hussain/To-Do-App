import {
    PostService as IPostService,
   GetAllPostsResponse,
 } from 'api/todotasks/todotask.model';
 
 import httpClient from 'shared/http/httpClient';
 
 const PostService = (): IPostService => {
    return {
       getAllPosts: (): HttpPromise<GetAllPostsResponse> => {
          return httpClient.get('/posts');
       },
    };
 };
 
 export default PostService();
