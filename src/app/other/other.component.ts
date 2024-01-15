import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrl: './other.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OtherComponent { }
