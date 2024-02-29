import { Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { PopularTagType } from "../../../types/popularTagType";
import { GetPopularTagsResponseInterface } from "../types/getPopularTagsResponse.interface";

@Injectable({
    providedIn: 'root'
})
export class PopularTagService{

    constructor(private http:HttpClient){}

    getPopularTags():Observable<PopularTagType[]>{
        const url = environment.apiUrl + '/tags';
        return this.http.get<GetPopularTagsResponseInterface>(url).pipe(map((response)=>response.tags))
    }
}