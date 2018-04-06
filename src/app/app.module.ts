import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './services/auth.guard';
import { NoAuthGuard } from './services/auth.guard';



import { AppComponent } from './app.component';
import { AbnahmeComponent } from './components/abnahme/abnahme.component';

import { OAuthModule } from 'angular-oauth2-oidc';
import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './components/landing/landing.component';

import { WebBluetoothModule } from '@manekinekko/angular-web-bluetooth';

import {ToastModule} from 'ng2-toastr/ng2-toastr';


const appRoutes: Routes = [
  { path: 'abnahme', component: AbnahmeComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'landing', component: LandingComponent, canActivate: [NoAuthGuard] },
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: '**', redirectTo: 'landing' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AbnahmeComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    OAuthModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    WebBluetoothModule.forRoot({
      enableTracing: true
    }),
    ToastModule.forRoot()
  ],
  providers: [AuthGuard, NoAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
