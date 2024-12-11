export interface ILoginData {
    birth_day: string;
    email: string;
    first_name: string;
    id: string;
    phone_number: string;
    wallets: ILoginWallets[];
}
interface ILoginWallets {
    id: number;
    name: string;
    balance: number;
}