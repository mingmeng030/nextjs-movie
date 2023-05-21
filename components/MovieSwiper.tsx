import Link from "next/link";
import { useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Scrollbar } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

import { config } from "../static/config";
import * as type from "./types";
import styles from "./styles/MovieSwiper.module.css";

export default function MovieSwiper({
  dataList,
  title,
  spaceBetween,
  slidesPerView,
}: type.MovieSwiperProps) {
  SwiperCore.use([Navigation]);
  const swiperRef = useRef<SwiperCore>();

  return (
    <div className="py-[20px] w-[70vw] margincenter">
      <h1 className="text-[20px]">{title}</h1>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation, Scrollbar]}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        loop={true}
        autoplay={false}
        navigation
        scrollbar={{ draggable: true }}
      >
        {dataList?.map((item) => {
          return (
            <SwiperSlide>
              <Link
                href={{
                  pathname: `/movies/${item.title
                    .replace(config.regex, "+")
                    .replace(/-$/, "")}/${item.id}`,
                  query: {
                    title: item.title,
                    id: item.id,
                    imgPath: item.poster_path,
                    content: item.overview,
                  },
                }}
                key={item.id}
              >
                <img
                  src={`${config.imgUrl}${item.poster_path}`}
                  className={`${styles.poster}`}
                  placeholder="no image"
                />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
