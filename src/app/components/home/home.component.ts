import { Component, OnInit } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {time} from './data';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  color = 'primary';
  mode = 'determinate';
  value = time;

  constructor(public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
    setInterval(() => {
      if(this.value == 75){this.showInfo();}
      this.value += 1;
    }, 1000);
   }

  ngOnInit() {
  }

  showInfo() {
    this.toastr.info('Die Übung endet bald!');
  }

}