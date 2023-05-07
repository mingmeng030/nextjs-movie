import * as commonType from "../../types/commonType";

export interface searchResultProps {
  results: commonType.apiResult[];
  total_results: number;
  keyword: string;
}
