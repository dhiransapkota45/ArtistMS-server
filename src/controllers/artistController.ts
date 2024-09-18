import { Request, Response } from "express";
import { ArtistService } from "../services/artistService";
import { ApiResponse } from "../utils/ApiResponse";
import { DEFAULT_LIMIT } from "../data/constant";

export class ArtistController {
  private artistService: ArtistService = new ArtistService();

  async createArtist(req: Request, res: Response): Promise<any> {
    const artist = await this.artistService.createArtist(req.body);
    return ApiResponse.success(res, "Artist created successfully", artist, 201);
  }

  async getAllArtist(req: Request, res: Response): Promise<any> {
    const artist = await this.artistService.getAllArtist({
      limit: parseInt((req?.query?.limit as string) ?? DEFAULT_LIMIT),
      offset: parseInt((req?.query?.offset as string) ?? "0"),
    });
    return ApiResponse.success(
      res,
      "Artists retrieved successfully",
      artist,
      200
    );
  }

  async getArtist(req: Request, res: Response): Promise<any> {
    const artist = await this.artistService.getArtistById(
      Number(req.params.id)
    );
    if (!artist) {
      return ApiResponse.error(res, 404, "Artist not found");
    }
    return ApiResponse.success(
      res,
      "Artist retrieved successfully",
      artist,
      200
    );
  }

  async updateArtist(req: Request, res: Response): Promise<any> {
    const artistExist = await this.artistService.getArtistById(
      Number(req.params.id)
    );
    if (!artistExist) {
      return ApiResponse.error(res, 404, "Artist not found");
    }

    const artist = await this.artistService.updateArtistById(
      Number(req.params.id),
      req.body
    );
    return ApiResponse.success(res, "Artist updated successfully", artist, 200);
  }

  async deleteArtist(req: Request, res: Response): Promise<any> {
    const artistExist = await this.artistService.getArtistById(
      Number(req.params.id)
    );
    if (!artistExist) {
      return ApiResponse.error(res, 404, "Artist not found");
    }

    const artist = await this.artistService.deleteArtistById(
      Number(req.params.id)
    );
    return ApiResponse.success(res, "Artist deleted successfully", artist, 200);
  }
}
