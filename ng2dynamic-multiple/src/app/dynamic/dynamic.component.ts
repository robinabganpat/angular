import { Component, Input, ViewContainerRef, ViewChild, ReflectiveInjector, ComponentFactoryResolver, Type, ViewRef, ComponentRef, Renderer } from '@angular/core';
import { BaseComponent } from "models/BaseComponent";
import { DynamicService } from "app/dynamic/dynamic.service"
import { testModule } from "app/dynamic/test.module";

let componentsToLoad = DynamicService.getEntryComponents()

@Component({
    
    selector: 'dynamic-component',
    entryComponents: testModule.withComponents([]),
    // entryComponents: [
    // ], // Reference to the components must be here in order to dynamically create them
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
    }

    onComboChanged() {
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

        // let first: ComponentRef<HelloWorldComponent> = this.currentComponents.find((x: any) => x.instance.id === 1);

        // console.log(first);
        // this.currentComponents.find((x: any) => x.instance.id === 0).instance.graphName = "hello goodbye";
        // first.instance.balbal = "change text ayy";
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
        console.log(component.location);
        console.log(component.instance);
        // // We insert the component into the dom container
        vcRef.insert(component.hostView);

        if (addToList != null) {
            addToList.push(component);
        }

        //We should contain a list of all the current shown components.
        //Using the ComponentRef, we have access to the DOM element, ViewRef and instance.
        //This allows us to do modificiations on a shown component, on-runtime.
        this.renderer.setElementAttribute(component.location.nativeElement, "id", "app-instance-" + uid);
        this.renderer.setElementStyle(component.location.nativeElement, 'color', 'orange');
        this.renderer.setElementClass(component.location.nativeElement, 'testClass-' + uid, true);
        // component.location.nativeElement.style.backgroundColor = 'yellow';
        console.log(component.location.nativeElement.offsetTop);
    }

    DestroyApps() {
        this.currentComponents.forEach(comp => {
            comp.destroy();
        })
    }

    RefreshApps() {
        console.log(this.currentComponents);
        this.currentComponents[0].destroy();
    }

    ChangeOrder2() {
        this.changeOrder(this.dynamicComponentContainer);
    }

    constructor(private resolver: ComponentFactoryResolver, private dynamicService: DynamicService, public renderer: Renderer) {
        // this.renderer = renderer;
        this.dynamicService = dynamicService;
     }
}
