import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "@tanstack/react-router";
import {authClient} from "@shared/api";

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
