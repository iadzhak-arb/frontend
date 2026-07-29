import {type SyntheticEvent, useState} from "react";
import type {ApiError} from "@shared/api/client.ts";
import {useChangePassword} from "@pages/Profile/api/change-password.ts";
import {useChangeUser} from "@pages/Profile/api/change-user.ts";
import {useQueryClient} from "@tanstack/react-query";

type FormErrors = {
    first_name: string | null;
    last_name: string | null;
    new_password1: string | null;
    new_password2: string | null;
}

export function useHandlers() {
    const queryClient = useQueryClient();
    const [error, setError] = useState<FormErrors>({
        first_name: null,
        last_name: null,
        new_password1: null,
        new_password2: null
    })
    const changePassword = useChangePassword();
    const changeUser = useChangeUser();

    const handleSubmitData = (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const data = {
            first_name: form.get("first_name") as string,
            last_name: form.get("last_name") as string,
        }
        changeUser.mutate(data as any, {
            onSuccess: async () => {
                await queryClient.refetchQueries({queryKey: ['user']});
            },
            onError: (error: Error) => {
                const apiError = error as unknown as ApiError;
                setError(prev => ({
                    ...prev,
                    first_name: apiError?.data?.first_name,
                    last_name: apiError?.data?.last_name,
                }))
            }
        })
    };

    const handleSubmitPassword = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const data = {
            new_password1: form.get("new_password1") as string,
            new_password2: form.get("new_password2") as string,
        };
        if (data.new_password1 !== data.new_password2) {
            setError(prev => ({...prev, new_password2: 'Пароли не совпадают'}))
            return;
        }
        setError(prev => ({...prev, new_password1: null, new_password2: null}));
        changePassword.mutate(data, {
            onError: (error: Error) => {
                const apiError = error as unknown as ApiError;
                if (apiError?.data?.new_password2) {
                    setError(prev => ({...prev, new_password2: apiError?.data?.new_password2}))
                }
            }
        })
    };

    return {
        handleSubmitPassword,
        handleSubmitData,
        error
    }
}