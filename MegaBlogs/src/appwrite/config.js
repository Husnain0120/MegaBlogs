import conf from "../conf.js";
import { Client,ID , Databases, Storage, Query } from "appwrite";

export class Service {
    Client=new Client();
    Databases;
    bucket;

    constructor(){
        this.Client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf. appwriteProjectId);
        this.Databases= new Databases (this.Client);
        this.bucket=new Storage(this.Client);  
    }

    async createPost({tittle, slug, content, featuredImage, status, userId}){
        try {
            return await this.Databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    tittle,
                    content,
                    featuredImage,
                    status,
                    userId,

                }
            )
        } catch (error) {
            throw error
        }
    }
   
    async updatePost(slug, {tittle,  content, featuredImage, status}){
            try {
                return await this.Databases.updateDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    slug,
                    {
                        tittle,
                        status,
                        content,
                        featuredImage,

                    }
                )
            } catch (error) {
                throw error
            }
    }

    async deletePost(slug){
        try {
             await this.Databases.deleteDocument(
               conf.appwriteDatabaseId,
               conf.appwriteCollectionId,
               slug,
            )

            return true;

        } catch (error) {
            console.log("deletePost error",error);
            return false;
        }
    }

    async getPost(slug){
        try {
            return  await this.Databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
             )
        } catch (error) {
            console.log("appwrite error",error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status","active")] ){
            try {
                return await this.Databases.listDocuments(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                   queries,
                   
                )
            } catch (error) {
              console.log("appwrite getPosts error",error);
              return false
            }
    }

    /// file upload services

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log("appwrite upload services error",error);
            return false
        }
    }
  
     async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId,
            )
            return true
        } catch (error) {
            console.log("appwrite deleteFile error",error);
            return false
        }
     }
   
     getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId,
        )
     }
     

}


const service= new Service()
export default service