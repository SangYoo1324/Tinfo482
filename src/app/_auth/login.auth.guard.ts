import {Injectable} from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from "@angular/router";
import {Observable} from "rxjs";
import {MemberAuthService} from "./member-auth.service";
import {MemberService} from "../service/member.service";

@Injectable({
  providedIn: 'root'
})
export class LoginAuthGuard implements CanActivate{

  constructor(private memberAuthService: MemberAuthService, private router:Router,
              private memberService: MemberService) {
  }
  // canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   console.log("Login-Authguard triggered");
  //
  //   return this.memberAuthService.isLoggedIn();
  //
  //
  //
  //
  //
  // }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log("Login-Authguard triggered");

      return !this.memberAuthService.isLoggedIn();
  }



}
