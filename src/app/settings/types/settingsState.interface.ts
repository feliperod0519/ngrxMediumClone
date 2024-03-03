import {BackendErrorsInterface} from '../../auth/types/backendErrors' 

export interface SettingsStateInterface {
  isSubmitting: boolean
  validationErrors: BackendErrorsInterface | null
}
