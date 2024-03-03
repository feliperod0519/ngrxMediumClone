import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ArticleFormValuesInterface } from "./types/articleFormValues.interface";
import { BackendErrorMessages } from "../backendErrorMessages/backendErrorMessages.component";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { BackendErrorsInterface } from "../../../auth/types/backendErrors";

@Component({
    selector: 'mc-article-form',
    templateUrl : './articleForm.component.html',
    standalone : true,
    imports: [BackendErrorMessages, ReactiveFormsModule, CommonModule]
})
export class ArticleFormComponent implements OnInit{
    @Input() initialValues?: ArticleFormValuesInterface
    @Input() isSubmitting: boolean = false
    @Input() errors: BackendErrorsInterface | null = null

    @Output() articleSubmit = new EventEmitter<ArticleFormValuesInterface>();

    form = this.fb.nonNullable.group({
        title: '',
        description: '',
        body: '',
        tagList: ''
    })

    constructor(private fb: FormBuilder){
    }

    ngOnInit(): void {
        
    }

    initializeForm():void{
        if (!this.initialValues){
            throw new Error('Inputs are not available')
        }
        this.form.patchValue({
            title: this.initialValues.title,
            description: this.initialValues.description,
            body: this.initialValues.body,
            tagList: this.initialValues.tagList.join(' ')
        })
    }

    onSubmit():void{
        const articleFormValues: ArticleFormValuesInterface = {
            ...this.form.getRawValue(),
            tagList: this.form.getRawValue().tagList.split(' ')
        }
        this.articleSubmit.emit(articleFormValues);
    }
}