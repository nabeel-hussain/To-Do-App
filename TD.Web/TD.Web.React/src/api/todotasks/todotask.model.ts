export interface Post {
    title: string;
    content: string;
    author: string;
 }
 
 export interface GetAllPostsResponse {
    posts: Post[];
 }
 
 export interface PostService {
    getAllPosts: () => HttpPromise<GetAllPostsResponse>;
 }