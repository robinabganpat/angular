import { Component, Input, ViewContainerRef, ViewChild, ReflectiveInjector, ComponentFactoryResolver, Type, ViewRef, ComponentRef, Renderer } from '@angular/core';
import HelloWorldComponent from 'app/hello-world/hello-world.component';
import HlChartComponent from 'app/hl-chart/hl-chart.component';
import { BaseComponent } from "models/BaseComponent";

@Component({
    selector: 'dynamic-component',
    entryComponents: [
        HelloWorldComponent,
        HlChartComponent
    ], // Reference to the components must be here in order to dynamically create them
    templateUrl: './dynamic.component.html',
    styleUrls: ['./dynamic.component.css']
})
export default class DynamicComponent {
    currentComponents = new Array();
    componentCombo;
    // private renderer: Renderer;

    //ViewChild works with # of element...
    @ViewChild('dynamicComponentContainer', { read: ViewContainerRef })
    dynamicComponentContainer: ViewContainerRef;

    // See app.component.html => the [apps] param is retrieved here
    @Input() apps;

    ngOnInit() {
        this.createShells();

        //console.log(this.resolver['_factories'].keys());
    }

    onComboChanged() {
        console.log(this.componentCombo.inputs);
        this.addComponentToContainer(this.dynamicComponentContainer, this.componentCombo.component, this.componentCombo.inputs, 19, this.currentComponents);
    }

    createShells() {
        if (this.apps == null) {
            return;
        }
        let curr: number = 0;
        this.apps.forEach(element => {
            this.addComponentToContainer(this.dynamicComponentContainer, element.component, element.inputs, curr, this.currentComponents);
            curr++;
        });
        console.log(this.currentComponents);

        //let first: ComponentRef<HelloWorldComponent> = this.currentComponents.find((x: any) => x.instance.id === 1);

        //console.log(first);


        //this.currentComponents.find((x: any) => x.instance.id === 0).instance.graphName = "hello goodbye";
        //first.instance.balbal = "change text ayy";
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

        let inputProviders = Object.keys(inputs).map((inputName) => { return { provide: inputName, useValue: inputs[inputName] }; });
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

        this.renderer.setElementStyle(component.location.nativeElement, 'color', 'orange');
        this.renderer.setElementClass(component.location.nativeElement, 'testClass-' + uid, true);

        // component.location.nativeElement.style.backgroundColor = 'yellow';

        //console.log(component.location.nativeElement.offsetTop);
    }

    DestroyApps() {
        // Removes the components from the list of active components.
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

    constructor(private resolver: ComponentFactoryResolver, public renderer: Renderer) {

    }
}
