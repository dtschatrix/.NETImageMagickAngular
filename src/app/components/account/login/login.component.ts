import { Component, OnInit} from '@angular/core';
import { AuthService } from 'src/app/core/authentication/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  title = 'ass';
  constructor(private authService: AuthService){ }

  login(): void{
    this.authService.login();
  }

  logout(): void{
    this.authService.signout();
  }
  ngOnInit(): void { }



}
