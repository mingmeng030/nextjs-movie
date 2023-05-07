import * as commonType from "../types/commonType";

export interface MovieSwiperProps {
  dataList: commonType.apiResult[];
  title: string;
  spaceBetween: number;
  slidesPerView: number;
}

export interface SeoProps {
  title: string;
}
