import {type SyntheticEvent, useState} from "react";
import type {ApiError} from "@shared/api/client.ts";
import {useUserChange} from "@features/auth/useUser.ts";

export function useHandleUserChange() {
    const userChange = useUserChange();
    const [errors, setErrors] = useState({})
    const handleUserChange = (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const data = {
            first_name: form.get("first_name") as string,
            last_name: form.get("last_name") as string,
        }
        userChange.mutate(data as any, {
            onError: (error: Error) => {
                const apiError = error as unknown as ApiError;
                setErrors(prev => ({
                    ...prev,
                    first_name: apiError?.data?.first_name,
                    last_name: apiError?.data?.last_name,
                }))
            }
        })
    };
    return {
        handleUserChange,
        errors
    }
}