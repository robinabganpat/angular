import { Component, Input, ViewContainerRef, ViewChild, ReflectiveInjector, ComponentFactoryResolver, Type, ViewRef, ComponentRef, Renderer } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { ContentDto } from "models/ContentDto";
import { ApplicationDto } from "models/ApplicationDto";

import { BaseComponent } from "models/BaseComponent";
import { HelloWorldComponent } from 'app/dashboard/hello-world/hello-world.component';
import { HlChartComponent } from 'app/dashboard/hl-chart/hl-chart.component';
import { ContentService } from "services/content.service";
import { ApplicationService } from "services/application.service";

@Component({
    selector: 'dynamic-component',
    entryComponents: [
        HelloWorldComponent,
        HlChartComponent
    ], // Reference to the components must be here in order to dynamically create them
    templateUrl: './dynamic.component.html',
    styleUrls: ['./dynamic.component.css'],
})
export class DynamicComponent {
    currentComponents = new Array();
    componentCombo;

    contentList: ContentDto[];
    applicationList: ApplicationDto[];

    errorMessage = "";
    // private renderer: Renderer;
    
    // Multiple instances of DynamicComponent work! the unique Id is not a problem.
    @ViewChild('dynamicComponentContainer', { read: ViewContainerRef })
    dynamicComponentContainer: ViewContainerRef;

    // See app.component.html => the [apps] param is retrieved here
    @Input() userId;

    constructor(
        private resolver: ComponentFactoryResolver,
        public renderer: Renderer,
        private ContentService: ContentService,
        private ApplicationService: ApplicationService
    ) { }

    ngOnInit() {
        // Fetch a list of possible components.
        this.ApplicationService.getApplications().subscribe(result => {

            this.applicationList = result;
            console.log("Get Applications SUCCESS");

            //RESOLVE: call when these two requests return successfully.
            this.createShells();
        }, err => this.errorMessage = <any>err);

        // Fetch a list of contents.
        this.ContentService.getContents(this.userId).subscribe(result => {

            this.contentList = result;
            console.log("Get Contents SUCCESS");

            //RESOLVE: call when these two requests return successfully.
            this.createShells();
        }, err => this.errorMessage = <any>err);
    }

    createShells() {
        console.log("Creating components...");
        if (this.applicationList == undefined || this.contentList == undefined) {
            console.log("One request has not returned yet.")
            return;
        }

        if (this.contentList.length == 0) {
            this.errorMessage = "There are no contents to display";
            return;
        }

        let index: number = 0;
        this.contentList.forEach((content: ContentDto) => {
            let componentModule = this.applicationList.find((a: ApplicationDto) => a.applicationId == content.applicationId).module;

            this.addComponentToContainer(this.dynamicComponentContainer, componentModule, JSON.parse(content.settings), index, this.currentComponents);
        });
    }

    onComboChanged() {
        console.log(this.componentCombo.inputs);
        this.addComponentToContainer(this.dynamicComponentContainer, this.componentCombo.component, this.componentCombo.inputs, 19, this.currentComponents);
    }

    changeOrder(vcRef: ViewContainerRef) {
        for (let i = 0; i < vcRef.length; i++) {
            vcRef.move(vcRef.get(i), i - 1);
            let v: ViewRef = vcRef.get(i);
        }
    }

    accessViewRef<T>(componentRef: ComponentRef<T>, callback: Function) {
        callback(componentRef);
    }

    addComponentToContainer(vcRef: ViewContainerRef, componentType: any, inputs: any, uid: number, addToList: any[] = null): void {
        var factories = Array.from(this.resolver['_factories'].keys());
        var modelType = <Type<any>>factories.find((x: any) => x.name === componentType);

        let inputProviders = Object.keys(inputs).map((inputName) => {
            return {
                provide: inputName, useValue: inputs[inputName]
            };
        });
        let resolvedInputs = ReflectiveInjector.resolve(inputProviders);

        // We create an injector out of the data we want to pass down and this components injector
        let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.dynamicComponentContainer.parentInjector);

        // We create a factory out of the component we want to create
        let factory = this.resolver.resolveComponentFactory(modelType);

        // We create the component using the factory and the injector
        let component = factory.create(injector);
        component.instance.id = uid;


        //(<BaseComponent>component.instance).id = uid;


        // console.log(component.location);
        // console.log(component.instance);


        // // We insert the component into the dom container
        vcRef.insert(component.hostView);

        if (addToList != null) {
            addToList.push(component);
        }

        //We should contain a list of all the current shown components.
        //Using the ComponentRef, we have access to the DOM element, ViewRef and instance.
        //This allows us to do modifications on a shown component, on-runtime.

        this.renderer.setElementStyle(component.location.nativeElement, 'color', 'grey');
        this.renderer.setElementClass(component.location.nativeElement, 'testClass-' + uid, true);

        // component.location.nativeElement.style.backgroundColor = 'yellow';

        //console.log(component.location.nativeElement.offsetTop);
    }

    DestroyApps() {
        // Removes the components from the local list of components that are displayed.
        this.currentComponents = new Array();

        // Removes the components from the view.
        this.dynamicComponentContainer.clear()
    }

    RefreshApps() {
        this.createShells();
    }

    ChangeOrder2() {
        this.changeOrder(this.dynamicComponentContainer);
    }

    ListElements() {
        console.log("currentComponents values:");
        this.currentComponents.forEach(component => {
            console.log(component);
        })

        console.log("dynamicComponentContainer values:");
        for (var index = 0; index < this.dynamicComponentContainer.length; index++) {
            console.log(this.dynamicComponentContainer.get(index));
        }
    }
}
