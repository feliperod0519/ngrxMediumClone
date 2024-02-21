import { Injectable } from "@angular/core";
import {delay,Observable,of} from 'rxjs';
import { TodoInterface } from "../types/todo.interface";

@Injectable({
    providedIn:'root'
})
export class TodoService{
    getAll():Observable<TodoInterface[]>{
        return of([
            {id:1,description:'description 1',completed:false},
            {id:2,description:'description 2',completed:true},
        ]).pipe(delay(2000))
    }
}