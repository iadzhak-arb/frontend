import {useQuery, useQueryClient} from "@tanstack/react-query";
import {authClient} from "@shared/api";

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