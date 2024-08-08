import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  // create account

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        await this.login({ email, password });
        return this.getCurrentUser();
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  // login

  async login({ email, password }) {
    try {
      await this.account.createEmailPasswordSession(email, password);
      return this.getCurrentUser();
    } catch (error) {
      throw error;
    }
  }

  // get current user

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log(
        "Appwrite Service Error: Could not get current user. ",
        error
      );
      return null;
    }
  }

  // logout

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService();

export { authService };
