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

      query(':enter', [
        style({ opacity: 0, height: 0 }),
        stagger('100ms', animate(
          animateIs + ' ease-in',
          style({ opacity: 1, height: AUTO_STYLE })
        )),
      ], { optional: true }), // Фикс ошибки в консоли

      query(':leave', [
        style({ opacity: 1, height: AUTO_STYLE }),
        stagger('100ms', animate(
          animateIs + ' ease-out',
          style({ opacity: 0, height: 0 })
        )),
      ], { optional: true }), // Фикс ошибки в консоли

    ]),
  ]);
}
export function collapseIn(
  duration: IAnimationDuration['duration'],
  durationType: IAnimationDuration['durationType']
): AnimationTriggerMetadata {
  const animateIs: string = `${duration}${durationType}`;

  return trigger('collapseIn', [
    transition(':enter', [

      query(':enter', [
        style({ opacity: 0, height: 0 }),
        stagger('100ms', animate(
          animateIs + ' ease-in',
          style({ opacity: 1, height: AUTO_STYLE })
        )),
      ], { optional: true }), // Фикс ошибки в консоли

    ]),
  ]);
}

export function collapseWidthItems(
  duration: IAnimationDuration['duration'],
  durationType: IAnimationDuration['durationType']
): AnimationTriggerMetadata {
  const animateIs: string = `${duration}${durationType}`;

  return trigger('collapseWidthItems', [

    transition(':enter', [
      query(':enter', [
        style({ 'opacity': 0, 'width': 0 }),
        stagger('50ms',
          animate(animateIs + ' ease-in',
            style({ 'opacity': 1, 'width': AUTO_STYLE })
          )),
      ], { optional: true }), // Фикс ошибки в консоли

      transition(':leave', [
        query(':leave', [
          style({ 'opacity': 1, 'width': AUTO_STYLE }),
          stagger('50ms',
            animate(animateIs + ' ease-out',
              style({ 'opacity': 0, 'width': 0 })
            )),
        ], { optional: true }) // Фикс ошибки в консоли

      ])
    ]),
  ]);
}
export function collapseWidth(
  duration: IAnimationDuration['duration'],
  durationType: IAnimationDuration['durationType']
): AnimationTriggerMetadata {
  const animateIs: string = `${duration}${durationType}`;
  return trigger('collapseWidth', [

    transition(':leave', [
      style({ width: '*' }),
      animate(animateIs, style({ width: 0 }))
    ]),
    
    transition(':enter', [
      style({ width: 0 }),
      animate(animateIs, style({ width: '*' }))
    ]),
  ]);

}