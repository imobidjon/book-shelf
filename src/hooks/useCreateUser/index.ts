import {TParams} from "../../types";
import {useMutation} from "react-query";
import user from "../../api/user";

export const createUser = async (data?: any) => {
    try {
        const res = await user.create(data);
        return res.data.data;
    } catch (err: any) {
        throw err;
    }
};

export const useCreateUser = <T extends TParams>({onSuccess, onError}: any) => {
    return useMutation<any, Error, T>((data?: any) => {
            return createUser(data)
        },
        {onSuccess, onError}
    );
};