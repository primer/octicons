import {
  Directive,
  Input,
  HostBinding
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { closestNaturalHeight, SVGData, SVGSize, sizeMap } from './helpers';

@Directive({
  standalone: false
})
export class OpOcticonComponentBase {
  @Input() size:SVGSize = 'medium';
  @Input() verticalAlign = 'text-bottom';
  @Input() title = '';
  @Input() tabIndex?: number;

  @HostBinding('attr.role') role = 'img';
  @HostBinding('attr.fill') @Input() fill = 'currentColor';
  @HostBinding('attr.id') @Input() id = '';
  @HostBinding('attr.aria-label') @Input('aria-label') ariaLabel = '';
  @HostBinding('attr.aria-labelledby') @Input('aria-labelledby') arialabelledby = '';

  @HostBinding('class.octicon') baseClassName = true;
  @HostBinding('attr.aria-hidden') get ariaHidden() {
    return !this.ariaLabel;
  }
  @HostBinding('attr.tabindex') get tabIndexAttr() {
    return this.tabIndex;
  }
  @HostBinding('attr.focusable') get focusable() {
    return (this.tabIndex && this.tabIndex >= 0);
  }
  @HostBinding('style') get style () {
    return {
      display: 'inline-block',
      'user-select': 'none',
      'vertical-align': this.verticalAlign,
      overflow: 'visible',
      height: `${this.height}px`,
      width: `${this.width}px`
    };
  };
  @HostBinding('attr.viewBox')
  get viewBox() {
    return `0 0 ${this.naturalWidth} ${this.naturalHeight}`;
  }

  get naturalHeight() {
    return closestNaturalHeight(Object.keys(this.SVGData), this.height)
  }

  get height() {
    return sizeMap[this.size];
  }

  get naturalWidth() {
    return this.SVGData[this.naturalHeight].width;
  }

  get width() {
     return this.height * (this.naturalWidth / this.naturalHeight);
  }

  get paths() {
    return this.SVGData[this.naturalHeight].paths;
  }

  protected SVGData:SVGData = {};

   constructor(protected sanitizer:DomSanitizer) {}
}
