import '@styles/pages/Main.scss';
import Header from '@components/Header';
import Footer from '@components/Footer';
import MainCard from '@components/cards/MainCard'
import useSWR from 'swr';
import { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import getSvg from '@images/svg'
import { Link } from "react-router-dom";
import { simpleGet, apiTags } from "@api/simpleGet"
import {
  IPromotion, IGroupedOption, IOption, IGood,
  CPromotion, CGood
} from '@myModels/pages/MMain';
import { BaseApiResponseType } from '@myModels/api/BaseApiTypes';


function Main() {

  const { data: options, error: opError, isLoading: opIsLoading } = useSWR<BaseApiResponseType & { items: IOption[] }>(apiTags.menu_categories(), simpleGet);
  const { data: goods, error: gError, isLoading: gIsLoading } = useSWR<BaseApiResponseType & { items: IGood[] }>(apiTags.menu(), simpleGet);
  const { data: promotionsRaw, error: pError, isLoading: pIsLoading } = useSWR<BaseApiResponseType & { items: IPromotion[] }>(apiTags.promotions, simpleGet);

  let normalizedPromos: IPromotion[] = []
  if (promotionsRaw?.items) {
    normalizedPromos = promotionsRaw?.items?.map(item => new CPromotion(item)) || [];
  }

  let sortedGoods: IGroupedOption[] = [];
  if (goods?.items) {
    sortedGoods = options?.items?.map((option) => {
      const relatedGoods = goods?.items?.filter((good) => good.parent_group.id === option.id) || [];
      return {
        id: option.id,
        name: option.name,
        color: option.color,
        items: relatedGoods.map((good) => new CGood(good)),
      };
    }) || [];
  }

  const [isFixed, setIsFixed] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const navWrapperRef = useRef<HTMLDivElement>(null);
  const [navOffsetTop, setNavOffsetTop] = useState(0);
  const [delivery, setDelivery] = useState<string | null>()
  const {
    search,
    pen
  } = getSvg()

  useEffect(() => {
    const deliveryData = localStorage.getItem("deliveryData");
    if (deliveryData) {
      const { deliveryText } = JSON.parse(deliveryData);
      setDelivery(deliveryText)
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > navOffsetTop) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    if (navRef.current) {
      setNavOffsetTop(navRef.current.offsetTop);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navOffsetTop, options]);

  return (
    <>
      <Header />
      <main className="main-catalog main-catalog_props">
        <div className="main-catalog__delivery-holder f-column block-normalizer gap-8">
          {delivery ? (
            <>
              <h2 className="main-catalog__delivery-title title-l">Доставим по адресу</h2>
              <Link to="profile/addresses" className="main-catalog__delivery-buttons-holder f-row gap-4">
                <button className='main-catalog__delivery-text hlink-l text-yellow simple-button text-underline'>{delivery}</button>
                {pen()}
              </Link>
            </>) : (
            <Link className="main-catalog__add-adress hlink-l text-yellow" to="profile/addresses">Добавить адрес получения</Link>
          )}
        </div>
        <aside className={`main-catalog__promotion-holder ${isFixed ? 'main-catalog__promotion-holder_margin-bottom' : ''}`}>
          <Swiper
            slidesPerView="auto"
            spaceBetween={12}
            className="main-catalog__promotion promotion-swiper"
          >
            {normalizedPromos?.map((item) => (
              <SwiperSlide key={item.id} className="main-catalog__promotion-slide">
                <Link to={`/${item.href}`} >
                  <img className="main-catalog__promotion-slide-img" src={`https://nf.kvokka.net${item.cover}`} alt="" />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </aside>

        <div ref={navWrapperRef} className={`main-catalog__goods-nav-wrapper f-row ${isFixed ? 'main-catalog__goods-nav-wrapper_fixed' : ''}`}>
          {isFixed && <a className="main-catalog__static-nav-search" href="/search">{search()}</a>}
          <nav className={`main-catalog__goods-nav-holder ${isFixed ? 'main-catalog__goods-nav-holder_fixed' : ''}`} ref={navRef}>
            <Swiper
              slidesPerView="auto"
              spaceBetween={14}
              className="main-catalog__goods-nav nav-swiper"
              tag="ul"
              loop={true}
            >
              {options?.items?.map((option) => (
                <SwiperSlide key={option.id} tag="li" className='main-catalog__goods-nav-el'>
                  <a href={`#${option.name}`} className='main-catalog__goods-nav-link'>{option.name}</a>
                </SwiperSlide>
              ))}
            </Swiper>
          </nav>
        </div>
        {sortedGoods?.map((item) => (
          <MainCard key={item.name} item={item} />
        ))}
      </main>
      <Footer active={1} />
    </>
  );
}

export default Main;
