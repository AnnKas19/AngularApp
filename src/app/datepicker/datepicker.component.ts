import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RangesFooter } from './ranges-footer.component';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from './format-datepicker';


@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class DatepickerComponent implements OnInit {

  form: FormGroup;
  rangesFooter = RangesFooter;

  inlineRange;
  constructor(fb: FormBuilder) {
   this.form = fb.group({
      date: [{begin: new Date(2020, 1, 1), end: new Date(2020, 1, 1)}]
    });
  }

  inlineRangeChange($event) {
    this.inlineRange = $event;
  }  
structor() { }

  ngOnInit() {
  }

}
