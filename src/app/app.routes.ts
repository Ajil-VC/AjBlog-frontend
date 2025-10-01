import { Routes } from '@angular/router';
import { LandpageComponent } from './features/landpage/landpage.component';
import { SigninSignupComponent } from './features/signin-signup/signin-signup.component';

export const routes: Routes = [
    { path: '', component: LandpageComponent },
    { path: 'signin', component: SigninSignupComponent, data: { type: 'sign_in' } },
    { path: 'signup', component: SigninSignupComponent, data: { type: 'sign_up' } }
];
