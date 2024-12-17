import '@styles/cards/ProductMessageCard.scss';
import { IProductMessageCard } from '@myModels/components/cards/MProductMessageCard';
import { Transition } from '@headlessui/react';
import { useEffect } from 'react';

const ProductMessageCard = ({ message, trigger, setTrigger }: IProductMessageCard) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            setTrigger(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, [trigger]);

    return (
        <Transition
            show={trigger}
            enter="prod-message-card_enter"
            enterFrom="prod-message-card_enter-from"
            enterTo="prod-message-card_to"
            leave="prod-message-card_leave"
            leaveFrom="prod-message-card_leave-from"
            leaveTo="prod-message-card_leave-to"
        >
            <div className="prod-message-card prod-message-card_props f-row">
                <span className="prod-message-card__text text-l">Сообщение: {message}</span>
            </div>
        </Transition>
    );
};

export default ProductMessageCard;
