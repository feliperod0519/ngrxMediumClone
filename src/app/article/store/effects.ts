import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ArticleInterface } from "../../shared/types/article.interface";
import { ArticleActions } from "./actions";
import { inject } from "@angular/core";
import { ArticleService as SharedArticleService }  from "../../shared/services/article.service";
import { switchMap,map, catchError,of, tap } from "rxjs";
import { ArticleService } from "../services/article.service";
import { Router } from "@angular/router";

export const articleEffect = createEffect(
    (
        actions$ = inject(Actions),
        articleService = inject(SharedArticleService)
    ) =>{
        return actions$.pipe(
            ofType(ArticleActions.getArticle),
            switchMap(({slug})=>{
                return articleService.getArticle(slug).pipe(
                    map((article:ArticleInterface)=>{
                        return ArticleActions.getArticleSuccess({article})
                    }),
                    catchError(()=>{
                        return of(ArticleActions.getArticleFailure)
                    })
                )
            })
        )
    }, {functional:true}
)

export const deleteArticleEffect = createEffect(
    (
        actions$ = inject(Actions),
        articleService = inject(ArticleService)
    ) =>{
        return actions$.pipe(
            ofType(ArticleActions.getArticle),
            switchMap(({slug})=>{
                return articleService.deleteArticle(slug).pipe(
                    map(()=>{
                        return ArticleActions.deleteArticleSuccess()
                    }),
                    catchError(()=>{
                        return of(ArticleActions.deleteArticleFailure)
                    })
                )
            })
        )
    }, {functional:true}
)

export const redirectAfterDeleteEffect = createEffect(
    (
        actions$ = inject(Actions),
        router = inject(Router)
    )=>{
        return actions$.pipe(
            ofType(ArticleActions.deleteArticleSuccess),
            tap(()=>{
                router.navigateByUrl('/')
            })
        )
    }, {functional:true, dispatch: false}
)