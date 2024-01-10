import {animate, group, query, style, transition, trigger} from "@angular/animations";

export const slideInRouterAnimation = trigger('slideInRouterAnimation',[
  // transition between any two states
  transition('*<=>*',[
    query(':enter, :leave', style({position:'fixed', width: '100%', zIndex:2}), {optional: true}),
    group([
      query(':enter',[
        style({transform: 'translateX(100%)'}),
        animate('0.5s ease-out', style({transform: 'translateX(0%)'}))
      ], {optional: true}),
      query(':leave',[
        style({transform: 'translateX(1%)'}),
        animate('0.5s ease-out', style({transform: 'translateX(-100%)'}))
      ], {optional: true})

    ])

    ]
  )

]);
