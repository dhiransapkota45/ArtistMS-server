import { Pool } from "pg";
import { pool } from "../database";
import { TUser, TUserPayload } from "../types/types";

export class UserService {
  public async createUser(user: TUserPayload): Promise<TUser> {
    return ({first_name : "nepal"}) as TUser;
  }
}
