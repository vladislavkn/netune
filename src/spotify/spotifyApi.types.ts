export interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

export interface Artist {
  external_urls: {
    spotify: string;
  };
  followers: {
    total: number;
  };
  genres: string[];
  id: string;
  images: SpotifyImage[];
  name: string;
}

export interface Track {
  album: { images: SpotifyImage[] };
  artists: {
    external_urls: {
      spotify: string;
    };
    id: string;
    name: string;
  }[];
  external_urls: {
    spotify: string;
  };
  id: string;
  name: string;
}

export interface User {
  display_name: string;
  images: SpotifyImage[];
}
