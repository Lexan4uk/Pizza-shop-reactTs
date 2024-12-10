import '@styles/pages/SearchPage.scss';
import { kladrGet } from "@api/kladrGet"
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import useSWR from 'swr';
import getSvg from '@images/svg'
import { useState, useEffect } from 'react';
import InputCard from '@components/cards/InputCard'
import useCity from '@scripts/custom_hooks/useCity';
import { CAddressState } from '@myModels/pages/MAddAddress';
import { ISearchPageSingleQuerryEl, ISearchPageQuerry } from '@myModels/pages/MSearchPage';

function SearchPage() {
  const { type } = useParams();
  const { cityData } = useCity();
  const [searchItem, setSearchItem] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  
  const addressState = new CAddressState(location.state || "");

  const { arrow, search } = getSvg();

  const { data: querryData, error: qError } = useSWR<ISearchPageQuerry>(
    searchItem && type === "street"
      ? `query=${searchItem}&contentType=street&cityId=${cityData.classifier_id}&limit=10`
      : searchItem && type === "house"
        ? `query=${searchItem}&streetId=${addressState.selectedStreetId}&contentType=building&limit=10`
        : null,
    kladrGet
  );

  const handleSave = (element: ISearchPageSingleQuerryEl) => {
    console.log(element)
    let newState = { ...location.state };
    if (type === "street") {
      //console.log(newState)
      newState = {
        ...newState,
        selectedStreetName: `${element.typeShort}. ${element.name}`,
        selectedStreetId: element.id,
      };
    }

    if (type === "house") {
      //console.log(newState)
      newState = {
        ...newState,
        selectedHouseName: `${element.typeShort}. ${element.name}`,
        selectedHouseId: element.id,
      };
    }
    navigate("/profile/addresses/add", { state: newState });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchItem(event.target.value);
  };

  return (
    <>
      <main className="search-page search-page_props">
        <section className="search-page__content block-normalizer f-column">
          <form className="search-page__form f-row gap-16">
            <button
              className="search-page__header-button simple-button"
              onClick={() => navigate("/profile/addresses/add")}
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
      </main>
    </>
  );
}

export default SearchPage;
