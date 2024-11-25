import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly fbAuth: AngularFireAuth) { }

  public register(email: string, password:string){
    return new Promise((resolve, reject) => {
      this.fbAuth.createUserWithEmailAndPassword(email, password)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
    });
  }
  
  public doLogin(email: string, password: string){
      return new Promise((resolve, reject)=>{
        this.fbAuth.signInWithEmailAndPassword(email, password)
        .then((res)=> resolve(res))
        .catch((err) => reject(err));
      });
  }

  logOut(){
    return this.fbAuth.signOut();
  }

  public isAuth(){
return new Promise((resolve, reject) => {
  this.fbAuth.onAuthStateChanged((user) => {
if(user){
  resolve(true);

}else{
  resolve(false);
}
});

});
  }

  public getCurrentUid(): Promise <string>{
return new Promise((resolve, reject) => {
this.fbAuth.currentUser.then((res) =>{
  resolve(res?.uid || "");
});
});
  }


}

