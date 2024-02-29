import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { Store } from "@ngrx/store";
import { feedActions } from "./store/actions";
import { combineLatest } from "rxjs";
import { selectError, selectFeedData, selectIsLoading } from "./store/reducers";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Params, Router, RouterModule } from "@angular/router";
import { ErrorMessageComponent } from "../errorMessage/errorMessage.component";
import { LoadingMessageComponent } from "../loadingMessage/loadingMessage.component";
import { environment } from "../../../../environments/environment";
import { PaginationComponent } from "../pagination/pagination.component";
import queryString from "query-string";
import { TagListComponent } from "../tagList/tagList.component";

@Component({
    selector:'mc-feed',
    templateUrl: './feed.component.html',
    standalone: true,
    imports : [CommonModule, RouterModule, ErrorMessageComponent, LoadingMessageComponent, PaginationComponent, TagListComponent]
})
export class FeedComponent implements OnInit, OnChanges{
    
    @Input() apiUrl: string = '';

    data$ = combineLatest({
        isLoading: this.store.select(selectIsLoading),
        error: this.store.select(selectError),
        feed: this.store.select(selectFeedData)
    })

    limit = environment.limit;
    baseUrl = this.router.url.split('?')[0];
    currentPage: number = 0;

    constructor(private store: Store, private router: Router, private route: ActivatedRoute){}
    
    ngOnInit(): void {
        this.store.dispatch(feedActions.getFeed({url:this.apiUrl}));
        this.route.queryParams.subscribe((params:Params)=>{
            //{page:'1'}
            this.currentPage = Number(params['page'] || '1');
            this.fetchFeed();
        })
    }

    ngOnChanges(changes: SimpleChanges): void {
        const isApiUrlChanged = !changes['apiUrl'].firstChange && changes['apiUrl'].currentValue !== changes['apiUrl'].previousValue
        if (isApiUrlChanged){
            this.fetchFeed();
        }
    }

    fetchFeed():void{
        //Offset implementation
        // /articles?limit=20&offset=0
        // page 1 - 0
        // page 2 - 20
        // page 3 - 40
        const offset = this.currentPage * this.limit - this.limit
        const parseUrl = queryString.parseUrl(this.apiUrl)
        console.log('parseUrl',parseUrl)
        const stringifiedParams = queryString.stringify(
            {
                limit : this.limit,
                offset,
                ...parseUrl.query
            });
        const apiUrlWithParams = `${parseUrl.url}?${stringifiedParams}`
        this.store.dispatch(feedActions.getFeed({url: apiUrlWithParams}))
        

    }
}