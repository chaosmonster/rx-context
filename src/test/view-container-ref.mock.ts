import {
  ComponentFactory,
  ComponentRef,
  ElementRef,
  EmbeddedViewRef,
  Injector,
  TemplateRef,
  ViewContainerRef,
  ViewRef
} from '@angular/core';

export class ViewContainerRefMock extends ViewContainerRef {
  injector: Injector;
  parentInjector: Injector;
  length: number;

  _element: ElementRef = {
    nativeElement: {
      scrollTop: 1,
      getBoundingClientRect: function () {
        return {bottom: 60, height: 130, left: 0, right: 40, top: -50, width: 40};
      }
    }
  };

  constructor() {
    super();
  }

  clear(): void {
  }

  get(index: number): ViewRef {
    return undefined;
  }

  createEmbeddedView<C>(templateRef: TemplateRef<C>, context?: C, index?: number): EmbeddedViewRef<C> {
    return undefined;
  }

  createComponent<C>(componentFactory: ComponentFactory<C>,
                     index?: number,
                     injector?: Injector,
                     projectableNodes?: any[][]): ComponentRef<C> {
    return undefined;
  }

  insert(viewRef: ViewRef, index?: number): ViewRef {
    return undefined;
  }

  move(viewRef: ViewRef, currentIndex: number): ViewRef {
    return undefined;
  }

  indexOf(viewRef: ViewRef): number {
    return undefined;
  }

  remove(index?: number): void {
  }

  detach(index?: number): ViewRef {
    return undefined;
  }

  get element(): ElementRef {
    return this._element;
  }
}
