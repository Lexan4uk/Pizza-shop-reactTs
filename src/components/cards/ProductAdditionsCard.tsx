import '@styles/pages/Product.scss';
import getSvg from '@images/svg';
import { useState } from 'react';
import {
    IProductAdditionsCard
} from '@myModels/components/cards/MProductAdditionsCard'
import { IProductModifier, IModifier, IModdedModifier } from '@myModels/pages/MProduct';


const ProductAdditionsCard = ({ addition, updateAddition }: IProductAdditionsCard) => {
    const normalizedAddition = addition.product;
    const {
        mini_plus,
        mini_minus,
    } = getSvg();

    const [btnActive, setBtnActive] = useState(true)
    let type = "card"
    if (normalizedAddition.min_price === 0)
        type = "checkbox"

    const handleAdd = () => {
        console.log(normalizedAddition)
        setBtnActive(false);
        updateAddition((prevAdditions: IModdedModifier[]) => {
            const exists = prevAdditions.some(item => item.id === normalizedAddition.id);
            if (!exists) {
                const newAddition = {
                    ...normalizedAddition,
                    addition_id: addition.id
                }
                return [...prevAdditions, newAddition];
            }
            return prevAdditions;
        });
    };

    const handleRemove = () => {
        setBtnActive(true);
        updateAddition((prevAdditions: IModdedModifier[]) => {
            return prevAdditions.filter(item => item.id !== normalizedAddition.id);
        });
    };


    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            handleAdd()
        } else {
            handleRemove()
        }
    };



    return (
        <>
            {type === "card" ? (
                <div className="product__addition f-column">
                    <div className="product__addition-img-holder">
                        <img className="product__addition-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOwRConBYl2t6L8QMOAQqa5FDmPB_bg7EnGA&s" alt="Addition img" />
                    </div>
                    <h3 className="product__addition-article text-s">{normalizedAddition.name}</h3>
                    <div className="product__addition-interaction-holder f-row">
                        <button className={`product__addition-interaction button ${btnActive && "product__addition-interaction_inactive"}`} onClick={handleRemove}>
                            {mini_minus(undefined, 16, 16)}
                        </button>
                        <span className="product__addition-price text-l">{normalizedAddition.min_price}Р</span>
                        <button className={`product__addition-interaction button ${!btnActive && "product__addition-interaction_inactive"}`} onClick={handleAdd}>
                            {mini_plus(undefined, 16, 16)}
                        </button>
                    </div>
                </div>
            ) : type === "checkbox" ? (
                <div className="product__addition-checkbox-holder f-column">
                    <h2 className="product__option-article text-yellow text-m">Изменить состав</h2>
                    <div className="product__addition-checkbox-content f-row gap-4">
                        <input type="checkbox" id="checkbox" className="product__addition-checkbox" onChange={handleCheckboxChange} />
                        <label htmlFor="checkbox" className="product__addition-checkbox-label"></label>
                        <span className="product__addition-checkbox-text text-m">{normalizedAddition.name}</span>
                    </div>
                </div>
            ) : null}
        </>
    );
};
export default ProductAdditionsCard;