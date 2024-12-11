import '@styles/pages/SearchPage.scss';
import { kladrGet } from "@api/kladrGet"
import { useLocation } from 'react-router-dom';
import useSWR from 'swr';
import getSvg from '@images/svg'
import { useState } from 'react';
import InputCard from '@components/cards/InputCard'
import useCity from '@scripts/custom_hooks/useCity';
import { CAddressState } from '@myModels/pages/MAddAddress';
import { ISearchPageSingleQuerryEl, ISearchPageQuerry, ISearchPage } from '@myModels/pages/MSearchPage';
import { DialogPanel } from '@headlessui/react'

function SearchPage({ type, isOpen }: ISearchPage ) {
  const { cityData } = useCity();
  const [searchItem, setSearchItem] = useState('');
  const location = useLocation();
  
  const addressState = new CAddressState(location.state || "");

  const { arrow, search } = getSvg();

  const { data: querryData, error: qError } = useSWR<ISearchPageQuerry>(
    searchItem && type === "street"
      ? `query=${searchItem}&contentType=street&cityId=${cityData.classifier_id}&limit=10`
      : searchItem && type === "house"
        ? `query=${searchItem}&streetId=${addressState.selectedStreetId}&contentType=building&limit=10`
        : null,
        (url: string) => kladrGet(url) as Promise<ISearchPageQuerry> 
  );

  const handleSave = (element: ISearchPageSingleQuerryEl) => {
    console.log(querryData)
    let newState;
    if (type === "street") {
      newState = new CAddressState()
      newState = {
        ...newState,
        selectedStreetName: `${element.typeShort}. ${element.name}`,
        selectedStreetId: element.id,
      };
    }

    if (type === "house") {
      newState = { ...location.state };
      newState = {
        ...newState,
        selectedHouseName: `${element.typeShort}. ${element.name}`,
        selectedStreetShortName: element.name,
        selectedHouseId: element.id,
      };
      
    }
    location.state = newState;
    isOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchItem(event.target.value);
  };

  return (
      <DialogPanel className="search-page search-page_props">
        <section className="search-page__content block-normalizer f-column">
          <form className="search-page__form f-row gap-16">
            <button
              className="search-page__header-button simple-button"
              onClick={() => isOpen(false)}
            >
              {arrow("var(--white)")}
            </button>
            <InputCard
              type="SimpleInput"
              inputType="text"
              setPlaceholder={type === "street" ? "Введите название улицы" : "Введите номер дома"}
              setValue={searchItem}
              setOnChange={handleChange}
              setIcon={search(undefined, undefined, undefined, "search-page__search-icon")}
            />
          </form>
          <div className="search-page__options-holder f-column">
            {querryData?.result?.slice(1).map((element: ISearchPageSingleQuerryEl) => (
              <button
                key={element.guid}
                className="search-page__option simple-button"
                onClick={() => handleSave(element)}
              >
                {`${element.typeShort}. ${element.name}`}
              </button>
            ))}
          </div>
        </section>
      </DialogPanel>
  );
}

export default SearchPage;
