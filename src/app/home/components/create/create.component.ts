import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IAnimationDuration, collapseItems } from '../../../components/sidebar/sidebar.animations';
const DEFAULT_DURATION: IAnimationDuration = { duration: 150, durationType: 'ms' };
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
  animations: [
    collapseItems(DEFAULT_DURATION.duration, DEFAULT_DURATION.durationType)
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateComponent {

}
