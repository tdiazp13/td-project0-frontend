import { Injectable } from '@angular/core';
import { ISignupFormInfo } from '../models/signup.model';
import { ILoginFormInfo } from '../models/login.model';
import { IUserDef } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  get token(): string {
    return JSON.parse(localStorage.getItem('user')).token;
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  logout = (): void => {
    localStorage.removeItem('user');
  };

  signup = async (signupInfo: ISignupFormInfo): Promise<IUserDef> => {
    const f = await fetch('http://localhost:8097/api/create-user', {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: (new URLSearchParams({...signupInfo})).toString()
    });
    if(f.ok){
      return f.json();
    }else{
      return Promise.reject(await f.json());
    }
  };

  login = async (loginInfo: ILoginFormInfo): Promise<{ token: string }> => {
    const f = await fetch('http://localhost:8097/api/api-auth', {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: (new URLSearchParams({...loginInfo})).toString()
    });
    if ( f.ok ) {
      const { token } = await f.json();
      localStorage.setItem('user', JSON.stringify({ token, email: loginInfo.email }));
      return { token };
    }else{
      return Promise.reject(await f.json());
    }
  }
}
