import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthLibService {
  private userName: string | null = null;

  public get user(): string | null {
    return this.userName;
  }

  public login(userName: string, password: string): void {
    // Authentication for **honest** users TM. (c) Manfred Steyer
    this.userName = userName;
  }
}
