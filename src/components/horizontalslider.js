// src/components/horizontalslider.js
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import '../styles/scrollhorizontal.css';
import { Pagination } from 'swiper/modules';
import riyadh from '../assets/riyadh.png';
import bicture from '../assets/iklanbicture.jpg';
import kasir from '../assets/kasir.png';
import tdl from '../assets/todolist.png';
import FadeContent from './FadeContent';
import AnimatedContent from './AnimatedContent';

export default function HorizontalSlider({ onImageClick }) {
  const handleImageClick = (e) => {
    if (e.currentTarget.tagName === 'IMG') {
      const imgSrc = e.currentTarget.src;
      onImageClick(imgSrc);
    }
  };
  
  return (
    
    <div className='con-swiper'>
      
        <div className='title-swiper'>
          <AnimatedContent
            distance={30}
            direction="vertical"
            reverse={false}
            config={{ tension: 80, friction: 20 }}
            initialOpacity={0.2}
            threshold={1}
          >
            <h1>Latest Project —</h1>
          </AnimatedContent>
        </div>
      
      <FadeContent blur={false} duration={1500} easing="ease-out" initialOpacity={0}>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          breakpoints={{
            0: { slidesPerView: 1 },
            701: { slidesPerView: 3 },
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <h1 className='language-programs php-language'>PHP</h1>
            <img onClick={handleImageClick} className='gambar' src={riyadh} alt="Alquran Website"></img>
            <h1 className='gambar-h1'>Alquran Website</h1>
          </SwiperSlide>
          <SwiperSlide>
            <h1 className='language-programs java-language'>JAVA</h1>
            <img onClick={handleImageClick} className='gambar' src={bicture} alt="Bicture Apps (Gallery Photo Online)"></img>
            <h1 className='gambar-h1'>Gallery Photo Online Apps</h1>
          </SwiperSlide>
          <SwiperSlide>
            <h1 className='language-programs php-language'>PHP</h1>
            <img onClick={handleImageClick} className='gambar' src={kasir} alt="Cashier"></img>
            <h1 className='gambar-h1'>Cashier</h1>
          </SwiperSlide>
          <SwiperSlide>
            <h1 className='language-programs php-language'>PHP</h1>
            <img onClick={handleImageClick} className='gambar' src={tdl} alt='To Do List'></img>
            <h1 className='gambar-h1'>To Do List</h1>
          </SwiperSlide>
        </Swiper>
      </FadeContent>
      
    </div>

  );
}
