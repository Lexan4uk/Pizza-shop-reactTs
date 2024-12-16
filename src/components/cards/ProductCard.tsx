import '@styles/cards/MenuCard.scss';
import getSvg from '@images/svg'
import { IGood } from '@myModels/pages/MMain';

const ProductCard = ({data} : { data: IGood }) => {
    const {
        productcard_border,
        circle,
        cart,
        premium,
        baked,
        fried
    } = getSvg()
    const tagProcessing = (tag: string) => {
        switch (tag) {
            case "Premium":
                return premium()
            case "Жареный":
                return fried()
            case "Запеченный":
                return baked()
            default:
                return null;
        }
    }
    return (
        <a href={data.href} className="menu-card menu-card_props f-column">
            {productcard_border(undefined, undefined, undefined, "menu-card__border")}
            {circle(undefined, undefined, undefined, "menu-card__border-circle")}
            <div className="menu-card__content-holder">
                <div className="menu-card__img-holder">
                    <img className="menu-card__img" src={data.image_links[0]} alt="Product image" />
                    {data.tags.length !== 0 && (
                        data?.tags?.map((tag, index) => (
                            <div className="menu-card__tag" key={index}>{tagProcessing(tag)}</div>
                        ))
                    )
                    }
                </div>
                <div className="menu-card__content gap-4">
                    <h3 className="menu-card__content-article title-xs">{data.name}</h3>
                    <p className="menu-card__content-text text-s">{data.description}</p>
                </div>
            </div>
            <div className="menu-card__buttons-holder f-row">
                <button className="menu-card__button-choose menu-card__button-choose_left f-row gap-4 button-s button-s_slice-left">{cart("var(--white)")}Выбрать <span className="menu-card__button-choose_text-right">От {data.min_price} Р</span></button>
            </div>

        </a>
    )
}
export default ProductCard