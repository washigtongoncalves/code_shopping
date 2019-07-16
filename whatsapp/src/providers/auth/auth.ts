import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { flatMap } from 'rxjs/operators';
import { FirebaseAuthProvider } from './firebase-auth';

@Injectable()
export class AuthProvider {

  private api = 'http://localhost:8000/api/login_vendor';

  constructor(
    public http: HttpClient,
    private firebaseAuth: FirebaseAuthProvider
  ) { }

  login(): Observable<{ token: string }> {
    return fromPromise(this.firebaseAuth.getToken()).pipe(
      flatMap(token => {
        return this.http.post<{ token: string }>(this.api, { token })
      })
    );
  }
}
