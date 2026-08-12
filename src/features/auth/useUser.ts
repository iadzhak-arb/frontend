import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {authClient} from "@shared/api";
import {type components} from "@shared/api/schema-auth.ts";

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

type UserChange = components['schemas']['UserUpdate']

export function useUserChange() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: UserChange) => {
            return await authClient.PUT('/user/me', {body: data});
        },
        onSuccess: () => queryClient.refetchQueries({queryKey: ['user']})
    })
}
