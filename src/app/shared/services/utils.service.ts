import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class UtilsService{
    range(start:number, end:number):number[]{
        // console.log(start)
        // console.log(end)
        // console.log([...Array(end-start).keys()])
        return [...Array(end-start).keys()].map((e)=>e+start)
    }
}