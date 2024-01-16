import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IAnimationDuration, collapseIn } from '../../../components/sidebar/sidebar.animations';
import { IWellcomeItems, createItems } from '../wellcome/wellcome.component';

const DEFAULT_DURATION: IAnimationDuration = { duration: 150, durationType: 'ms' };

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
  animations: [
    collapseIn(DEFAULT_DURATION.duration, DEFAULT_DURATION.durationType)
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateComponent {

  readonly createItems: IWellcomeItems = createItems;
}
