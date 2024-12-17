export interface IProductMessageCard {
    message: string,
    trigger: boolean,
    setTrigger: React.Dispatch<React.SetStateAction<boolean>>
}