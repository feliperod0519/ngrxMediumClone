import { createEffect,Actions,ofType } from "@ngrx/effects";
import { inject } from "@angular/core";
import { catchError,map,of,switchMap, tap } from "rxjs";
import { PopularTagService } from "../services/popularTag.services";
import { popularTagActions } from "./actions";
import { PopularTagType } from "../../../types/popularTagType";

export const getPopularTagsEffect = createEffect((
    actions$ = inject(Actions),
    popularTagsService = inject(PopularTagService)
)=>{
    return actions$.pipe(
                            ofType(popularTagActions.getPopularTags),
                            switchMap(()=>{
                                return popularTagsService.getPopularTags().pipe(
                                    map((popularTags:PopularTagType[])=>{
                                        return popularTagActions.getPopularTagsSuccess({popularTags})
                                    }),
                                    catchError(()=>{
                                        return of(popularTagActions.getPopularTagsFailute())
                                    })
                                )
                            }
                        )
    )
},{functional:true})