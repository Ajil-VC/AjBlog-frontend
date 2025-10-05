import { Routes } from '@angular/router';
import { LandpageComponent } from './features/landpage/landpage.component';
import { SigninSignupComponent } from './features/signin-signup/signin-signup.component';
import { MeComponent } from './features/me/me.component';
import { authGuard } from './core/guards/auth.guard';
import { signinGuard } from './core/guards/signin.guard';
import { StoryComponent } from './features/landpage/story/story.component';

export const routes: Routes = [
    { path: '', component: LandpageComponent },
    { path: 'signin', component: SigninSignupComponent, data: { type: 'sign_in' }, canActivate: [signinGuard] },
    { path: 'signup', component: SigninSignupComponent, data: { type: 'sign_up' }, canActivate: [signinGuard] },
    { path: 'me', component: MeComponent, canActivate: [authGuard] },
    { path: 'story', component: StoryComponent }
];
