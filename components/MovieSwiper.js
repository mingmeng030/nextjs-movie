import Link from "next/link";
import styles from "../styles/MovieSwiper.module.css";
import { useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function MovieSwiper({ dataList, title }) {
  SwiperCore.use([Navigation, Pagination]);
  const swiperRef = useRef();
  const regex = /[\s\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]+/g;

  return (
    <div className={`${styles.swiperContainer}`}>
      <p className={`${styles.swiperTitle}`}>{title}</p>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={0}
        slidesPerView={6}
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
                />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <style jsx>
        {`
          .swiper-button-next::after,
          .swiper-button-prev::after {
            display: none;
          }
          .swiper-button-prev {
            background: url(../static/icon/arrow-circle-left.png) no-repeat;
          }
          .swiper-button-next {
            background: url(../static/icon/right-arrow.png) no-repeat;
            background-size: 50% auto;
            background-position: center;
          }
        `}
      </style>
    </div>
  );
}
