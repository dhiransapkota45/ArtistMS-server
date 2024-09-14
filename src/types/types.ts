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

export type TArtistPayload = {
    name : string;
    dob : Date;
    gender : "m" | "f" | "o";
    address : string;
    first_release_year : number;
}

export type TArtist = {
    id: number;
    created_at: Date;
    updated_at: Date;
} & TArtistPayload;

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