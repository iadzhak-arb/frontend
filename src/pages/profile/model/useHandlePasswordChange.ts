import {useState} from "react";
import type {ApiError} from "@shared/api/client.ts";
import {useChangePassword} from "@features/auth/useChangePassword.ts";

export function useHandlePasswordChange() {
    const [error, setError] = useState('');
    const changePassword = useChangePassword();

    const handleChangePassword = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const data = {
            new_password1: form.get("new_password1") as string,
            new_password2: form.get("new_password2") as string,
        };
        if (data.new_password1 !== data.new_password2) {
            setError('Пароли не совпадают');
            return;
        }
        setError('');
        changePassword.mutate({password: data.new_password1}, {
            onError: (error: Error) => {
                const apiError = error as unknown as ApiError;
                setError(apiError.data.detail.password)
            }
        })
    };

    return {
        error,
        handleChangePassword
    }
}