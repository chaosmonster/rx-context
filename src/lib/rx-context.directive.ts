import {
  ChangeDetectorRef,
  Directive,
  EmbeddedViewRef,
  Input, OnChanges,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

@Directive({
  selector: '[rxContext][rxContextOn]'
})
export class RxContextDirective implements OnInit, OnChanges, OnDestroy {

  private _context = new RxContextContext();
  private _subscription: Subscription;

  private _defaultTemplateRef: TemplateRef<any> | null = null;
  private _errorTemplateRef: TemplateRef<any> | null = null;
  private _completeTemplateRef: TemplateRef<any> | null = null;
  private _emptyTemplateRef: TemplateRef<any> | null = null;
  private _defaultViewRef: EmbeddedViewRef<any> | null = null;
  private _errorViewRef: EmbeddedViewRef<any> | null = null;
  private _completeViewRef: EmbeddedViewRef<any> | null = null;
  private _emptyViewRef: EmbeddedViewRef<any> | null = null;

  @Input() rxContextOn: Observable<any>;

  @Input()
  set rxContextError(templateRef: TemplateRef<any>) {
    this._errorTemplateRef = templateRef;
    this._errorViewRef = null;
  }

  @Input()
  set rxContextComplete(templateRef: TemplateRef<any>) {
    this._completeTemplateRef = templateRef;
    this._completeViewRef = null;
  }

  @Input()
  set rxContextEmpty(templateRef: TemplateRef<any>) {
    this._emptyTemplateRef = templateRef;
    this._emptyViewRef = null;
  }

  constructor(private cdr: ChangeDetectorRef, private _viewContainer: ViewContainerRef, templateRef: TemplateRef<any>) {
    this._defaultTemplateRef = templateRef;
  }

  ngOnInit(): void {
    this._updateView();
    if (this.rxContextOn) {
      this._subscription = this.rxContextOn.subscribe((value) => {
          this._context.$implicit = value || null;
          this._updateView(RxContextViewType.DEFAULT);
        }, (err) => {
          if (this._errorTemplateRef) {
            this._context.$implicit = err;
            this._updateView(RxContextViewType.ERROR);
          }
        },
        () => {
          if (this._completeTemplateRef) {
            this._context.$implicit = null;
            this._updateView(RxContextViewType.COMPLETE);
          }
        });
    }
  }

  ngOnChanges(changes): void {
    // todo
  }

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  private _updateView(viewType?: RxContextViewType) {
    console.log('update: viewType', viewType);
    console.log('update: _context', this._context);
    if (this._context.$implicit) {
      // we have a value
      // if we have next and a defaultTemplate
      if (viewType === RxContextViewType.DEFAULT && this._defaultTemplateRef) {
        // clear all
        this._viewContainer.clear();
        this._errorViewRef = null;
        this._completeViewRef = null;
        this._emptyViewRef = null;
        // set defaultView
        this._defaultViewRef = this._viewContainer.createEmbeddedView(this._defaultTemplateRef, this._context);
      }
      // if we have an error and an errorTemplate
      if (viewType === RxContextViewType.ERROR && this._errorTemplateRef) {
        // clear all
        this._viewContainer.clear();
        this._defaultViewRef = null;
        this._completeViewRef = null;
        this._emptyViewRef = null;
        // set errorView
        this._errorViewRef = this._viewContainer.createEmbeddedView(this._errorTemplateRef, this._context);
      }

    } else {
      // we don't have a value
      // if we have completed and a completeTemplate
      if (viewType === RxContextViewType.COMPLETE && this._completeTemplateRef) {
        // clear all
        this._viewContainer.clear();
        this._defaultViewRef = null;
        this._errorViewRef = null;
        this._emptyViewRef = null;
        // set completeView
        this._completeViewRef = this._viewContainer.createEmbeddedView(this._completeTemplateRef, this._context);
      } else
      // if we have an emptyTemplate
      if (this._emptyTemplateRef) {
        // clear all
        this._viewContainer.clear();
        this._defaultViewRef = null;
        this._errorViewRef = null;
        this._completeViewRef = null;
        // set emptyView
        this._emptyViewRef = this._viewContainer.createEmbeddedView(this._emptyTemplateRef, this._context);
      }
    }
    // this.cdr.detectChanges();
  }
}

export class RxContextContext {
  $implicit: any = null;
}

export enum RxContextViewType {
  DEFAULT = 1,
  ERROR,
  COMPLETE
}