import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { combineLatest } from "rxjs";
import { selectCurrentUser } from "../../../auth/store/reducers";
import { RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
    selector:'mc-topbar',
    templateUrl: './topBar.component.html',
    standalone: true,
    imports: [RouterLink, CommonModule]
})
export class TopBarComponent{
    data$ = combineLatest({
        currentUser: this.store.select(selectCurrentUser)
    })

    constructor(private store:Store){}
}