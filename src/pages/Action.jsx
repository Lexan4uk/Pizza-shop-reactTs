import '@styles/pages/Action.scss';
import { simpleGet, apiTags } from "@api/simpleGet"
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

import useSWR from 'swr';
import objectNormalizer from '@scripts/helpers/objectNormalizer';
import getSvg from '@images/svg'


function Action() {
    const { id } = useParams();
    const { data: promotion, error, isLoading } = useSWR(apiTags.promotionById(id), simpleGet);
    const {
        arrow
    } = getSvg()
    let normalizedPromos
    if (!isLoading && promotion) {
        normalizedPromos = objectNormalizer(promotion.item, "action");
    }
    
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
                    <h1 className="action__title title-m">{normalizedPromos?.title}</h1>
                    <div className="action__image-holder">
                        <img className="action__image" src={`https://nf.kvokka.net${normalizedPromos?.cover}`} alt="Action image" />
                    </div>
                    <span className="action__text text-l">{normalizedPromos?.description}</span>
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