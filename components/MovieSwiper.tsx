import Link from "next/link";
import { useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import * as type from "./types";
import styles from "./styles/MovieSwiper.module.css";

export default function MovieSwiper({
  dataList,
  title,
  spaceBetween,
  slidesPerView,
}: type.MovieSwiperProps) {
  SwiperCore.use([Navigation, Pagination]);
  const swiperRef = useRef<SwiperCore>();
  const regex = /[\s\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]+/g;

  return (
    <div className="py-[20px] w-[70vw] margincenter">
      <p className="text-[20px]">{title}</p>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        loop={true}
        autoplay={false}
        navigation
        pagination={{
          el: ".swiper-pagination",
          clickable: true,
          type: "bullets",
        }}
      >
        {dataList?.map((item, i) => {
          return (
            <SwiperSlide>
              <Link
                href={{
                  pathname: `/movies/${item.title
                    .replace(regex, "+")
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
                  src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
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
