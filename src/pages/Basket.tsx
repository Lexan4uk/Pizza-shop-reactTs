import Footer from '@components/Footer';
import Header from '@components/Header';
import '@styles/pages/Basket.scss';
import { simpleGet, apiTags } from '@api/simpleGet';
import { BaseApiResponseType } from '@myModels/api/BaseApiTypes';
import useSWR from 'swr';
import { IBasket, CBacket, ICartProduct } from '@myModels/pages/MBasket';
import { basketList } from '@scripts/helpers/basket.api';
import { useEffect, useState } from 'react';
import getSvg from '@images/svg';
import BasketProductCard from '@components/cards/BasketProductCard';

function Basket() {
  const [isBasketEmpty, setIsBasketEmpty] = useState<boolean>(true)
  const [basket, setBasket] = useState<IBasket>(new CBacket())

  useEffect(() => {
    const fetchBasket = async () => {
      const responce = await basketList();
      if (typeof responce === "object") {
        if (responce.cart_products.length !== 0) {
          setIsBasketEmpty(false)
        }
        setBasket(responce)
      }
      console.log(responce);
    };
    fetchBasket();
  }, []);

  const {
    trash
  } = getSvg()


  return (
    <>
      {isBasketEmpty ? (
        <main className="basket block-normalizer f-column">
          <section className="basket__cart-section basket__section">
            КОРЗИНА ПУСТА
          </section>
        </main>
      ) : (
        <main className="basket block-normalizer f-column">
          <section className="basket__cart-section basket__section">
            <div className="basket__section-title-holder f-row">
              <h2 className='basket__section-title title-l'>Корзина</h2>
              <button className="basket__clean-button simple-button">
                {trash()}
              </button>
            </div>
            <span className="basket__full-price text-l">{basket.cart_products.length} блюда {basket.price}Р</span>
            <div className="basket-items-holder f-column gap-16">
              {basket.cart_products.map((product) => (
                <BasketProductCard key={product.id} data={product} />
              ))}
            </div>
          </section>
        </main>
      )}

      <Footer active={5} />
    </>
  );
}

export default Basket;
