export interface Artist {
  external_urls: {
    spotify: string;
  };
  followers: {
    total: number;
  };
  genres: string[];
  id: string;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  name: string;
}

export interface Track {
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
