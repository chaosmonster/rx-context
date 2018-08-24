import {
  Directive,
  EmbeddedViewRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import {Observable, Subscription} from 'rxjs';

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

  constructor(private _viewContainer: ViewContainerRef, templateRef: TemplateRef<any>) {
    this._defaultTemplateRef = templateRef;
  }

  ngOnInit(): void {
    this._updateView();
    if (this.rxContextOn) {
      this._handleSubscription();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.rxContextOn.firstChange) {
      if (this._subscription) {
        this._subscription.unsubscribe();
      }
      if (this.rxContextOn) {
        this._handleSubscription();
      } else {
        this._updateView(RxContextViewType.EMPTY);
      }
    }
  }

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  private _handleSubscription() {
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

  private _updateView(viewType?: RxContextViewType) {
    if (this._context.$implicit !== null && viewType === RxContextViewType.DEFAULT && this._defaultTemplateRef) {
      this._viewContainer.clear();
      this._errorViewRef = null;
      this._completeViewRef = null;
      this._emptyViewRef = null;
      this._defaultViewRef = this._viewContainer.createEmbeddedView(this._defaultTemplateRef, this._context);
    }
    if (this._context.$implicit !== null && viewType === RxContextViewType.ERROR && this._errorTemplateRef) {
      this._viewContainer.clear();
      this._defaultViewRef = null;
      this._completeViewRef = null;
      this._emptyViewRef = null;
      this._errorViewRef = this._viewContainer.createEmbeddedView(this._errorTemplateRef, this._context);
    }
    if (viewType === RxContextViewType.COMPLETE && this._completeTemplateRef) {
      this._viewContainer.clear();
      this._defaultViewRef = null;
      this._errorViewRef = null;
      this._emptyViewRef = null;
      this._completeViewRef = this._viewContainer.createEmbeddedView(this._completeTemplateRef, this._context);
    } else
    if ((viewType === RxContextViewType.EMPTY || this._context.$implicit === null) && this._emptyTemplateRef) {
      this._viewContainer.clear();
      this._defaultViewRef = null;
      this._errorViewRef = null;
      this._completeViewRef = null;
      this._emptyViewRef = this._viewContainer.createEmbeddedView(this._emptyTemplateRef, this._context);
    }
  }
}

export class RxContextContext {
  $implicit: any = null;
}

export enum RxContextViewType {
  DEFAULT = 1,
  ERROR,
  COMPLETE,
  EMPTY
}
