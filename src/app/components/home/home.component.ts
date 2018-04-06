import { Component, OnInit, NgZone } from '@angular/core';
import { OAuthService } from "angular-oauth2-oidc";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BatteryLevelService } from '../../services/battery-level.service';
import { BluetoothCore } from '@manekinekko/angular-web-bluetooth';

import { ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ BatteryLevelService ]
})
export class HomeComponent implements OnInit {


  batteryLevel: string = '--';
  device: any = {};

  constructor(private oauthService: OAuthService, private http: HttpClient, public _zone: NgZone, public _batteryLevelService: BatteryLevelService, public toastr: ToastsManager, vcr: ViewContainerRef ) {this.toastr.setRootViewContainerRef(vcr);}

  ngOnInit() {
    this.getDeviceStatus();
    this.streamValues();
  }

  logout() {
    this.oauthService.logOut();
    window.location.reload();
}

private results: any[];
getAll() {
    const headers: Headers = new Headers();
    headers.append('Authorization', this.oauthService.authorizationHeader());

    this.http.get('http://localhost:8080/api/allStudents', {
        headers: new HttpHeaders().set('Authorization', this.oauthService.authorizationHeader()),
    })
      .subscribe(data => {
        this.results = data['results'];
        alert(data[0]['forename']);
      });
  }


  streamValues() {
    this._batteryLevelService.streamValues().subscribe(this.showBatteryLevel.bind(this));
  }

  getDeviceStatus() {
    this._batteryLevelService.getDevice().subscribe(
      (device) => {

        if(device) {
          this.device = device;
        }
        else {
          // device not connected or disconnected
          this.device = null;
          this.batteryLevel = '--';
        }
      }
    );
  }

  getFakeValue() {
    this._batteryLevelService.getFakeValue();
  }

  discoverDevice() {
    this._batteryLevelService.discoverDevice();
    this.showSuccess();
  }

  observeHeartRate() {
    this._batteryLevelService.observeHeartrateMeasurement().subscribe(this.showBatteryLevel.bind(this));
  }

  startheartrateMeasurement() {
    this._batteryLevelService.startHeartrateMeasurement();
  }

  getBatteryLevel() {
    return this._batteryLevelService.getBatteryLevel().subscribe(this.showBatteryLevel.bind(this));
  }

  startNotification() {
    this._batteryLevelService.startNotification();
  }

  stopNotification() {
    this._batteryLevelService.stopNotification();
  }

  startHeartrateMeasurement() {
    this._batteryLevelService.startHeartrateMeasurement();
  }

  showBatteryLevel(value: number) {

    // force change detection
    this._zone.run( () =>  {
      console.log('Reading battery level %d', value);
      this.batteryLevel = ''+value;
    });
  }

 //Toaster Notification; further information: https://www.npmjs.com/package/ng2-toastr
  showSuccess() {
    this.toastr.success('You are awesome!', 'Success!');
  }

  showError() {
    this.toastr.error('This is not good!', 'Oops!');
  }

  showWarning() {
    this.toastr.warning('You are being warned.', 'Alert!');
  }

  showInfo() {
    this.toastr.info('Just some information for you.');
  }

  showCustom() {
    this.toastr.custom('<span style="color: red">Message in red.</span>', null, {enableHTML: true});
  }

}