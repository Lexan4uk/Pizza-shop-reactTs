import '@styles/pages/Basket.scss';
import { IBasketProductCard } from '@myModels/components/cards/MBasketProductCar';
import getSvg from '@images/svg';
import { basketList, basketEdit } from '@scripts/helpers/basket.api';
import { IBasketEdit } from '@myModels/pages/MBasket';

const BasketProductCard = ({ data, update, loading }: IBasketProductCard) => {
    const {
        cross,
        mini_plus,
        mini_minus,
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
        }
        loading(false)
    }
    const decProduct = async () => {
        loading(true)
        const getCart = await basketList()
        if (typeof getCart === 'object') {
            const decreasedData = getCart.cart_products.map(product => {
                if (data.id === product.id) {
                    if (data.amount > 1) {
                        return {
                            ...product,
                            amount: product.amount - 1
                        };
                    }
                }
                return product;
            });

            const newData: IBasketEdit[] = decreasedData.map((item) => ({
                products: item.product.id,
                amount: item.amount,
                cartModifiers: item.cart_modifiers.map(modifier => ({
                    productModifier: modifier.product_modifier.id,
                    amount: modifier.amount
                }))
            }));
            const responce = await basketEdit(newData)
            update(true)
        }
        loading(false)
    }
    const incProduct = async () => {
        loading(true)
        const getCart = await basketList()
        if (typeof getCart === 'object') {
            const decreasedData = getCart.cart_products.map(product => {
                if (data.id === product.id) {
                    return {
                        ...product,
                        amount: product.amount + 1
                    };

                }
                return product;
            });

            const newData: IBasketEdit[] = decreasedData.map((item) => ({
                products: item.product.id,
                amount: item.amount,
                cartModifiers: item.cart_modifiers.map(modifier => ({
                    productModifier: modifier.product_modifier.id,
                    amount: modifier.amount
                }))
            }));
            const responce = await basketEdit(newData)
            update(true)
        }
        loading(false)
    }
    return (
        <div className={`${data.product.image_links[0] ? "basket__prodcard" : "basket__prodcard-no-img"}`}>
            {data.product.image_links[0] && (
                <div className="basket__prodcard-img-holder f-row">
                    <img className='basket__prodcard-img' src={data.product.image_links[0]} alt="Product" />
                </div>
            )}
            <div className="basket__prodcard-content f-column">
                <h3 className='basket__prodcard-content-title title-xs'>{data.product.name}</h3>
                {data.cart_modifiers.map((modifier) => (
                    <div key={modifier.position_id} className="basket__prodcard-content-modifiers text-s text-yellow">{modifier.product_modifier.product.name}</div>
                ))}
                <div className="basket__prodcard-actions f-row">
                    <div className="basket__prodcard-counter-holder f-row">
                        <button className={`basket__prodcard-counter-btn button ${data.amount === 1 && "button-inactive"}`} onClick={decProduct}>{mini_minus()}</button>
                        <input className="basket__prodcard-counter text-m" readOnly value={data.amount} type="number" />
                        <button className={`basket__prodcard-counter-btn button ${data.amount === 99 && "button-inactive"}`} onClick={incProduct}>{mini_plus()}</button>
                    </div>
                    <span className='basket__prodcard-price title-s'>{data.cost}Р</span>
                </div>
            </div>
            <button className='basket__prodcard-delete simple-button' onClick={deleteProduct}>
                {cross()}
            </button>
            <span className='basket__bottom-right-border'></span>
            <span className='basket__bottom-border'></span>
            <span className='basket__left-border'></span>
            <span className='basket__left-top-border'></span>
            <span className='basket__bottom-left-border'></span>
            <span className='basket__top-circle'></span>
            <span className='basket__right-circle'></span>

        </div>
    )
}
export default BasketProductCard