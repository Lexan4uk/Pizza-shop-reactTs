import '@styles/pages/Main.scss';
import getSvg from '@images/svg'
import ProductCard from '@components/cards/ProductCard';
import { IGroupedOption } from '@myModels/pages/MMain';

function MainCard( {item} : {item: IGroupedOption}) {
    const {
        arrow_line
    } = getSvg()
    const themeColor = {
        '--iconcolor': item.color !== "defaultColor" && item.color ? item.color : "var(--red)"
    } as React.CSSProperties;;
    return (
        <section className="main-catalog__section f-column block-normalizer" style={themeColor ?? themeColor} id={item.name}>
            <div className="main-catalog__section-top f-row">
                <h2 className="main-catalog__section-article title-l">{item.name}</h2>
                {arrow_line()}
            </div>
            {item.items.map((item) => (
                <ProductCard data={item} key={item.id} />
            ))}
        </section>
    );
}

export default MainCard;