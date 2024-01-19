import { ChangeDetectionStrategy, Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-grid-draw',
  templateUrl: './grid-draw.component.html',
  styleUrl: './grid-draw.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridDrawComponent {

  title: string = '';
  
  close: EventEmitter<boolean> = new EventEmitter();
}
