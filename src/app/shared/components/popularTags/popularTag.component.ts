import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { popularTagActions } from "./store/actions";
import { combineLatest } from "rxjs";
import { selectIsLoading, selectPopularTagData, selectError } from "./store/reducers";
import { CommonModule } from "@angular/common";
import { LoadingMessageComponent } from "../loadingMessage/loadingMessage.component";
import { ErrorMessageComponent } from "../errorMessage/errorMessage.component";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'mc-popular-tags',
    templateUrl: './popularTag.component.html',
    standalone: true,
    imports: [CommonModule, LoadingMessageComponent, ErrorMessageComponent, RouterLink]
})
export class PopularTagsComponent implements OnInit{

    data$ = combineLatest({
        popularTags: this.store.select(selectPopularTagData),
        isLoading: this.store.select(selectIsLoading),
        error: this.store.select(selectError)
    })
    constructor(private store: Store){}

    ngOnInit(): void {
        this.store.dispatch(popularTagActions.getPopularTags());
    }
}