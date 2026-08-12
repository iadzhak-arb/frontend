import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "@tanstack/react-router";
import {authClient} from "@shared/api";

type Login = {
    email: string;
    password: string;
    remember: boolean;
}

export function useLogin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: async (data: Login) => {
            return await authClient.POST('/login', {body: data as any});
        },
        onSuccess: async () => {
            queryClient.resetQueries({queryKey: ['user']});
            await navigate({to: '/'});
        },
    })
}
