import {  SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {DatepickerComponent} from './datepicker.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, MatButtonModule} from "@angular/material";

import { RangesFooter } from './ranges-footer.component';
import { AppDateAdapter, APP_DATE_FORMATS } from './format-datepicker';

import {  DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "saturn-datepicker";

@NgModule({
    declarations: [
        DatepickerComponent,
        RangesFooter
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule, ReactiveFormsModule, MatDatepickerModule,
        MatNativeDateModule, MatFormFieldModule, MatInputModule,
        MatButtonModule, SatDatepickerModule, SatNativeDateModule
    ],
    exports:[
        DatepickerComponent
    ],
    entryComponents: [RangesFooter],
    providers: [ { provide: DateAdapter, useClass: AppDateAdapter },
        { provide: MAT_DATE_LOCALE, useValue: "ru-RU" },
        { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }]
  
})
export class DatepickerModule {
}
