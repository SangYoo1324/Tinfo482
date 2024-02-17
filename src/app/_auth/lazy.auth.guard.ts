import {Injectable} from "@angular/core";
import {CanLoad, Route, Router, UrlSegment, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {MemberAuthService} from "./member-auth.service";
import {MemberService} from "../_service/member.service";

@Injectable({
  providedIn: 'root'
})
export class LazyAuthGuard implements CanLoad{

  constructor(private memberAuthService: MemberAuthService, private router:Router,
              private memberService: MemberService) {
  }
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log("Lazy-Authguard triggered");



    if(this.memberAuthService.getToken() !==null){// if token exist in local cache,
      const role = route.data!["roles"] as Array<string>;
      console.log("Role requirement for this route::::"+ role);
      console.log(this.memberAuthService.getRoles()[0]);


      // admin role has all privilege. So pass everything
      if(this.memberAuthService.getRoles()[0].authority === 'ROLE_ADMIN') {
        console.log("logged in user has ADMIN Role... accepting all paths");
        return true}

      if(role){// if role array isn't null..



        if(role[0] === 'ROLE_ADMIN'){
          // backend verification step
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
