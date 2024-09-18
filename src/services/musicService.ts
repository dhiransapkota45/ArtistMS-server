import { Tables } from "../data/constant";
import { pool } from "../database";
import {
  ListResponse,
  Pagination,
  TMusic,
  TMusicPayload,
} from "../types/types";

export class MusicService {
  public async createMusic(music: TMusicPayload): Promise<TMusic> {
    const { title, genre, artist_id, album_name } = music;

    const query = `
                INSERT INTO public."${Tables.MUSIC}" (title, genre, artist_id, album_name)
                VALUES ($1, $2, $3, $4)
                RETURNING id, title, genre, artist_id, album_name;
            `;
    const values = [title, genre, artist_id, album_name];

    const result = await pool.query(query, values);
    return result.rows[0] as TMusic;
  }

  public async getMusicById(id: number): Promise<TMusic> {
    const query = `
                SELECT *
                FROM public."${Tables.MUSIC}"
                WHERE id = $1;
            `;
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0] as TMusic;
  }

  public async updateMusicById(
    id: number,
    music: Partial<TMusicPayload>
  ): Promise<TMusic> {
    let statment = "";
    let values: (string | number | boolean | null)[] = [];
    let lastElement = 0;
    Object.keys(music).forEach((key) => {
      statment += `${key} = $${++lastElement}, `;
      values.push((music as any)[key]);
    });
    const query = `
                UPDATE public."${Tables.MUSIC}"
                SET ${statment.slice(0, -2)}
                WHERE id = $${++lastElement}
                RETURNING *;
            `;
    const result = await pool.query(query, [...values, id]);
    return result.rows[0] as TMusic;
  }

  public async deleteMusicById(id: number): Promise<TMusic> {
    const query = `
                    DELETE FROM public."${Tables.MUSIC}"
                    WHERE id = $1
                    RETURNING *;
                `;
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0] as TMusic;
  }

  public async getAllMusic({
    limit,
    offset,
  }: Pagination): Promise<ListResponse<TMusic>> {
    const query = `
                    SELECT 
                      m.*, 
                      a.name as artist_name
                      FROM public."${Tables.MUSIC}" m
                      JOIN public."${Tables.ARTIST}" a
                      ON m.artist_id = a.id
                      LIMIT $1 OFFSET $2;
                `;
    const result = await pool.query(query, [limit, offset]);

    const total = await pool.query(
      `SELECT COUNT(*) FROM public."${Tables.MUSIC}"`
    );

    return {
      data: result.rows as TMusic[],
      total: total.rows[0].count,
      isNext: offset + limit < Number(total.rows[0].count),
    };
  }

  public async getMusicByArtistId(artist_id: number): Promise<TMusic[]> {
    const query = `
                        SELECT 
                        m.*
                        a.name as artist_name
                        FROM public."${Tables.MUSIC}" m
                        JOIN public."${Tables.ARTIST}" a
                        WHERE m.artist_id = $1;
                    `;
    const values = [artist_id];
    const result = await pool.query(query, values);
    return result.rows as TMusic[];
  }
}
