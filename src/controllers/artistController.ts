import { Response } from "express";
import { ArtistService } from "../services/artistService";
import { ApiResponse } from "../utils/ApiResponse";
import { DEFAULT_LIMIT } from "../data/constant";
import { TUser, UserRequest } from "../types/types";
import { UserService } from "../services/userService";
import { hashPassword } from "../utils/hashPassword";

export class ArtistController {
  private artistService: ArtistService = new ArtistService();
  private userService: UserService = new UserService();

  async createArtist(req: UserRequest, res: Response): Promise<any> {
    const { password } = req.body;

    const artistExists = await this.userService.getUserByEmail(req.body.email);
    if (artistExists) {
      return ApiResponse.error(
        res,
        409,
        "Artist with that email already exist"
      );
    }

    const { first_release_year, no_of_albums_released, ...rest } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = await this.userService.createUser({
      ...rest,
      password: hashedPassword,
      created_by: req?.user?.id,
    });

    const artist = await this.artistService.createArtist({
      first_release_year,
      no_of_albums_released,
      user_id: user.id,
    });
    return ApiResponse.success(res, "Artist created successfully", artist, 201);
  }

  async getAllArtist(req: UserRequest, res: Response): Promise<any> {
    const artist = await this.artistService.getAllArtist(
      {
        limit: parseInt((req?.query?.limit as string) ?? DEFAULT_LIMIT),
        offset: parseInt((req?.query?.offset as string) ?? "0"),
      },
      req?.user as TUser
    );
    return ApiResponse.success(
      res,
      "Artists retrieved successfully",
      artist,
      200
    );
  }

  async getArtist(req: UserRequest, res: Response): Promise<any> {
    const manager_id = req.user!.id;

    // const isManagedBy = await this.userService.isManagedBy(
    //   manager_id,
    //   Number(req.params.id)
    // );

    // if (!isManagedBy) {
    //   return ApiResponse.error(res, 403, "Access denied");
    // }

    const artist = await this.artistService.getArtistById(Number(req.params.id));
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

  async updateArtist(req: UserRequest, res: Response): Promise<any> {
    const artist_id = req.params!.id;
    const manager_id = req.user!.id;
    if (!artist_id) {
      return ApiResponse.error(res, 400, "Artist id is required");
    }
    
    // console.log(artist_id, manager_id);
    // const isManagedBy = await this.userService.isManagedBy(
    //   manager_id,
    //   Number(req.params.id)
    // );
    // if (!isManagedBy) {
    //   return ApiResponse.error(res, 403, "Access denied");
    // }

    const artistExist = await this.artistService.getArtistById(Number(req.params.id));
    if (!artistExist) {
      return ApiResponse.error(res, 404, "Artist not found");
    }
    const {first_release_year, no_of_albums_released, user_id, ...rest} = req.body
    const updateArtistUser = await this.userService.updateUserById(req.body.user_id, rest);
    if(!updateArtistUser) {
      return ApiResponse.error(res, 404, "Unable to update artist");
    }
    const artist = await this.artistService.updateArtistById(
      Number(artist_id),
      {first_release_year, no_of_albums_released}
    );
    return ApiResponse.success(res, "Artist updated successfully", artist, 200);
  }

  async deleteArtist(req: UserRequest, res: Response): Promise<any> {
    const manager_id = req.user!.id;

    // const isManagedBy = await this.userService.isManagedBy(
    //   manager_id,
    //   Number(req.params.id)
    // );

    // if (!isManagedBy) {
    //   return ApiResponse.error(res, 403, "Access denied");
    // }
    const artistExist = await this.artistService.getArtistById(Number(req.params.id));
    if (!artistExist) {
      return ApiResponse.error(res, 404, "Artist not found");
    }

    const artist = await this.artistService.deleteArtistById(
      Number(req.params.id)
    );
    return ApiResponse.success(res, "Artist deleted successfully", artist, 200);
  }
}
