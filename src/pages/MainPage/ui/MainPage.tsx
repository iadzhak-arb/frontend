import Divider from '@mui/material/Divider';
import Hero from './Hero.tsx';
import LogoCollection from './LogoCollection.tsx';
import FAQ from './FAQ.tsx';
import PricingFree from "@pages/MainPage/ui/PricingFree.tsx";
import Highlights from "./Highlights.tsx";
import {useActiveSection} from "@pages/MainPage/model/useActiveSection.ts";

const main = {
    id: 'main',
    name: 'Демо',
};


const prices = {
    id: 'prices',
    name: 'Цены'
};

const faq = {
    id: 'faq',
    name: 'Вопросы'
};


export function MainPage() {
    useActiveSection([main.id, prices.id, faq.id]);
    return (
        <>
            <Hero id={main.id}/>
            <div>
                <LogoCollection/>
                <Highlights/>
                <Divider/>
                <PricingFree id={prices.id}/>
                <Divider/>
                <FAQ id={faq.id}/>
                <Divider/>
            </div>
        </>
    );
}
