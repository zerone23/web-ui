import { Component, OnInit, NgZone } from '@angular/core';
import { OAuthService } from "angular-oauth2-oidc";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BatteryLevelService } from '../../services/battery-level.service';
import { BluetoothCore } from '@manekinekko/angular-web-bluetooth';

import { ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {single, multi} from './data';

@Component({
  selector: 'app-heart',
  templateUrl: './heart.component.html',
  styleUrls: ['./heart.component.css'],
  providers: [ BatteryLevelService ]
})
export class HeartComponent implements OnInit {


  batteryLevel: string = '--';
  device: any = {};

  single: any[];
  multi: any[];

  view: any[] = [700, 300];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Messung';
  showYAxisLabel = true;
  yAxisLabel = 'bpm';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // line, area
  autoScale = true;

  constructor(private oauthService: OAuthService, private http: HttpClient, public _zone: NgZone, public _batteryLevelService: BatteryLevelService, public toastr: ToastsManager, vcr: ViewContainerRef ) {
    this.toastr.setRootViewContainerRef(vcr);
    Object.assign(this, {single, multi});
  }

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

      this.multi[0].series.push({"name": Number(this.multi[0].series[this.multi[0].series.length - 1].name) + 1,"value": value});
      this.multi = [...this.multi];// trigger changedetection

    });
  }

 //Toaster Notification; für weitere Informationen: https://www.npmjs.com/package/ng2-toastr
  showSuccess() {
    this.toastr.success('Neue Aufgabe Abgenommen!', 'Hurra!');
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