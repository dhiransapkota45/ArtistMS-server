import { Tables } from "../data/constant";
import { pool } from "../database";
import { TPartialUserPayload, TUser, TUserPayload } from "../types/types";

export class UserService {
  public async createUser(user: TUserPayload): Promise<TUser> {
    const { first_name, last_name, email, password, phone, gender, dob, address, role } = user;
    const query = `
      INSERT INTO public."${Tables.USER}" (first_name, last_name, email, password, phone, gender, dob, address, role)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id, first_name, last_name, email, role;
    `;
    const values = [first_name, last_name, email, password, phone, gender, dob, address, role];
    const result = await pool.query(query, values);
    return result.rows[0] as TUser; 
  }

  public async getUserByEmail(email: string): Promise<TUser> {
    const query = `
      SELECT id, first_name, last_name, email, role, password
      FROM public."${Tables.USER}"
      WHERE email = $1;
    `;
    const values = [email];
    const result = await pool.query(query, values);
    return result.rows[0] as TUser;
  }

  public async getUserById(id: number): Promise<TUser> {
    const query = `
      SELECT id, first_name, last_name, email, role
      FROM public."${Tables.USER}"
      WHERE id = $1;
    `;
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0] as TUser;
  }

  public async updateUserById(id: number, user: TPartialUserPayload): Promise<TUser> {
    let statment = '';
    let values: (string | number | boolean | null)[] = [];
    let lastElement = 0;
    Object.keys(user).forEach((key) => {
      statment += `${key} = $${++lastElement}, `;
      values.push((user as any)[key]);
    })
    const query = `
      UPDATE public."${Tables.USER}"
      SET ${statment.slice(0, -2)}
      WHERE id = $${++lastElement}
      RETURNING id, first_name, last_name, email, role;
    `;
    const result = await pool.query(query, [...values, id]);
    return result.rows[0] as TUser;
  }

  public async deleteUserById(id: number): Promise<TUser> {
    const query = `
      DELETE FROM public."${Tables.USER}"
      WHERE id = $1
      RETURNING id, first_name, last_name, email, role;
    `;
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0] as TUser;
  }

  public async getAllUser(): Promise<TUser[]> {
    const query = `
      SELECT id, first_name, last_name, email, role
      FROM public."${Tables.USER}";
    `;
    const result = await pool.query(query);
    return result.rows as TUser[];
  }

}
