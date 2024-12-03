import '@styles/pages/Profile.scss';
import Footer from '@components/Footer';

import getSvg from '@images/svg'
import useAuth from '@scripts/custom_hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";



function Profile() {
    const {
        door,
        pen,
        arrow_right
    } = getSvg()

    const navigate = useNavigate()

    const {
        initUser,
        accData,
        isAuthorised
    } = useAuth()
    console.log(accData)

    const exitClick = () => {
        localStorage.removeItem('token');
        initUser()
        navigate("/")
    }

    return (
        <main>
            <div className="profile">
                <div className="profile__content block-normalizer f-column">
                    <header className="profile__header f-row">
                        <h1 className="profile__title title-l">Профиль</h1>
                        <button className="profile__exit-btn simple-button" onClick={exitClick}>{door()}</button>
                    </header>
                    <main className="profile__main f-column">
                        <div className="profile__user-block f-column">
                            <div className="profile__user-block-top bg-yellow f-row">
                                <div className="profile__user-info-holder f-column gap-4">
                                    <span className="profile__user-name title-s text-black">{accData?.first_name}</span>
                                    <span className="profile__user-phone text-m text-black">{accData.phone_number && accData.phone_number.replace(/^(\+7)(\d{3})(\d{3})(\d{2})(\d{2})$/, '$1 $2 $3 $4 $5')}</span>
                                </div>
                                <Link className="profile__edit" to="/profile/edit">{pen()}</Link>
                                <span className="profile__top-triangle"></span>
                            </div>
                            <div className="profile__user-block-bottom bg-yellow">
                                <div className="profile__bonuses-holder f-column gap-4">
                                    <div className="profile__bonuses f-row gap-4">
                                        <span className="profile__bonuses-count title-l text-black">{accData.wallets && accData.wallets[0].balance}</span>
                                        <span className="profile__bonuses-text title-s text-black">NINJA-БОНУСОВ</span>
                                    </div>
                                    <a href="/" className="profile__bonuses-link link-s text-black">что такое ninja-бонусы</a>
                                </div>
                                <span className="profile__bottom-triangle"></span>
                                <span className="profile__bottom-square"></span>
                            </div>
                        </div>
                        <div className="profile__user-delivery-block f-row gap-16">
                            <Link className="profile__user-delivery-link" to="/"><span className="profile__user-delivery-link_text text-yellow text-l">Мои заказы</span></Link>
                            <Link className="profile__user-delivery-link" to="/profile/addresses"><span className="profile__user-delivery-link_text text-yellow text-l">Адреса доставки</span></Link>
                        </div>
                        <div className="profile__user-links-block">
                            <Link to="/" className="profile__user-link f-row">
                                <span className="profile__user-link-text text-l">Сменить пароль</span>
                                {arrow_right()}
                            </Link>
                            <Link to="/" className="profile__user-link f-row">
                                <span className="profile__user-link-text text-l">Оставить отзыв</span>
                                {arrow_right()}
                            </Link>
                            <Link to="/" className="profile__user-link f-row">
                                <span className="profile__user-link-text text-l">Стать тайным покупателем</span>
                                {arrow_right()}
                            </Link>
                        </div>
                    </main>
                </div>
            </div>
            <Footer active={2} />
        </main>
    )
}
export default Profile;