import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Injectable} from "@angular/core";
import {catchError, map, Observable, of, switchMap} from "rxjs";
import {MemberAuthService} from "./member-auth.service";
import {MemberService} from "../_service/member.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private memberAuthService: MemberAuthService, private router:Router,
              private memberService: MemberService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log("Authguard triggered");
    if(this.memberAuthService.getToken() !==null){// if token doesn't exist, don't even need to send api for role chk..

      const required_role = route.data["roles"] as Array<string>;
      console.log(required_role[0].toString());
      if(required_role[0].toString() === "ROLE_ADMIN")    {
        return this.memberService.adminApiTest().pipe(
          map((resp:any)=>{
            const role = resp?.role;
            if(role === 'ROLE_ADMIN')
              return true;
            else {
              this.router.navigate(['/forbidden']);
            return false;
            }
          })
        , catchError(()=>{
          this.router.navigate(['/forbidden']);
          return of(false);
          })
        )
      }else{
        console.log("this page is user enterable...");
        return true;
      }
    }


    alert("You're not logged in. Please log in first!");
    this.router.navigate(['login']);
    return false;



  }

}


// if(this.memberAuthService.getToken() !==null){// if token exist in local cache,
//
//
//
//   const role = route.data["roles"] as Array<string>;
//   console.log("Role requirement for this route::::"+ role);
//
//   // admin role has all privilege. So pass everything
//   if(this.memberAuthService.getRoles()[0].authority === 'ROLE_ADMIN') {
//     console.log("logged in user has ADMIN Role... accepting all paths");
//     return true}
//
//   if(role){// if role array isn't null..
//
//     const match = this.memberAuthService.roleMatch(role);
//
//     if(match){
//       console.log("Role is Matching");
//       return true;
//     }else{
//       this.router.navigate(['forbidden']);
//       return false;
//     }
//   }
//
// }
