import '@styles/pages/SelectCity.scss';
import { simpleGet, apiTags } from "@api/simpleGet"
import { useParams, useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import getSvg from '@images/svg'
import { useState, useEffect } from 'react';
import InputCard from '@components/cards/InputCard'
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import useCity from '@scripts/custom_hooks/useCity';
import {
    ICity, ICityNormalized,
    CCityNormalized
} from '@myModels/pages/MSelectCity';
import { BaseApiResponseType } from '@myModels/api/BaseApiTypes';


function SelectCity() {
    const { data: rawCities, error: cError, isLoading: cIsLoading } = useSWR<BaseApiResponseType & {items: ICity[]}>(apiTags.city, simpleGet);

    const [searchItem, setSearchItem] = useState('')
    const [cities, setCities] = useState<ICityNormalized[]>()
    const [filteredCities, setFilteredCities] = useState<ICityNormalized[]>([new CCityNormalized()])

    const [selectedCity, setSelectedCity] = useState<ICityNormalized>()

    const methods = useForm();
    const { formState: { errors } } = methods;

    useEffect(() => {
        if (rawCities && rawCities.items) {
            const cityNames = rawCities.items.map(city => ({ "name": city.name, "id": city.id, "classifier_id": city.classifier_id }));
            setCities(cityNames);
        }
    }, [rawCities]);

    useEffect(() => {
        if (cities && Array.isArray(cities)) {
            const results = cities.filter(city =>
                city.name.toLowerCase().includes(searchItem.toLowerCase())
            );

            if (results.length === 0) {
                setFilteredCities(cities);
            } else {
                setFilteredCities(results);
            }
        }
    }, [searchItem, cities]);

    const {
        cross,
        search
    } = getSvg()

    const {
        isCityAdded,
        initCity
    } = useCity()

    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchItem(event.target.value);
    };
    const handleSave = () => {
        localStorage.setItem("city", JSON.stringify({ 'cityId': selectedCity?.id, 'cityName': selectedCity?.name, "classifier_id": selectedCity?.classifier_id }));
        initCity()
        navigate("/")
    }

    return (
        <>
            <main className="select-city select-city_props">
                <header className="select-city__header block-normalizer f-row">
                    {isCityAdded && <button className="select-city__header-button simple-button" onClick={() => navigate("/")}>{cross()}</button>}
                </header>
                <section className="select-city__content block-normalizer f-column">
                    <h1 className="select-city__article title-m">Выберите город</h1>
                    <FormProvider {...methods} >
                        <form className="select-city__form f-row">
                            <InputCard
                                type="SimpleInput"
                                dataName="city"
                                mask=""
                                replacement={undefined}
                                isShowMask={false}
                                inputType="text"
                                setPlaceholder="Введите город"
                                validationRules={{}}
                                setValue={searchItem}
                                setOnChange={handleChange}
                                setIcon={search(undefined, undefined, undefined, "select-city__search-icon")}
                                additionClass=""
                            />
                        </form>
                    </FormProvider>
                    <div className="select-city__options-holder f-column">
                        {filteredCities.map((city, index) => (
                            <button key={city.id} id={String(index)} className={`select-city__option simple-button ${selectedCity?.id === city.id && "select-city__option_selected"}`} onClick={() => setSelectedCity(city)}>{city.name}
                            </button>
                        ))}
                    </div>
                </section>
                <footer className="footer footer_props select-city__footer">
                    <nav className="footer__nav">
                        <button className={`footer__auth-btn button-l ${!selectedCity && "footer__auth-btn_inactive"}`} onClick={handleSave}>Сохранить</button>
                    </nav>
                </footer>
            </main>

        </>
    )
}
export default SelectCity;