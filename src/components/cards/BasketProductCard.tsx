import '@styles/pages/Basket.scss';
import { IBasketProductCard } from '@myModels/components/cards/MBasketProductCar';
import getSvg from '@images/svg';
import { basketList, basketEdit } from '@scripts/helpers/basket.api';
import { IBasketEdit } from '@myModels/pages/MBasket';

const BasketProductCard = ({ data, update, loading }: IBasketProductCard) => {
    const {
        cross
    } = getSvg()

    const deleteProduct = async () => {
        loading(true)
        const getCart = await basketList()
        if (typeof getCart === 'object') {
            const filteredData = getCart.cart_products.filter(item => item.id !== data.id);
            const newData: IBasketEdit[] = filteredData.map((item) => ({
                products: item.product.id,
                amount: item.amount,
                cartModifiers: item.cart_modifiers.map(modifier => ({
                    productModifier: modifier.product_modifier.id,
                    amount: modifier.amount
                }))
            }));
            const responce = await basketEdit(newData)
            update(true)
            loading(false)
        }
    }
    return (
        <div className="basket__prodcard f-row">
            <div className="basket__prodcard-img-holder f-row">
                <img className='basket__prodcard-img' src={data.product.image_links[0]} alt="Product" />
            </div>
            <div className="basket__prodcard-content f-column">
                <div className="basket__prodcard-content-text f-column gap-8">
                    <h3 className='basket__prodcard-content-title title-xs'>{data.product.name}</h3>
                    <span className='basket__prodcard-content-text text-m text-yellow'>{data.product.description}</span>
                </div>
            </div>
            <button className='basket__prodcard-delete simple-button' onClick={deleteProduct}>
                {cross()}
            </button>
        </div>
    )
}
export default BasketProductCard