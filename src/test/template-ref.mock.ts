import {ElementRef, EmbeddedViewRef, TemplateRef} from '@angular/core';

export class TemplateRefMock<C> extends TemplateRef<C> {
  elementRef: ElementRef = null;

  createEmbeddedView(context: C): EmbeddedViewRef<C> {
    return undefined;
  }
}
