import conf from "../conf/conf";
import { Client,Account,ID } from "appwrite";
export class AuthService {
    Client =new Client();
    account;

    constructor(){
        this.Client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf. appwriteProjectId);
        this.account =new Account(this.Client)
    }

    async createAccount({email,password ,name}){
        try{
         const userAccount=   await this.account.create(ID.unique(),email,password,
                name);
                if (userAccount) {
                    //call another
                    return this.login({email,password});
                }else{
                    return userAccount;
                }
        }catch(error){
            throw error;
        }
    }
    async  login ({email,password}){
    try{
        return await this.account.createEmailSession(email,
            password);
    }catch(error){
        throw error;
    }
    }

    async getCurrentUser(){
        try {
           return await this.account.get();
        } catch (error) {
            console.log("Appwrite services :: get Current User :: ",error);
        }
        return  null ;
    }
    async Logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error
        }
    }
}
const authService = new AuthService();
export default authService


