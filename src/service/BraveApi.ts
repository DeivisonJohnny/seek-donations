import axios from "axios";

export type SearchBraveResponse = {
  data: {
    query: {
      original: string;
      show_strict_warning: boolean;
      is_navigational: boolean;
      is_news_breaking: boolean;
      spellcheck_off: boolean;
      country: string;
      bad_results: boolean;
      should_fallback: boolean;
      postal_code: string;
      city: string;
      header_country: string;
      more_results_available: boolean;
      state: string;
    };
    mixed: {
      type: string;
      main: Array<{
        type: string;
        index?: number;
        all: boolean;
      }>;
      top: any[]; // Ajuste conforme estrutura real
      side: any[]; // Ajuste conforme estrutura real
    };
    type: string;
    videos: {
      type: string;
      mutated_by_goggles: boolean;
      results: VideoResult[];
    };
    web: {
      type: string;
      results: WebResult[];
    };
  };
};

type VideoResult = {
  type: string;
  url: string;
  title: string;
  description: string;
  age: string;
  page_age: string;
  video: {
    duration: string;
    views?: number;
    creator: string;
    publisher: string;
  };
  meta_url: MetaUrl;
  thumbnail: Thumbnail;
};

type WebResult = {
  title: string;
  url: string;
  is_source_local: boolean;
  is_source_both: boolean;
  description: string;
  page_age: string;
  profile: {
    name: string;
    url: string;
    long_name: string;
    img: string;
  };
  language: string;
  family_friendly: boolean;
  type: string;
  subtype: string;
  is_live: boolean;
  meta_url: MetaUrl;
  thumbnail: Thumbnail & { logo: boolean };
  age: string;
};

type MetaUrl = {
  scheme: string;
  netloc: string;
  hostname: string;
  favicon: string;
  path: string;
};

type Thumbnail = {
  src: string;
  original: string;
};

const BraveApi = axios.create({
  baseURL: "https://api.search.brave.com/res/v1/",
  headers: {
    Accept: "application/json",
    "Accept-Encoding": "gzip",
    "X-Subscription-Token": process.env.API_BRAVE_KEY || "",
  },
  params: {
    country: "BR",
    search_lang: "pt-br",
  },
});

export default BraveApi;
