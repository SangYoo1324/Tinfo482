import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AsnynchronousService {

  constructor() { }

  isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


}
