import {IBook, IBookObj, SBook} from "../../types";

export interface IBookCard {
    book: IBook;
    BookStatus: string | number,
}

export interface IRemovedBookData {
    data: IBookObj[];
    isOk: boolean;
    message: string;
}