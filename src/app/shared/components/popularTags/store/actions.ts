import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { PopularTagType } from "../../../types/popularTagType";

export const popularTagActions = createActionGroup({
    source: 'popularTags',
    events: {
        'Get popular tags': emptyProps(),
        'Get popular tags success': props<{popularTags: PopularTagType[]}>(),
        'Get popular tags failute': emptyProps()
    }
})