import '@styles/pages/Product.scss';
import { simpleGet, apiTags } from "@api/simpleGet";
import { useParams } from 'react-router-dom';
import React, { useState, useEffect, useMemo } from 'react';
import useSWR from 'swr';
import objectNormalizer from '@scripts/helpers/objectNormalizer';
import getSvg from '@images/svg';
import SizesCard from '@components/cards/SizesCard'
import ProductAdditionsCard from '@components/cards/ProductAdditionsCard'
import {
    IProduct, IProductModifier, IModifier, INormalizedProduct,
    CNormalizedProduct
  } from '@myModels/pages/MProduct';
  import { BaseApiResponseType } from '@myModels/api/BaseApiTypes';



function Product() {
    const { id } = useParams();
    const { data: product, error, isLoading: pIsLoading } = useSWR<BaseApiResponseType & {items: IProduct[]}>(apiTags.productById(id), simpleGet);
    const [selectedProduct, setSelectedProduct] = useState<INormalizedProduct>(new CNormalizedProduct);
    const [selectedThickness, setSelectedThickness] = useState('thin');
    const [selectedIdBySize, setSelectedIdBySize] = useState<string>();

    const [currentPrice, setCurrentPrice] = useState(1)
    const [productCount, setProductCount] = useState(1);
    const [price, setPrice] = useState<number>();

    const [addition, updateAddition] = useState<IModifier[]>([]);
    const [normalizedProducts, setNormalizedProducts] = useState<INormalizedProduct[]>([new CNormalizedProduct()]);

    
    useEffect(() => {
        console.log(addition)
    }, [addition])

    useEffect(() => {
        if (product && !pIsLoading) {
            const products = product.items.map((item) => new CNormalizedProduct(item));
            setNormalizedProducts(products);
            const firstProduct: INormalizedProduct = products[0] || new CNormalizedProduct();
            setSelectedProduct(firstProduct);
            setCurrentPrice(firstProduct.min_price);
        }
    }, [product, pIsLoading]);
    

    useEffect(() => {
        const totalAdditionPrice = Object.values(addition).reduce((acc, item) => {
            return acc + (item.min_price || 0);
        }, 0);

        setPrice((currentPrice + totalAdditionPrice) * productCount);
    }, [currentPrice, productCount, addition]);
        
    const {
        mini_plus,
        mini_minus,
        cross,
        info
    } = getSvg();
    
    return (
        <>
            <main className="product product_props block-normalizer f-column">
                <button className="product__exit-btn button-s button-s_slice-left" onClick={() => window.history.back()}>{cross("var(--black)")}</button>
                <div className="product__img-holder">
                    <img className="product__img" src={selectedProduct.image_links[0]} alt="Product image" />
                </div>
                <section className="product__content f-column">
                    <div className="profuct__info f-column gap-16">
                        <div className="product__top-info">
                            <div className="product__header f-row">
                                <h1 className="product__title title-m">{selectedProduct.parent_group.name}</h1>
                                {selectedProduct.energy_full_amount !== 0 && <button className="simple-button">{info("var(--yellow")}</button>}
                            </div>
                            {selectedProduct.weight !== 0 && <span className="product__weight text-m text-yellow">{selectedProduct.weight * 1000} г</span>}
                        </div>
                        <span className="product__text text-l">{selectedProduct.description}</span>
                    </div>
                    {selectedProduct.isPizza && (
                        <>
                            <div className="product__options">
                                <h2 className="product__option-article text-yellow text-m">Тип теста</h2>
                                <div className="product__options-holder f-row">
                                    <button className={`product__option button-text ${selectedThickness === 'thin' ? 'product__option_active' : ''}`} onClick={() => setSelectedThickness('thin')}>Тонкое</button>
                                    <button className={`product__option button-text ${selectedThickness === 'traditional' ? 'product__option_active' : ''}`} onClick={() => setSelectedThickness('traditional')}>Традиционное</button>
                                </div>
                            </div>
                            <SizesCard data={normalizedProducts} selectedThickness={selectedThickness} setSelectedIdBySize={setSelectedIdBySize} selectedIdBySize={selectedIdBySize} setCurrentPrice={setCurrentPrice} />
                            <div className="product__options">
                                <h2 className="product__option-article text-yellow text-m">Дополнительные добавки</h2>
                                <div className="product__additions-holder">
                                    {selectedProduct.product_modifiers.map((addition : IProductModifier) => (
                                        
                                        <ProductAdditionsCard key={addition.id} addition={addition} updateAddition={updateAddition}/>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </section>
            </main>
            <footer className="product footer footer_props">
                <div className="product__footer-content block-normalizer f-row gap-16">
                    <div className="product__footer-counter-holder f-row">
                        <button className="product__footer-counter-btn button" onClick={() => productCount > 1 && setProductCount(productCount - 1)}>{mini_minus()}</button>
                        <input className="product__footer-counter text-l" readOnly value={productCount} type="number" />
                        <button className="product__footer-counter-btn button" onClick={() => productCount < 99 && setProductCount(productCount + 1)}>{mini_plus()}</button>
                    </div>
                    <button className="product__footer-cart-add button-l button">В корзину за {price}Р</button>
                </div>
            </footer>
        </>
    );
}

export default Product;
