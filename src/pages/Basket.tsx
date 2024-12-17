import Footer from '@components/Footer';
import Header from '@components/Header';
import '@styles/pages/Basket.scss';
import { simpleGet, apiTags } from '@api/simpleGet';
import { BaseApiResponseType } from '@myModels/api/BaseApiTypes';
import useSWR from 'swr';
import { IBasket, CBacket, ICartProduct, CBasketEdit } from '@myModels/pages/MBasket';
import { basketEdit, basketList } from '@scripts/helpers/basket.api';
import { useEffect, useState } from 'react';
import getSvg from '@images/svg';
import BasketProductCard from '@components/cards/BasketProductCard';

function Basket() {
  const [isBasketEmpty, setIsBasketEmpty] = useState<boolean>(true)
  const [basket, setBasket] = useState<IBasket>(new CBacket())
  const [updateTrigger, setUpdateTrigger] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (updateTrigger) {
      const fetchBasket = async () => {
        setLoading(true)
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
      setLoading(false)
      setUpdateTrigger(false)
    }
  }, [updateTrigger]);

  const {
    trash
  } = getSvg()

  const cleanBasket = async () => {
    setLoading(true)
    const responce = await basketEdit([])
    setUpdateTrigger(true)
    setLoading(false)
  }


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
              <button className="basket__clean-button simple-button" onClick={cleanBasket}>
                {trash()}
              </button>
            </div>
            <span className="basket__full-price text-l">{basket.cart_products.length} шт. блюд, {basket.price}Р</span>
            <div className="basket-items-holder f-column gap-16">
              {basket.cart_products.map((product) => (
                <BasketProductCard key={product.id} data={product} update={setUpdateTrigger} loading={setLoading} />
              ))}
            </div>
          </section>
          {loading && (
            <div className="spinner">
              <div className="loader"></div>
            </div>
          )}

        </main>
      )}

      <Footer active={5} />
    </>
  );
}

export default Basket;
