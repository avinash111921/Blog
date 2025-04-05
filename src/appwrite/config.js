import conf from '../conf/conf.js'
import { Client,Databases,Storage ,Query,ID } from 'appwrite'

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client); 
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
                conf.appWriteDataBaseId,
                conf.appWriteCollectionId,
                slug, /* as a id  */
                {
                title,
                content,
                featuredImage,
                status,
                userId
            });   
        } catch (error) {
            throw error;
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                conf.appWriteDataBaseId, /* Database ID */
                conf.appWriteCollectionId, /* Collection ID */
                slug, /* Document ID */
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )           
        } catch (error) {
            throw error;
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appWriteDataBaseId,
                conf.appWriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appWriteDataBaseId,
                conf.appWriteCollectionId,
                slug
            )
        } catch (error) {
            console.log(error)
            return false;
        }
    }

    async getPosts(quries = [Query.equal("status","active")]){
        try{
            return await this.databases.listDocuments(
                conf.appWriteDataBaseId,
                conf.appWriteCollectionId,
                quries, /* we can direct write quries here */
            )
        }
        catch(error){
            console.log(error);
            return false;
        }
    }

    /* FILE upload service */

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appWriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    /* Delete File */

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appWriteBucketId,    
                fileId
            )
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    // getFilePreview(fileId){ /* response bahot fast hai is leya async nhi use kar rahe hai  */
    //     try{
    //         return this.bucket.getFilePreview(
    //             conf.appWriteBucketId,
    //             fileId
    //         )
    //     }
    //     catch(error){
    //         throw error;
    //     }
    // }
    getImageUrl = (fileId) => {
        try {
          // Try using getFileView instead of getFilePreview
          return this.bucket.getFileView(
            conf.appWriteBucketId,
            fileId
          )
        } catch(e) {
          console.error("Error fetching image:", e)
          return "" // Return empty string if image can't be loaded
        }
    }
}
const service = new Service();
export default service