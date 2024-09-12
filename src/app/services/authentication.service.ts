import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, authState} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Userdata } from '../models/user.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private  router: Router) { }

  login(userdata:Userdata): Promise<void>{
      return signInWithEmailAndPassword(this.auth, userdata.email, userdata.password)
       .then( () => {
          this.router.navigate(['editor']);
       } )
       .catch((err) => { console.error(err); })
  }

  logout(): Promise<void>{
    return this.auth.signOut()
        .then( () => { this.router.navigate(['/login'])} )
        .catch((err)=>{console.error(err);})
  }

  isLoggedIn(): Observable <boolean>{
    return authState(this.auth).pipe(
      map(user => user ? true : false )
    )
  }

  getCurrentEmail(): Observable <string | null>{
    return authState(this.auth).pipe(
      map(  user => user ? user.email : null )
    )
  }

}
