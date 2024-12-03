import '@styles/pages/Main.scss';
import Header from '@components/Header';
import Footer from '@components/Footer';
import MainCard from '@components/cards/MainCard'
import useSWR from 'swr';
import objectNormalizer from '@scripts/helpers/objectNormalizer';

import { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import getSvg from '@images/svg'
import { Link } from "react-router-dom";
//import { simpleGet, apiTags } from "@apiAl/simpleGet"
import { simpleGet, apiTags } from '../../src/api/simpleGet';
//import { IgoodsQuerry as Igoods2 } from '@types/pages/MSimpleGet'; 
import { IGoodsQuery, IGoods, IOptionsQuery, IOption, IPromotionsQuery, IPromotion, ISortedGoods, IParentGroup, СPromotion } from '../../src/types/pages/MSimpleGet';



function Main() {

  const { data: options, error: opError, isLoading: opIsLoading } = useSWR<IOptionsQuery>(apiTags.menu_categories(), simpleGet);
  const { data: goods, error: gError, isLoading: gIsLoading } = useSWR<IGoodsQuery>(apiTags.menu(), simpleGet);
  const { data: promotionsRaw, error: pError, isLoading: pIsLoading } = useSWR<IPromotionsQuery>(apiTags.promotions, simpleGet);
  let normalizedPromos: IPromotion[] = []
  if (promotionsRaw?.items) {
    normalizedPromos = promotionsRaw?.items?.map(item => new СPromotion(item)) || [];
  }
  
  let sortedGoods: ISortedGoods[] = [];
  if (goods?.items) {
    sortedGoods = goods.items.reduce((acc: ISortedGoods[], item) => {
      objectNormalizer(item, "product")
      const parentGroupId = item.parent_group.id;
      const groupName = item.parent_group.name;
      const groupColor = item.parent_group.color || 'defaultColor';
      let group = acc.find(group => group.parent_group_id === parentGroupId);
      if (!group) {
        group = {
          parent_group_id: parentGroupId,
          name: groupName,
          color: groupColor,
          items: []
        };
        acc.push(group);
      }
      group.items.push(item);
      return acc;
    }, []);
  }

  const [activeDelivery, setActiveDelivery] = useState('Самовывоз');
  const [isFixed, setIsFixed] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const navWrapperRef = useRef(null);
  const [navOffsetTop, setNavOffsetTop] = useState(0);
  const {
    search
  } = getSvg()

  const handleDeliveryClick = (buttonName: string) => {
    setActiveDelivery(buttonName);
  };

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
        <div className="main-catalog__delivery-holder f-column block-normalizer">
          <div className="main-catalog__delivery-options f-row">
            <button className={`main-catalog__delivery-option button-text ${activeDelivery === 'Самовывоз' ? 'main-catalog__delivery-option_active' : ''}`} onClick={() => handleDeliveryClick('Самовывоз')}>
              Самовывоз
            </button>
            <button className={`main-catalog__delivery-option button-text ${activeDelivery === 'Доставка' ? 'main-catalog__delivery-option_active' : ''}`} onClick={() => handleDeliveryClick('Доставка')} >
              Доставка
            </button>
          </div>
          <Link className="main-catalog__add-adress hlink-l text-yellow" to="/">Добавить адрес</Link>
        </div>
        {/*------------------сюда промо-----------------------------*/}
        <aside className={`main-catalog__promotion-holder ${isFixed ? 'main-catalog__promotion-holder_margin-bottom' : ''}`}>
          <Swiper
            slidesPerView="auto"
            spaceBetween={12}
            className="main-catalog__promotion promotion-swiper"
            loop={true}
          >
            {normalizedPromos?.map((item: IPromotion) => (
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
          <MainCard data={item} key={item.name} />
        ))}
      </main>
      <Footer active={1} />
    </>
  );
}

export default Main;
