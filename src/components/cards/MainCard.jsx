import '@styles/pages/Main.scss';
import getSvg from '@images/svg'
import ProductCard from '@components/cards/ProductCard';

function MainCard({ data }) {
    const {
        arrow_line
    } = getSvg()
    const themeColor = {
        '--iconcolor': data.color !== "defaultColor" && data.color ? data.color : "var(--red)"
    };
    return (
        <section className="main-catalog__section f-column block-normalizer" style={themeColor ?? themeColor} id={data.name}>
            <div className="main-catalog__section-top f-row">
                <h2 className="main-catalog__section-article title-l">{data.name}</h2>
                {arrow_line()}
            </div>
            {data.items.map((item) => (
                <ProductCard data={item} key={item.id} />
            ))}
        </section>
    );
}

export default MainCard;