import { BackendErrorsInterface } from "../../auth/types/backendErrors";

export interface CreateArticleStateInterface{
    isSubmitting: boolean;
    validationErrors : BackendErrorsInterface | null;
}