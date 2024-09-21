import { Tables, UserRoles } from "../data/constant";
import { pool } from "../database";
import {
  ListResponse,
  Pagination,
  TArtist,
  TArtistOnlyPayload,
  TArtistPayload,
  TUser,
  UserRoles as TUserRoles,
} from "../types/types";

export class ArtistService {
  public async createArtist(
    artist: TArtistOnlyPayload & { user_id: number }
  ): Promise<TArtist> {
    const { first_release_year, no_of_albums_released } = artist;

    const query = `
            INSERT INTO public."${Tables.ARTIST}" (first_release_year, no_of_albums_released, user_id)
            VALUES ($1, $2, $3)
            RETURNING id;
        `;
    const values = [first_release_year, no_of_albums_released, artist.user_id];

    const result = await pool.query(query, values);
    return result.rows[0] as TArtist;
  }

  public async getArtistById(id: number): Promise<TArtist> {
    const query = `
            SELECT id
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
            RETURNING id;
        `;
    const result = await pool.query(query, [...values, id]);
    return result.rows[0] as TArtist;
  }

  public async deleteArtistById(id: number): Promise<TArtist> {
    const query = `
                DELETE FROM public."${Tables.ARTIST}"
                WHERE id = $1
                RETURNING id;
            `;
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0] as TArtist;
  }

  public async getAllArtist(
    { limit, offset }: Pagination,
    user: TUser
  ): Promise<ListResponse<TArtist>> {
    let query = ``;
    let total = null;
    if (user.role === UserRoles.ARTIST_MANAGER) {
      query = `SELECT u.id AS user_id, u.first_name, u.last_name, u.email, u.phone, u.dob, u.gender, u.created_by, u.address, u.role, a.first_release_year, a.no_of_albums_released, a.id
              FROM public."User" u
              JOIN public."Artist" a ON a.user_id=u.id
              WHERE u.created_by = $1
              LIMIT $2 OFFSET $3;`;
      total = await pool.query(
        `SELECT COUNT(*) FROM public."User" WHERE created_by=$1`,
        [user.id]
      );
    }

    if (user.role === UserRoles.SUPER_ADMIN) {
      query = `SELECT u.id AS user_id, u.first_name, u.last_name, u.email, u.phone, u.dob, u.gender, u.created_by, u.address, u.role, a.first_release_year, a.no_of_albums_released, a.id
                    FROM "User" u
                    JOIN "Artist" a ON u.id = a.user_id
                    WHERE u.role = 'artist'
                      AND u.created_by IN (
                        SELECT id FROM "User"
                        WHERE role = 'artist_manager'
                          AND created_by = $1
                 )
                  LIMIT $2 OFFSET $3;
                `;
      total = await pool.query(
        `
        SELECT COUNT(*) FROM public."User"
        WHERE role = 'artist'
          AND created_by IN (
            SELECT id FROM public."User"
            WHERE role = 'artist_manager'
              AND created_by = $1
          )`,
        [user.id]
      );
    }

    const result = await pool.query(query, [user.id, limit, offset]);

    // const query = `
    //             SELECT id, name, dob, address, first_release_year, gender, no_of_albums_released
    //             FROM public."${Tables.ARTIST}"
    //             WHERE manager_id = $1
    //             LIMIT $2 OFFSET $3;
    //         `;
    // const result = await pool.query(query, [manager_id, limit, offset]);

    // const total = await pool.query(
    //   `SELECT COUNT(*) FROM public."${Tables.ARTIST}" WHERE manager_id = $1`,
    //   [manager_id]
    // );
 
    return {
      data: result.rows,
      total: total?.rows[0].count,
      isNext: offset + limit < Number(total?.rows[0].count),
    };
  }
}
