import {TParams} from "../../types";
import {useMutation, useQuery} from "react-query";
import user from "../../api/user";

export const getMyData = async (data?:any) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const res = await user.myself(data);
        return res.data.data;
    } catch (err: any) {
        throw err;
    }
};
export const useLogin = (params?: TParams) => {
    return useQuery(["get-myself", params], () => getMyData({}),params);
};


export const useLoginMyself = <T extends TParams>(
    {
        onSuccess,
        onError,
    }: any) => {
    return useMutation<any, Error, T>(
        (data?:any) => {
            return getMyData(data);
        },
        {
            onSuccess,
            onError,
        }
    );
};