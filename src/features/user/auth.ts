import {client} from "@shared/api";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "@tanstack/react-router";

type Login = {
    email: string;
    password: string;
}
type Register = {
    first_name: string;
    email: string;
    password1: string;
    password2: string;
};


export function useRegistration() {
    return useMutation({
        mutationFn: async (data: Register) => {
            return await client.POST('/api/users/registration', {body: data as any})
        }
    })
}

export function useLogin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: async (data: Login) => {
            return await client.POST('/api/users/login', {body: data as any});
        },
        onSuccess: async () => {
            queryClient.resetQueries({queryKey: ['user']});
            await navigate({to: '/'});
        },
        onError: (error: any) => {
            // Здесь можно добавить логирование или обработку конкретных ошибок
            console.error('Ошибка логина:', error);
        },
    })
}

export function useUser() {
    const queryClient = useQueryClient();
    return useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            try {
                const {data} = await client.GET('/api/users/me');
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
            return await client.POST('/api/users/logout');
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
