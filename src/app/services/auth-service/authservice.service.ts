import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  private url = 'https://snapkaro.com/eazyrooms_staging/api';

  constructor(private http: HttpClient, private router: Router) { }

  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/user_registeration`, JSON.stringify(data))
      .pipe(catchError(this.handleError));
  }

  login(data: { user_email: string, user_password: string }): Observable<any> {
    return this.http.post<any>(`${this.url}/userlogin`, JSON.stringify(data))
      .pipe(catchError(this.handleError));
  }

  isLogin() {
    const isLogin = Boolean(localStorage.getItem('isLogin')) ? Boolean(localStorage.getItem('isLogin')) : false;
    return isLogin;
  }

  logout() {
    localStorage.removeItem('isLogin');
    this.router.navigate(['/signin']);
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error)
    let errorMessage = {message:'An error occurred', isinvalid:false};
    if (error.error instanceof ErrorEvent) {
      errorMessage.message = error.error.message;
    } else if (error.status === 400) {
      errorMessage = error.error.message;
    } else if (error.status === 401 || error.status === 403) {
      errorMessage.message = 'Invalid username or pasword. Please try again.';
      errorMessage.isinvalid = true;
    } else {
      errorMessage.message = `Error ${error.status}: ${error.error.message || 'Unknown error'}`;
    }
    return throwError(errorMessage);
  }
}
