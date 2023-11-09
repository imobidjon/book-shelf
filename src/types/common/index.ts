import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

export type TParams = {
    [key: string]: any;
};

export type ErrorType =
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;