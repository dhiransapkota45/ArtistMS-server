import { Tables } from "../data/constant";
import { pool } from "../database";
import {
  ListResponse,
  Pagination,
  TArtist,
  TArtistPayload,
} from "../types/types";

export class ArtistService {
  public async createArtist(artist: TArtistPayload, manager_id: number): Promise<TArtist> {
    const {
      name,
      dob,
      address,
      first_release_year,
      gender,
      no_of_albums_released,
    } = artist;

    const query = `
            INSERT INTO public."${Tables.ARTIST}" (first_release_year, no_of_albums_released, user_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id, name, dob, address, first_release_year, gender, no_of_albums_released, user_id;
        `;
    const values = [
      name,
      dob,
      address,
      first_release_year,
      gender,
      no_of_albums_released,
      manager_id
    ];

    const result = await pool.query(query, values);
    return result.rows[0] as TArtist;
  }

  public async isManagedBy(manager_id: number, artist_id: number): Promise<boolean> {

    const total = await pool.query(
      `SELECT COUNT(id) FROM public."${Tables.ARTIST}" WHERE id = $1 AND manager_id = $2`,
      [artist_id, manager_id]
    );

    return total.rows[0].count > 0;
  }

  public async getArtistById(id: number, manager_id: number): Promise<TArtist> {
    const query = `
            SELECT id, name, dob, address, first_release_year, gender, no_of_albums_released
            FROM public."${Tables.ARTIST}"
            WHERE id = $1;
        `;
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0] as TArtist;
  }

  public async updateArtistById(
    id: number,
    artist: Partial<TArtistPayload>
  ): Promise<TArtist> {
    let statment = "";
    let values: (string | number | boolean | null)[] = [];
    let lastElement = 0;
    Object.keys(artist).forEach((key) => {
      statment += `${key} = $${++lastElement}, `;
      values.push((artist as any)[key]);
    });
    const query = `
            UPDATE public."${Tables.ARTIST}"
            SET ${statment.slice(0, -2)}
            WHERE id = $${++lastElement}
            RETURNING id, name, dob, address, first_release_year, gender, no_of_albums_released;
        `;
    const result = await pool.query(query, [...values, id]);
    return result.rows[0] as TArtist;
  }

  public async deleteArtistById(id: number): Promise<TArtist> {
    const query = `
                DELETE FROM public."${Tables.ARTIST}"
                WHERE id = $1
                RETURNING id, name, dob, address, first_relase_year, gender, no_of_albums_released;
            `;
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0] as TArtist;
  }

  public async getAllArtist({
    limit,
    offset,
  }: Pagination, manager_id: number): Promise<ListResponse<TArtist>> {
    const query = `
                SELECT id, name, dob, address, first_release_year, gender, no_of_albums_released
                FROM public."${Tables.ARTIST}"
                WHERE manager_id = $1
                LIMIT $2 OFFSET $3;
            `;
    const result = await pool.query(query, [manager_id, limit, offset]);

    const total = await pool.query(
      `SELECT COUNT(*) FROM public."${Tables.ARTIST}" WHERE manager_id = $1`,
      [manager_id]
    );
    return {
      data: result.rows,
      total: total.rows[0].count,
      isNext: offset + limit < Number(total.rows[0].count),
    };
  }
}
