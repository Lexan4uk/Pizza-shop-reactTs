import '@styles/pages/Action.scss';
import { simpleGet, apiTags } from "@api/simpleGet"
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

import useSWR from 'swr';
import getSvg from '@images/svg'
import { ISinglePromotion, CSinglePromotion } from '@myModels/pages/MAction';
import { BaseApiResponseType } from '@myModels/api/BaseApiTypes';

function Action() {
    const { id } = useParams();
    const { data: promotion, error, isLoading } = useSWR<BaseApiResponseType & { item: ISinglePromotion }>(apiTags.promotionById(id), simpleGet);
    const {
        arrow
    } = getSvg()
    let normalizedPromos: CSinglePromotion = new CSinglePromotion()
    if (!isLoading && promotion) {
        normalizedPromos = new CSinglePromotion(promotion.item)
    }
    console.log(promotion)
    
    return (
        <>
            <header className="action header">
                <div className="header__holder block-normalizer f-row">
                    <button className="action__header-arrow simple-button" onClick={() => window.history.back()}>{arrow()}</button>
                    <h2 className="action__header-title title-xs">Акции</h2>
                </div>
            </header>
            <main className="action">
                <section className="action__holder block-normalizer f-column">
                    <h1 className="action__title title-m">{normalizedPromos.title}</h1>
                    <div className="action__image-holder">
                        <img className="action__image" src={`https://nf.kvokka.net${normalizedPromos.cover}`} alt="Action" />
                    </div>
                    <span className="action__text text-l">{normalizedPromos.description}</span>
                </section>
            </main>
            <footer className="action footer footer_props ">
                <div className="action__footer-content block-normalizer">
                    <Link className="action__footer-btn button-l" to="/">В МЕНЮ</Link>
                </div>
            </footer>
        </>
    )
}
export default Action;