import { Directive, ElementRef, Renderer2, Input, OnInit, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[fsModelChange]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: FsModelChangeDirective,
    multi: true,
  }],
})
export class FsModelChangeDirective implements ControlValueAccessor, OnInit, OnDestroy {

  private subject = new Subject<string>();
  private _destroy$ = new Subject<string>();

  private _onTouched = () => {};
  private _onChange = (value: any) => { };
  private blurChange = false;

  @Input() changeDelay = 300;
  @Input() changeOnBlur = false;

  constructor(
    private _elementRef: ElementRef,
    private _renderer: Renderer2,
  ) {}

  public ngOnInit() {

    if (this.changeOnBlur) {
      this.subject
      .pipe(
        distinctUntilChanged(),
        takeUntil(this._destroy$)
      )
      .subscribe(value => {
        this.blurChange = true;
      });

      this._elementRef.nativeElement.addEventListener('blur', this.blur);

      this._elementRef.nativeElement.addEventListener('focus', this.focus);

    } else {
      this.subject
      .pipe(
        debounceTime(this.changeDelay),
        distinctUntilChanged(),
        takeUntil(this._destroy$)
      )
      .subscribe(value => {
        this._onChange(value);
      });
    }

    this._elementRef.nativeElement.addEventListener('input', this.input);
  }

  registerOnChange(fn: (value: any) => any): void {
    this._onChange = fn
  }

  registerOnTouched(fn: () => any): void {
    this._onTouched = fn
  }

  public writeValue(value: string) {
    this._renderer.setProperty(this._elementRef.nativeElement, 'value', value);
  }

  public ngOnDestroy() {

    this._elementRef.nativeElement.removeEventListener('input', this.input);
    this._elementRef.nativeElement.removeEventListener('blur', this.blur);
    this._elementRef.nativeElement.removeEventListener('focus', this.focus);

    this._destroy$.next();
    this._destroy$.complete();
  }

  private blur = (e) => {
    if (this.blurChange) {
      this._onChange(e.target.value);
    }
  }

  private focus = (e) => {
    this.blurChange = false;
  }

  private input = (e) => {
    this.subject.next(e.target.value);
  }

}
