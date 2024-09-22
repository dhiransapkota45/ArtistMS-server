import { Request, Response } from "express";
import { MusicService } from "../services/musicService";
import { ApiResponse } from "../utils/ApiResponse";
import { DEFAULT_LIMIT } from "../data/constant";
import { UserRequest } from "../types/types";

export class MusicController {
  private musicService: MusicService = new MusicService();
  
  public async createMusic(req: Request, res: Response) {
    const music = await this.musicService.createMusic(req.body);
    return ApiResponse.success(res, "Music created successfully", music, 201);
  }

  public async getMusic(req: Request, res: Response) {
    const music = await this.musicService.getMusicById(Number(req.params.id));
    if (!music) {
      return ApiResponse.error(res, 404, "Music not found");
    }
    return ApiResponse.success(res, "Music retrieved successfully", music, 200);
  }

  public async updateMusic(req: Request, res: Response) {
    const musicExist = await this.musicService.getMusicById(
      Number(req.params.id)
    );
    if (!musicExist) {
      return ApiResponse.error(res, 404, "Music not found");
    }

    const music = await this.musicService.updateMusicById(
      Number(req.params.id),
      req.body
    );
    return ApiResponse.success(res, "Music updated successfully", music, 200);
  }

  public async deleteMusic(req: Request, res: Response) {
    const musicExist = await this.musicService.getMusicById(
      Number(req.params.id)
    );
    if (!musicExist) {
      return ApiResponse.error(res, 404, "Music not found");
    }

    const music = await this.musicService.deleteMusicById(
      Number(req.params.id)
    );
    return ApiResponse.success(res, "Music deleted successfully", music, 200);
  }

  public async getAllMusic(req: Request, res: Response) {
    const music = await this.musicService.getAllMusic({
      limit: Number(req.query.limit ?? DEFAULT_LIMIT),
      offset: Number(req.query.offset),
    });
    return ApiResponse.success(res, "Music retrieved successfully", music, 200);
  }

  public async getMusicByArtistId(req: Request, res: Response) {
    const music = await this.musicService.getMusicByArtistId({
      limit: Number(req.query.limit ?? DEFAULT_LIMIT),
      offset: Number(req.query.offset),
      artist_id: Number(req.params.artist_id),
    });
    return ApiResponse.success(res, "Music retrieved successfully", music, 200);
  }

  public async bulkCreateMusic(req: UserRequest, res: Response) {
    console.log(req.body, "req.body");
    const music = await this.musicService.bulkCreateMusic(req.body, Number(req?.user?.id));
    return ApiResponse.success(res, "Music created successfully", music, 201);
  }
}
