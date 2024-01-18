 import {Injectable} from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponseBase
} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Router} from "@angular/router";
import {MemberAuthService} from "./member-auth.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private memberAuthService: MemberAuthService, private router: Router) {
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //Without Token
    if(req.headers.get("No-Auth") ==='True'){
      console.log("Interceptor::: header No-Auth: true, no token insert...");
      return next.handle(req.clone());
    }
    //Why req.clone().. HttpRequest is immutable. if req object get modified, we should convert it to new object.
    // req.clone() will make new HttpRequest object

    //With Token
    // Take out stored token from cache
    const token = this.memberAuthService.getToken();

    let headers = new HttpHeaders();
    headers =headers.set('Authorization', `Bearer ${token}`);

    const authReq = req.clone({headers});

    return next.handle(authReq)
      .pipe(
        catchError(
          (err:HttpResponseBase)=>{
            console.log("error status:::"+err.status);
            console.error(err);
            // 401 error -- unAuthorized
            if(err.status === 401)
            this.router.navigate(['/login']);
            else if(err.status ===403){
              alert('Admin Authorization required. Login with Admin Account');
            }

            const customError = {status: 500, message: 'customError message'}
            return throwError(()=>customError);
          }
        )
      );
  }

}
