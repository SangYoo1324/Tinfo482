import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {MemberAuthService} from "./member-auth.service";
import {MemberService} from "../service/member.service";

@Injectable({
  providedIn: 'root'
})
export class LoginPageAuthGuard implements CanActivate {

  constructor(private memberAuthService: MemberAuthService, private router: Router,
              private memberService: MemberService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log("Login page Authguard triggered");


      if(this.memberAuthService.getToken() !==null){// if token exist in local cache,
        alert("You're logged in already");
        this.router.navigate(['']);
        return false;
      }
    //
    //   alert("You're not logged in. Please log in first!");
    //   this.router.navigate(['login']);
    //   return true;
    // }
    return true;
  }
}
