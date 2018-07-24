import { UserService } from './user.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private userService: UserService, private auth: AuthService, router: Router) {
    auth.user$.subscribe(user => {
      console.log(user);
      if (user) {
        userService.save(user);

        localStorage.setItem('uid', user.uid);

        let returnUrl = localStorage.getItem('returnUrl');
        if(returnUrl){
            router.navigateByUrl(returnUrl);
            localStorage.removeItem('returnUrl');
        }
        
      }
    });
  }
}
