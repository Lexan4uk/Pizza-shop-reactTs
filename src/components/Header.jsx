import '@styles/Header.scss';
import getSvg from '@images/svg'
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';


function Header() {
    const {
        arrow_down,
        search
    } = getSvg()
    const [city, setCity] = useState("Выбрать город")
    
    useEffect(() => {
        const localCity = localStorage.getItem('city');
        if (localCity) {
            const parsedCity = JSON.parse(localCity);
            setCity(parsedCity.cityName)
        }
    }, [])

    return (
        <header className="header">
            <div className="header__holder block-normalizer f-row">
                <div className="header__cities-holder f-row">
                    <Link className="header__cities-choose f-row gap-4" to="/city">{city} {arrow_down()}</Link>
                </div>
                <div className="header__actions-holder f-row gap-16">
                    <Link to='#' className="button-s button-s_slice-right">Ninja - рубли 0</Link>
                    <button className="simple-button">{search()}</button>
                </div>
            </div>

        </header>
    );
}

export default Header;
