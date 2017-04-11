import { NgModule, ANALYZE_FOR_ENTRY_COMPONENTS, Type } from "@angular/core";

@NgModule({
    declarations: [],
    exports: []
})
export class testModule {
    static withComponents(components: Type<any>[]) {
        return {
            ngModule: testModule,
            providers: [
                {provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: components, multi: true}
            ]
        }
    }
}