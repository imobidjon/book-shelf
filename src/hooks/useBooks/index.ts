import {TParams} from "../../types";
import {useMutation, useQuery} from "react-query";
import books from "../../api/book";
import {toast} from "react-toastify";

export const getAllBooks = async () => {
    try {
        const res = await books.getAll();
        return res.data;
    } catch (err: any) {
        console.log(err);
        throw err;
    }
};
export const useAllBooks = (params?: TParams) => {
    return useQuery(["get-all", params], () => getAllBooks());
};

export const getSearched = async (data: TParams) => {
    try {
        const res = await books.search(data);
        return res.data;
    } catch (err: any) {
        toast.error("Error", err?.message);
    }
};

export const addToLib = async (data: TParams) => {
    try {
        const res = await books.addToLibrary(data);
        return res.data;
    } catch (err: any) {
        toast.error("Error", err?.data?.message);
    }
};

export const removeFromLib = async (data: TParams) => {
    try {
        const res = await books.removeFromLibrary(data);
        return res.data;
    } catch (err: any) {
        toast.error("Error", err?.data?.message);
    }
};
export const editBook = async (data: TParams) => {
    try {
        const res = await books.editBook(data);
        return res.data;
    } catch (err: any) {
        toast.error("Error", err?.data?.message);
    }
};

export const useSearch = <T extends TParams>({onSuccess, onError}: any) => {
    return useMutation<any, Error, T>((data?: any) => {
            return getSearched(data)
        },
        {onSuccess, onError}
    );
};

export const useAddToLibrary = <T extends TParams>({onSuccess, onError}: any) => {
    return useMutation<any, Error, T>((data?: any) => {
            return addToLib(data)
        },
        {onSuccess, onError}
    );
};

export const useRemoveFromLibrary = <T extends TParams>({onSuccess, onError}: any) => {
    return useMutation<any, Error, T>((data?: any) => {
            return removeFromLib(data)
        },
        {onSuccess, onError}
    );
};

export const useEditBook = <T extends TParams>({onSuccess, onError}: any) => {
    return useMutation<any, Error, T>((data?: any) => {
            return editBook(data)
        },
        {onSuccess, onError}
    );
};