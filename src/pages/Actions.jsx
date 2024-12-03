import '@styles/pages/Actions.scss';
import { simpleGet, apiTags } from "@api/simpleGet"
import Footer from '@components/Footer';
import PromoCard  from '@components/cards/PromoCard';
import useSWR from 'swr';
import objectNormalizer from '@scripts/helpers/objectNormalizer';


function Actions() {
    const { data: promotions, error: pError, isLoading: pIsLoading } = useSWR(apiTags.promotions, simpleGet);
    const normalizedPromos = promotions?.items?.map((item) => {
        return objectNormalizer(item, "actions")
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