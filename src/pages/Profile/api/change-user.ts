import {useMutation} from "@tanstack/react-query";
import {client, type components} from "@shared/api";

type InputData = components['schemas']['User']

export function useChangeUser() {
    return useMutation({
        mutationFn: async (data: InputData) => {
            await client.PUT('/api/auth/user/', {
                body: data
            })
        }
    })
}