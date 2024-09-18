import { Tables } from "../data/constant";
import { pool } from "../database";
import {
  ListResponse,
  Pagination,
  TPartialUserPayload,
  TUser,
  TUserPayload,
} from "../types/types";

export class UserService {
  public async createUser(user: TUserPayload): Promise<TUser> {
    const {
      first_name,
      last_name,
      email,
      password,
      phone,
      gender,
      dob,
      address,
      role,
    } = user;
    const query = `
      INSERT INTO public."${Tables.USER}" (first_name, last_name, email, password, phone, gender, dob, address, role)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id, first_name, last_name, email, role;
    `;
    const values = [
      first_name,
      last_name,
      email,
      password,
      phone,
      gender,
      dob,
      address,
      role,
    ];
    const result = await pool.query(query, values);
    return result.rows[0] as TUser;
  }

  public async getUserByEmail(email: string): Promise<TUser> {
    const query = `
      SELECT id, first_name, last_name, email, phone, dob, gender, address, role, password
      FROM public."${Tables.USER}"
      WHERE email = $1;
    `;
    const values = [email];
    const result = await pool.query(query, values);
    return result.rows[0] as TUser;
  }

  public async getUserById(id: number): Promise<TUser> {
    const query = `
      SELECT id, first_name, last_name, email, phone, dob, gender, address, role, role
      FROM public."${Tables.USER}"
      WHERE id = $1;
    `;
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0] as TUser;
  }

  public async updateUserById(
    id: number,
    user: TPartialUserPayload
  ): Promise<TUser> {
    let statment = "";
    let values: (string | number | boolean | null)[] = [];
    let lastElement = 0;
    Object.keys(user).forEach((key) => {
      statment += `${key} = $${++lastElement}, `;
      values.push((user as any)[key]);
    });
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

  public async getAllUser({
    limit,
    offset,
  }: Pagination): Promise<ListResponse<TUser>> {
    const query = `
      SELECT id, first_name, last_name, email, phone, dob, gender, address, role
      FROM public."${Tables.USER}"
      LIMIT $1 OFFSET $2;
    `;
    const result = await pool.query(query, [limit, offset]);

    const countQuery = `
    SELECT COUNT(*) FROM public."${Tables.USER}";
  `;

    const countResult = await pool.query(countQuery);

    const total = parseInt(countResult.rows[0].count, 10);

    const isNext = offset + limit < total;
    return { data: result.rows as TUser[], isNext, total };
  }
}
