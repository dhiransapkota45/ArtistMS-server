import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export type TUserPayload = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: number;
    dob : Date;
    gender : "m" | "f" | "o";
    address : string;
    role : "super_admin" | "artist_manager" | "artist";
}

export type TPartialUserPayload = Partial<TUserPayload>;

export type TUser = {
    id: number;
    created_at: Date;
    updated_at: Date;
} & TUserPayload;

export type TMusicPayload = {
    artist_id : number;
    title : string;
    album_name : string;
    genre : "rnb" | "country" | "classic" | "rock" | "jazz";
}

export type TMusic = {
    id: number;
    created_at: Date;
    updated_at: Date;
} & TMusicPayload;


export type CustomRequest<T> = Request & T

export type UserRequest = CustomRequest<{ user?: TUser }>;

export type TArtistOnlyPayload = {
    first_release_year : number;
    no_of_albums_released ?: number;
}

export type TArtistPayload = TUser  & TArtistOnlyPayload;

export type TArtist = {
    id: number;
    created_at: Date;
    updated_at: Date;
} & TArtistPayload;


export type Pagination = {
    limit: number;
    offset: number;
}

export type ListResponse<T> = {
    data: T[];
    total: number;
    isNext: boolean;
}

export type UserRoles = "super_admin" | "artist_manager" | "artist";