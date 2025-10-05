import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./features/header/header.component";
import { AuthService } from './shared/Auth service/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';

  constructor(private _auth: AuthService) { }
  ngOnInit() {

    this._auth.authenticateUser().subscribe();
  }
}
