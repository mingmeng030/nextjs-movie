import * as commonType from "../types/commonType";

export interface homeProps {
  popularResults: commonType.apiResult[];
  topRatedResults: commonType.apiResult[];
  upcomingResults: commonType.apiResult[];
}

export interface genreProps {
  genreLists: {
    list: commonType.apiResult[];
    title: string;
  }[];
}
