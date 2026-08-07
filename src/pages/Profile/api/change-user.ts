import {useMutation} from "@tanstack/react-query";
import {authClient} from "@shared/api";


export function useChangeUser() {
    return useMutation({
        mutationFn: async (data) => {
            await authClient.PUT('/api/auth/user/', {
                body: data
            })
        }
    })
}