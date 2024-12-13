import Footer from '@components/Footer';
import Header from '@components/Header';
import '@styles/pages/Basket.scss';
import { simpleGet, apiTags } from '@api/simpleGet';
import { BaseApiResponseType } from '@myModels/api/BaseApiTypes';
import useSWR from 'swr';
import { IBasket } from '@myModels/pages/MBasket';
import { useBasketList } from '@scripts/helpers/basket.api';

function Basket() {
  const basket = useBasketList()
  console.log(basket)
  return (
    <>
      <Header />
      <main className="basket">

      </main>
      <Footer active={5} />
    </>
  );
}

export default Basket;
