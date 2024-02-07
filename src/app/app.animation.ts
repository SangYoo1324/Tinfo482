import {animate, group, query, state, style, transition, trigger} from "@angular/animations";

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

export const transparency =
  trigger('animate_transparency', [
    state('false', style({opacity: 0, visibility: 'hidden'})),
    state('true',style({opacity:1, visibility:'visible'})),
    transition('false=>true',animate('1000ms ease-in')),
    transition('true=>false', animate('1000ms ease-out'))
  ])

export const widthChange =
  trigger('animate_widthChange',[
    state('false',style({width:0})),
    state('true',style({width: '50%'})),
    transition('false=>true', animate('500ms ease-in')),
    transition('true=>false', animate('500ms ease-out'))
  ]);
