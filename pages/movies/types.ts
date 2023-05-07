import * as commonType from "../../types/commonType";

export interface movieDetailProps {
  query: {
    title: string;
    id: number;
    imgPath: string;
    content: string;
  };
  videoResults: {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
  }[];
  similarResults: commonType.apiResult[];
}
