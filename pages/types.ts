import * as commonType from "../types/commonType";

export interface homeProps {
  popularResults: commonType.apiResult[];
  topRatedResults: commonType.apiResult[];
  upcomingResults: commonType.apiResult[];
}

export interface genreProps {
  genreMovieLists: {
    list: commonType.apiResult[];
    title: string;
  }[];
}
