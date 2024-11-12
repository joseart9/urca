"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import { Autoplay } from 'swiper/modules';
import { FeatCasa } from '@/types/FeatCasas';

export default function FeatCasas({ featCasa }: { featCasa: FeatCasa[] }) {
    return (
        <div className="w-full h-full lg:h-[700px]">
            <Swiper
                spaceBetween={10}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                modules={[Autoplay]}
                className="w-full h-full rounded-md"
            >
                {featCasa.map((casa, index) => (
                    <SwiperSlide key={index}>
                        <img
                            className="h-56 w-full rounded-md object-cover lg:h-full"
                            src={casa.img}
                            alt={`Casa ${index + 1}`}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
