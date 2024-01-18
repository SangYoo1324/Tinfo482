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
export class AuthGuard implements CanActivate{

  constructor(private memberAuthService: MemberAuthService, private router:Router,
              private memberService: MemberService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log("Authguard triggered");
    if(this.memberAuthService.getToken() !==null){// if token exist in local cache,
      const role = route.data["roles"] as Array<string>;
      console.log("Role requirement for this route::::"+ role);

      // admin role has all privilege. So pass everything
      if(this.memberAuthService.getRoles()[0].authority === 'ROLE_ADMIN') {
        console.log("logged in user has ADMIN Role... accepting all paths");
        return true}

      if(role){// if role array isn't null..

        // admin role has all privilege. So pass everything
        if(role[0] === 'ROLE_ADMIN'){
          // backend verification step
          return true;
        }
        const match = this.memberAuthService.roleMatch(role);

        if(match){
          console.log("Role is Matching");
          return true;
        }else{
          this.router.navigate(['forbidden']);
          return false;
        }
      }

    }

    alert("You're not logged in. Please log in first!");
    this.router.navigate(['login']);
    return false;
  }

}
