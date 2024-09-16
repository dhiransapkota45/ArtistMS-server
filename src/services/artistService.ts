import { Tables } from "../data/constant";
import { pool } from "../database";
import { TArtist, TArtistPayload } from "../types/types";

export class ArtistService {
  public async createArtist(artist: TArtistPayload): Promise<TArtist> {
    const {
      name,
      dob,
      address,
      first_release_year,
      gender,
      no_of_albums_released,
    } = artist;

    const query = `
            INSERT INTO public."${Tables.ARTIST}" (name, dob, address, first_release_year, gender, no_of_albums_released)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, name, dob, address, first_release_year, gender, no_of_albums_released;
        `;
    const values = [
      name,
      dob,
      address,
      first_release_year,
      gender,
      no_of_albums_released,
    ];

    const result = await pool.query(query, values);
    return result.rows[0] as TArtist;
  }

  public async getArtistById(id: number): Promise<TArtist> {
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
    console.log("reached here");
    const query = `
                DELETE FROM public."${Tables.ARTIST}"
                WHERE id = $1
                RETURNING id, name, dob, address, first_relase_year, gender, no_of_albums_released;
            `;
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0] as TArtist;
  }

  public async getAllArtist(): Promise<TArtist[]> {
    const query = `
                SELECT id, name, dob, address, first_release_year, gender, no_of_albums_released
                FROM public."${Tables.ARTIST}";
            `;
    const result = await pool.query(query);
    return result.rows as TArtist[];
  }
}
