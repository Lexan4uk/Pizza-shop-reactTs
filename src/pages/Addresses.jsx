import '@styles/pages/Addresses.scss';
import { Link } from "react-router-dom";
import getSvg from '@images/svg'
import { simpleGet, apiTags } from "@api/simpleGet"
import useSWR from 'swr';
import { useNavigate } from 'react-router-dom';



function Addresses() {
    const { data: addresses, error: adError, isLoading: adIsLoading } = useSWR(apiTags.deliver_points, simpleGet);
    if (!adIsLoading)
        console.log(addresses)
    const navigate = useNavigate();
    const {
        arrow
    } = getSvg()

    return (
        <>
            <main className="addresses">
                <header className="addresses header">
                    <div className="header__holder block-normalizer f-row">
                        <button className="addresses__header-arrow simple-button" onClick={() => navigate("/profile")}>{arrow()}</button>
                        <h1 className="addresses__header-title title-xs">Адреса доставки</h1>
                    </div>
                </header>
                <section className="addresses__content block-normalizer f-column">
                
                </section>
                <footer className="addresses footer_props search__footer">
                    <nav className="footer__nav">
                        <Link to="/profile/addresses/add" className={`footer__auth-btn button-l`} >Добавить адрес</Link>
                    </nav>
                </footer>
            </main>

        </>
    )
}
export default Addresses;