import {useMutation,} from "@tanstack/react-query";
import {authClient} from "@shared/api";

type ChangePasswordInput = {
    new_password1: string;
    new_password2: string;
}

export function useChangePassword() {
    return useMutation({
        mutationFn: async (input: ChangePasswordInput) => (
            await authClient.POST('/api/auth/password/change/', {
                body: input as any
            })
        )
    })
}
