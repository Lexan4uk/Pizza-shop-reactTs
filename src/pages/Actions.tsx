import '@styles/pages/Actions.scss';
import { simpleGet, apiTags } from "@api/simpleGet"
import Footer from '@components/Footer';
import PromoCard  from '@components/cards/PromoCard';
import useSWR from 'swr';
import { IPromotion, CPromotion } from '@myModels/pages/MMain';
import { BaseApiResponseType } from '@myModels/api/BaseApiTypes';

function Actions() {
    const { data: promotions, error: pError, isLoading: pIsLoading } = useSWR<BaseApiResponseType & { items: IPromotion[] }>(apiTags.promotions, simpleGet);
    const normalizedPromos = promotions?.items?.map((item) => {
        return new CPromotion(item)
      })
    
    return (
        <>
        <main className="actions-page actions-page_props block-normalizer f-column">
            <div className="actions-page__holder f-column">
                <h1 className="actions-page__title title-l">Акции</h1>
            </div>
            <section className="actions-page__actions-holder">
            {normalizedPromos?.map((promo) => (
                <PromoCard key={promo.id} data={promo}/>
            ))}
            </section>
        </main>
        <Footer active={3} />
        </>
    )
}
export default Actions;