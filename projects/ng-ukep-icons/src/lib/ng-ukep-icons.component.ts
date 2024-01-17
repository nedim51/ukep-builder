import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Inject, Input, Optional } from '@angular/core';
import { NgUkepIconsRegistry } from './ng-ukep-icons.service';
// import { ukepIcons } from '../../../../dist/ng-ukep-icons-builder';
import { ukepIcons } from 'ng-ukep-icons-builder';

@Component({
  selector: 'ukep-icons, [ukep-icons]',
  template: `
    <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgUkepIconsComponent {
  private svgIcon: SVGElement | undefined = undefined;

  @Input() set name(iconName: ukepIcons) {
    if(this.svgIcon) {
      this.elementRef.nativeElement.removeChild(this.svgIcon)
    }

    const svgData = this.ngUkepIconsRegistry.getIcon(iconName);

    if(svgData) {
      this.svgIcon = this.svgElementFromString(svgData);
      this.elementRef.nativeElement.appendChild(this.svgIcon);
    }
  }

  constructor(
    private elementRef: ElementRef, 
    private ngUkepIconsRegistry: NgUkepIconsRegistry, 
    @Optional() @Inject(DOCUMENT) private document: any) { }

  svgElementFromString(svgContent: string): SVGElement {
    const div = this.document.createElement('DIV');
    div.innerHTML = svgContent;

    return div.querySelector('svg') || this.document.createElementNS('http://www.w3.org/2000/svg', 'path');
  }
}
