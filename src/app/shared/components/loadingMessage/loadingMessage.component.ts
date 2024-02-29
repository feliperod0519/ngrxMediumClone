import { Component } from "@angular/core";

@Component({ 
                selector: 'mc-loading',
                template: '<div>{{message}}</div>',
                standalone: true
            })
export class LoadingMessageComponent{
    message: string = 'Loading...'
}