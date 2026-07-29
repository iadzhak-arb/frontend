import {Outlet} from "@tanstack/react-router";
import AppAppBar from "./AppAppBar.tsx";
import Footer from "./Footer.tsx";


export function BaseLayout() {
    return (
        <>
            <AppAppBar/>
            <Outlet/>
            <Footer/>
        </>
    )
}