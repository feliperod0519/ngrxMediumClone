import { createFeature, createReducer, on } from "@ngrx/store";
import { popularTagActions } from "./actions";
import { routerNavigationAction } from "@ngrx/router-store";
import { PopularTagStateInterface } from "../types/popularTagsState.interface";

const initialState: PopularTagStateInterface = {
    isLoading: false,
    error: null,
    data: null
}

const popularTagsFeature = createFeature({
    name: 'popularTags',
    reducer: createReducer(
        initialState,
        on(popularTagActions.getPopularTags, (state)=>({...state,isLoading: true})),
        on(popularTagActions.getPopularTagsSuccess, (state, action)=>({...state,isLoading:false,data:action.popularTags})),
        on(popularTagActions.getPopularTagsFailute, (state)=>({...state, isLoading: false}))
    ),
})

export const {
    name: popularTagFeatureKey,
    reducer: popularTagReducer,
    selectIsLoading,
    selectError,
    selectData: selectPopularTagData
} = popularTagsFeature