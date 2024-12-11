export interface ISearchPage {
    type: string;
    isOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface ISearchPageQuerry {
    result: ISearchPageSingleQuerryEl[]
    searchContext: ISearchContext
}
interface ISearchContext {
    cityId: string;
    contentType: string;
    limit: number;
    query: string;
}
export interface ISearchPageSingleQuerryEl {
    cadnum: string;
    contentType: string;
    guid: string;
    id: string;
    ifnsfl: string;
    ifnsul: string;
    name: string;
    okato: string;
    oktmo: string;
    parentGuid: string;
    type: string;
    typeShort: string;
    zip: number;
}