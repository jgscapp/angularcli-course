import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { AuthService } from "../auth/auth.service";


@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
    
    constructor(private authService: AuthService) {}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
         //tap allows to execute some code of any data from observable without consume it    
        return next.handle(req).pipe(tap(
                event => {
                    console.log('Logging interceptor', event);
                }
            ))
        }
}