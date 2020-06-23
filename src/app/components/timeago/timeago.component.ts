import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-timeago',
  templateUrl: './timeago.component.html',
  styleUrls: ['./timeago.component.scss'],
})
export class TimeagoComponent implements OnInit {

  @Input('created') created: any;
  newDate: any;
  constructor() { }

  ngOnInit() {
    this.newDate = this.convertTime(this.created);
  }

  convertTime(time: any) {
    return new Date(time * 1000);
  }

}
