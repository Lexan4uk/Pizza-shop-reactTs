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
import LoadingCard from '@components/cards/LoadingCard';
import { Link } from 'react-router-dom';

function Basket() {
  const [isBasketEmpty, setIsBasketEmpty] = useState<boolean>(true)
  const [basket, setBasket] = useState<IBasket>(new CBacket())
  const [updateTrigger, setUpdateTrigger] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)

  const [delivery, setDelivery] = useState<string | null>()
  const [deliveryType, setDeliveryType] = useState<string | null>()


  useEffect(() => {
    if (updateTrigger) {
      const fetchBasket = async () => {
        setLoading(true)
        const responce = await basketList();
        if (typeof responce === "object") {
          if (responce.cart_products.length !== 0) {
            setIsBasketEmpty(false)
          }
          else {
            setIsBasketEmpty(true)
          }
          setBasket(responce)
        }
      };
      fetchBasket();
      setLoading(false)
      setUpdateTrigger(false)
    }
  }, [updateTrigger]);

  useEffect(() => {
    const deliveryData = localStorage.getItem("deliveryData");
    if (deliveryData) {
      const { deliveryText, deliveryType } = JSON.parse(deliveryData);
      setDelivery(deliveryText)
      setDeliveryType(`${deliveryType === "DeliveryByCourier" ? "Доставка на дом" : "Самовывоз"}`)
    }
  }, []);

  const {
    trash,
    pen
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
        <main className="basket basket_props block-normalizer f-column">
          <section className="basket__cart-section basket__section">
            КОРЗИНА ПУСТА
          </section>
        </main>
      ) : (
        <main className="basket basket_props f-column">
          <section className="basket__cart-section block-normalizer f-column">
            <div className="basket__section-title-holder f-row">
              <h2 className='basket__section-title title-l'>Корзина</h2>
              <button className="basket__clean-button simple-button" onClick={cleanBasket}>
                {trash()}
              </button>
            </div>
            <span className="basket__full-price text-l">{basket.cart_products.length} шт. блюд, {basket.price}Р</span>
            <div className="basket__items-holder f-column gap-16">
              {basket.cart_products.map((product) => (
                <BasketProductCard key={product.id} data={product} update={setUpdateTrigger} loading={setLoading} />
              ))}
            </div>
          </section>
          <section className="basket__cart-section basket__cart-section-padding block-normalizer f-column">
            <div className="basket__section-title-holder f-row">
              <h2 className='basket__section-title title-l'>{deliveryType ? deliveryType : "Адрес доставки"}</h2>
              {loading && (
                <LoadingCard />
              )}
            </div>
            <div className="basket__section-address-holder f-row">
              {delivery ? (
                <Link to="profile/addresses" className="main-catalog__delivery-buttons-holder f-row gap-4">
                  <button className='main-catalog__delivery-text hlink-l text-yellow simple-button text-underline'>{delivery}</button>
                  {pen()}
                </Link>
              ) : (
                <Link className="main-catalog__add-adress hlink-l text-yellow" to="/profile/addresses">Добавить адрес получения</Link>
              )}
            </div>
          </section>

        </main>
      )}

      <Footer active={5} />
    </>
  );
}

export default Basket;
