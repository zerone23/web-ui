import { Component, OnInit } from '@angular/core';
import { OAuthService } from "angular-oauth2-oidc";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private oauthService: OAuthService, private http: HttpClient) { }

  ngOnInit() {
  }

  logout() {
    this.oauthService.logOut();
    window.location.reload();
}

private results: any[];
getAll() {
    const headers: Headers = new Headers();
    headers.append('Authorization', this.oauthService.authorizationHeader());

    this.http.get('http://localhost:8080/api/approval', {
        headers: new HttpHeaders().set('Authorization', this.oauthService.authorizationHeader()),
    })
      .subscribe(data => {
        this.results = data['results'];
        alert(data[0]['forename']);
      });
  }
  




}
