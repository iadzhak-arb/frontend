import {authClient} from "@shared/api";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "@tanstack/react-router";

type Login = {
    email: string;
    password: string;
    remember: boolean;
}
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

export function useUser() {
    const queryClient = useQueryClient();
    return useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            try {
                const {data} = await authClient.GET('/user/me');
                return data;
            } catch (error: any) {
                // Если 401 - не авторизован, сбрасываем кэш
                if (error?.response?.status === 401) {
                    queryClient.resetQueries({queryKey: ['user']});
                    return null;
                }
                // Пробрасываем другие ошибки
                throw error;
            }
        },
        retry: false
    });
}

export function useLogout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: async () => {
            return await authClient.POST('/logout', {});
        },
        onSuccess: async () => {
            queryClient.resetQueries({queryKey: ['user']});
            await navigate({to: '/'});
        },
        onError: () => {
            // Даже если logout не удался - сбрасываем данные и идем на главную
            queryClient.resetQueries({queryKey: ['user']});
            navigate({to: '/'});
        }
    });
}
