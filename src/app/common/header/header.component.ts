import {
  Component,
  ElementRef,
  HostListener,
  QueryList,
  Renderer2,
  signal,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AsyncPipe, NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {MemberAuthService} from "../../_auth/member-auth.service";
import {async} from "@angular/core/testing";
import {BehaviorSubject} from "rxjs";
import {AsnynchronousService} from "../../service/asnynchronous.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    NgClass,
    NgStyle,
    NgIf,
    AsyncPipe
  ],
  template:`
<!--    pc-header-->
<header class="pc-header" >

  <div class="header-con"  [ngStyle]="{'background-color': isHeaderTransparent? 'transparent': ' #375B50'}">
    <div class="header__menus-logo-wrap">
      <div class="header__logo">
        <a routerLink="" >&nbsp;TERRA TREASURES</a>
      </div>
      <!--    nav-bars -->
      <div class="header__menus">
        <ul>
          <li  *ngFor="let firstMenu of navBarMenusInfo; let i=index"
               [routerLink]="firstMenu.routerLink"
            class="header__menus-1st" #menu (click)="openSecondNavBar(i, $event, false)">{{firstMenu.firstNav}} &nbsp;
<!--            <i class="fa-solid fa-caret-down"></i>-->
<!--            2nd nav-bar-->
<!--            <ul class="header__menus-2nd">-->
<!--              <li *ngFor="let secondMenu of navBarMenusInfo[i].secondNav; let j =index">-->
<!--                <a [routerLink]="secondMenu.routerLink" >{{secondMenu.title}}</a></li>-->
<!--            </ul>-->
          </li>

          <li class="header__menus-1st" >Blog &nbsp;
            <!--            2nd nav-bar-->
          </li>



        </ul>
      </div>
      <div class="auth-box" >
        <i *ngIf="isLoggedIn" routerLink="profile" class="fa-solid fa-user"></i>
        <i *ngIf="isLoggedIn" class="fa-solid fa-cart-shopping"></i>
      </div>
<!--      [ngClass]="{'not-logged-in':!isLoggedIn}"-->
      <div class="header-user" >
        <button  *ngIf="!isLoggedIn" class="btn btn-outline-success" role="button" routerLink="/login">Login</button>
        <button (click)="logout()"  *ngIf="isLoggedIn" class="btn btn-outline-danger" role="button">LogOut</button>
      </div>
    </div>
  </div>

</header>
<!--    pc-header:end-->

<!--mobile-header-->

<header class="mobile-header">
<div class="mobile-header-con">
<!--<div class="header__icons">-->
<!--  <div class="sign-in "><a href="/page/login"><i class="fa-solid fa-user"></i></a>-->
<!--  </div>-->
<!--  <div class="cart-logo "><a href="/page/checkout"><i class="fa-solid fa-cart-shopping"></i></a></div>-->
<!--  <div class="search-icon "><a href="#"><i class="fa-brands fa-searchengin"></i></a></div>-->
<!--</div>-->
  <div class="header__logo-mobile">
    <a routerLink="" class="text-[28px]">&nbsp;TERRA ???? FLOWERS</a>
  </div>
  <div class="menu-expansion-burger" (click)="triggerSideMenuBar($event)">
    <i class="fa-solid fa-bars"></i>
  </div>
</div>
</header>

<!--mobile-header:end-->

<!-- mobile-side-bar (activated)  -->
<div #mobileSideBar class="mobile-side-bar">
    <div class="mobile-side-bar__contents">
        <div class="mobile-side-bar__head">
          <div class="log-in-out-btn-wrap">

            <div class="header-user">
              <button *ngIf="!isLoggedIn" class="btn btn-outline-success" role="button" routerLink="/login">Login</button>
              <button (click)="logout()" *ngIf="isLoggedIn" class="btn btn-outline-danger" role="button">LogOut</button>
            </div>
            <div class="auth-box">
              <i *ngIf="isLoggedIn" class="fa-solid fa-user"></i>
              <i *ngIf="isLoggedIn" class="fa-solid fa-cart-shopping"></i>
            </div>
          </div>

          <div class="mobile-side-bar__btn-close">
            <i class="fa-solid fa-right-from-bracket back" (click)="xButtonClick($event)"></i>
          </div>
        </div>


      <div class="mobile-side-bar__body">
        <div class="mobile-side-bar__body__menu-box-1">
          <ul>
            <li *ngFor="let firstMenu of navBarMenusInfo; let i=index"
                #mobileMenu (click)="openSecondNavBar(i, $event, true)"
                class="position-relative"> <a>{{firstMenu.firstNav}} &nbsp; <i class="fa-solid fa-caret-down"></i></a>
              <ul class="mobile-side-bar__menus-2nd">
                <li *ngFor="let secondMenu of navBarMenusInfo[i].secondNav; let j =index">
                  <a [routerLink]="secondMenu.routerLink" >{{secondMenu.title}}</a></li>
              </ul>
            </li>
            <li class="position-relative"><a href="">Blog</a></li>
          </ul>
        </div>
      </div>
    </div>

</div>
  `,
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLoggedIn!:boolean;
  @ViewChildren('menu') navBarMenus!:QueryList<ElementRef>;
  @ViewChildren('mobileMenu') mobileMenu!:QueryList<ElementRef>;
  @ViewChild('mobileSideBar') mobileSideBar!:ElementRef;

  constructor(private renderer:Renderer2,private memberAuthService:MemberAuthService, private asyncService: AsnynchronousService) {
  }
  ngOnInit(){
    console.log(this.memberAuthService.isLoggedIn() as boolean);

    //if isLoggedin() true, emit true for the isLoggedIn stream
    if(this.memberAuthService.isLoggedIn()) this.asyncService.isLoggedIn$.next(true);
    else{
      this.memberAuthService.clear();
    }
    // subscribe the change of the isLoggedIn stream
    this.asyncService.isLoggedIn$.subscribe((bool)=>{
        this.isLoggedIn = bool;
    })


  }

  isHeaderTransparent = true;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    this.isHeaderTransparent = scrollPosition === 0;
  }

  navBarMenusInfo:any[]= [
    {firstNav: 'About',
      routerLink: 'about',
    secondNav:[{title:'subMenu-1', routerLink: 'contact-us'},{title:'subMenu-2', routerLink: 'join-us'}, {title:'subMenu-3', routerLink: 'why-us'}]},
    {firstNav: 'Shop',
      routerLink: 'flowers',
      secondNav:[{title:'Submenu-1', routerLink: 'blog'},{title:'Submenu-2', routerLink: 'docuseries'}]},
  ];

  openSecondNavBar(i:number, event:Event, isMobile:boolean){
    event.stopPropagation();
    let target!:any;
    if(isMobile){
      target =  this.mobileMenu.get(i)?.nativeElement;
    }else
    target =  this.navBarMenus.get(i)?.nativeElement;

    // if ul doesn't contains class active add
      if(!target.classList.contains('active')){
        console.log("adding active");
        this.renderer.addClass(target,'active');
    // remove active class from siblings
        this.closeAllSecondNav(isMobile, i);

      }else{

        this.renderer.removeClass(target,'active');
      }
      }

      @HostListener('document:click',['$event'])
  handleDocumentClick(event: MouseEvent){
    // desktop nav bar
      this.navBarMenus.forEach((e)=>{
        if(e.nativeElement.classList.contains('active')){
          this.renderer.removeClass(e.nativeElement, 'active');
        }

      });
      // mobile nav bar
        this.renderer.removeClass(this.mobileSideBar.nativeElement,'active');
        this.mobileMenu.toArray()
          .forEach(sibling=>{
            this.renderer.removeClass(sibling.nativeElement, 'active');
          });
      }

      triggerSideMenuBar(e:Event){
        console.log("all screen");
        this.renderer.addClass(this.mobileSideBar.nativeElement,'active');
        e.stopPropagation();
      }

      xButtonClick(e:Event){
        this.renderer.removeClass(this.mobileSideBar.nativeElement,'active');
        this.mobileMenu.toArray()
          .forEach(sibling=>{
            this.renderer.removeClass(sibling.nativeElement, 'active');
          });
        e.stopPropagation();
      }

      closeAllSecondNav(isMobile:boolean, i:number){
        if(isMobile){
          this.mobileMenu.toArray().filter((item,index)=>index !==i)
            .forEach(sibling=>{
              this.renderer.removeClass(sibling.nativeElement, 'active');
            });
        }else{
          this.navBarMenus.toArray().filter((item,index)=>index !==i)
            .forEach(sibling=>{
              this.renderer.removeClass(sibling.nativeElement, 'active');
            });
        }
      }

      logout(){
        this.memberAuthService.clear();
      }

}
