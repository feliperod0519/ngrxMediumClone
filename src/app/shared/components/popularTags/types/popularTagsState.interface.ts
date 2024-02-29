import { PopularTagType } from "../../../types/popularTagType";

export interface PopularTagStateInterface{
    isLoading : boolean;
    error: string | null;
    data: PopularTagType[] | null;
}