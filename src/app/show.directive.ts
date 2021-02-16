import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
    selector:'[appShow]'
})

export class Show {
    @Input() set appShow(value: boolean) {
        if (value) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear()
        }

    }

    constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {}

}