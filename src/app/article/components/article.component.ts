import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Store } from "@ngrx/store";
import { ArticleActions } from "../store/actions";
import { combineLatest, filter, map } from "rxjs";
import { selectArticleData, selectError, selectIsLoading } from "../store/reducers";
import { selectCurrentUser } from "../../auth/store/reducers";
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { CommonModule } from "@angular/common";
import { ErrorMessageComponent } from "../../shared/components/errorMessage/errorMessage.component";
import { LoadingMessageComponent } from "../../shared/components/loadingMessage/loadingMessage.component";
import { TagListComponent } from "../../shared/components/tagList/tagList.component";

@Component({
    selector: 'mc-article',
    templateUrl: './article.component.html',
    standalone: true,
    imports: [CommonModule, RouterLink, ErrorMessageComponent, LoadingMessageComponent, TagListComponent ]
})
export class ArticleComponent implements OnInit{

    slug = this.route.snapshot.paramMap.get('slug') ?? '';
    isAuthor$ = combineLatest({
        article: this.store.select(selectArticleData),
        currentUser: this.store.select(selectCurrentUser).pipe(
            filter(
                (currentUser): currentUser is CurrentUserInterface | null => currentUser != null
            )
        )
        }).pipe(
            map(({article,currentUser})=>{
                if (!article || !currentUser){
                    return false
                }
                return article.author.username === currentUser.username
            })
    )
    data$ = combineLatest({
        isLoading: this.store.select(selectIsLoading),
        error: this.store.select(selectError),
        article: this.store.select(selectArticleData),
        isAuthor : this.isAuthor$
    })
    

    constructor(private store: Store, private route:ActivatedRoute){      
    }

    ngOnInit():void{
        this.store.dispatch(ArticleActions.getArticle({slug:this.slug}));
    }

    deleteArticle():void{
        this.store.dispatch(ArticleActions.deleteArticle({slug:this.slug}));
    }

}