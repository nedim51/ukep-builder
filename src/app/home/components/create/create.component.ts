import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DEFAULT_DURATION, collapseIn } from '../../../helpers/animations';
import { IWellcomeItems, createItems } from '../wellcome/wellcome.component';

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
