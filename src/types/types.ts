export type TUser = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: number;
    dob : Date;
    gender : "m" | "f" | "o";
    address : string;
    role : "super_admin" | "artist_manager" | "artist";
    created_at: Date;
    updated_at: Date;
}

export type TArtist = {
    id: number;
    name : string;
    dob : Date;
    gender : "m" | "f" | "o";
    address : string;
    first_release_year : number;
    created_at: Date;
    updated_at: Date;
}

export type TMusic = {
    id: number;
    artist_id : number;
    title : string;
    album_name : number;
    genre : "rnb" | "country" | "classic" | "rock" | "jazz";
    created_at: Date;
    updated_at: Date;
}