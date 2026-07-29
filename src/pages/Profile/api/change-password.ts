import {useMutation,} from "@tanstack/react-query";
import {client} from "@shared/api";

type ChangePasswordInput = {
    new_password1: string;
    new_password2: string;
}

export function useChangePassword() {
    return useMutation({
        mutationFn: async (input: ChangePasswordInput) => (
            await client.POST('/api/auth/password/change/', {
                body: input as any
            })
        )
    })
}
