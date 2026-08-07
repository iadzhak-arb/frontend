import {useMutation} from "@tanstack/react-query";
import {authClient} from "@shared/api";


type Register = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
};

export function useRegistration() {
    return useMutation({
        mutationFn: async (data: Register) => {
            return await authClient.POST('/registration', {body: data as any})
        }
    })
}
