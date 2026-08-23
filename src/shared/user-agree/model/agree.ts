import {useEffect, useState} from "react";

const agreeStorageName = 'cookies_agree';
const AGREE = 'accepted';
const REFUSE = 'refused';

export function useCookiesAgree() {
    const getInitialAgree = (): boolean | undefined => {
        const storage = localStorage.getItem(agreeStorageName);
        if (storage == AGREE) return true;
        if (storage == REFUSE) return false;
        return undefined;
    };

    const [agree, setAgree] = useState<boolean | undefined>(getInitialAgree());

    useEffect(() => {
        const storage = localStorage.getItem(agreeStorageName);
        if (storage == AGREE) setAgree(true);
        if (storage == REFUSE) setAgree(false);
    }, [])

    const changeAgree = (v: boolean) => {
        if (v) {
            setAgree(true);
            localStorage.setItem(agreeStorageName, AGREE);
        } else {
            setAgree(false);
            localStorage.setItem(agreeStorageName, REFUSE);
        }
    }

    return {
        agree,
        changeAgree
    }
}