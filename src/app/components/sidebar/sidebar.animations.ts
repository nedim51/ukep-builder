import {
  trigger,
  style,
  AUTO_STYLE,
  transition,
  animate,
  query,
  stagger,
  AnimationTriggerMetadata
} from "@angular/animations";

export interface IAnimationDuration {
  duration: number;
  durationType: 'ms' | 's';
}

export function collapseItems(
  duration: IAnimationDuration['duration'], 
  durationType: IAnimationDuration['durationType']
): AnimationTriggerMetadata {
  const animateIs: string = `${duration}${durationType}`;

  return trigger('collapseItems', [
    transition('* <=> *', [
      query(':enter',[
          style({ opacity: 0, height: 0 }),
          stagger('100ms', animate(
            animateIs + ' ease-in',
            style({ opacity: 1, height: AUTO_STYLE })
          )),
        ], { optional: true }
      ),
      query(':leave', [
          style({ opacity: 1, height: AUTO_STYLE }),
          stagger('100ms', animate(
            animateIs + ' ease-out',
            style({ opacity: 0, height: 0 })
          )),
        ], { optional: true }
      ),
    ]),
  ]);
}