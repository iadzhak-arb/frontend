import {useMutation} from "@tanstack/react-query";
import {authClient} from "@shared/api";
import {type components} from "@shared/api/schema-auth.ts";

type UserChangePassword = components['schemas']['UserChangePassword']

export function useChangePassword() {
    return useMutation({
        mutationFn: async (data: UserChangePassword) => {
            return await authClient.PUT('/user/change-password', {body: data});
        }
    })
}
