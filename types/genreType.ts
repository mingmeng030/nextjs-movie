import * as commonType from "../types/commonType";

export interface genreProps {
  genreMovieLists: {
    list: commonType.apiResult[];
    title: string;
  }[];
}
