import { ChangeDetectorRef, Component } from '@angular/core';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SatCalendar, SatCalendarFooter, SatDatepicker } from 'saturn-datepicker';
import { DateAdapter } from 'saturn-datepicker';
import {DateAdapter as DateAdapter2, MAT_DATE_FORMATS} from '@angular/material/core';



@Component({
    templateUrl: './ranges-footer.component.html',
    providers: [
  ]
})
export class RangesFooter<Date> implements SatCalendarFooter<Date> {

    public ranges: Array<{key: string, label: string}> = [
        {key: 'LastDay', label: 'LAST DAY'},
        {key: 'Lastweek', label: 'LAST 7 DAYS'},
        {key: 'Lastmonth', label: 'LAST 30 DAYS'}
    ];
    private destroyed = new Subject<void>();

    constructor(
        private calendar: SatCalendar<Date>,
        private datePicker: SatDatepicker<Date>,
        private dateAdapter: DateAdapter<Date>,
        cdr: ChangeDetectorRef
    ) {
        calendar.stateChanges
            .pipe(takeUntil(this.destroyed))
            .subscribe(() => cdr.markForCheck())
    }

    setRange(range: string) {
      const today = moment();
        switch (range) {
            case 'LastDay':
                this.calendar.beginDate = this.dateAdapter.deserialize(new Date());
                this.calendar.endDate = this.dateAdapter.deserialize(new Date());
                this.calendar.activeDate = this.calendar.beginDate;
                break;
            case 'Lastweek':
                this.calendar.beginDate = this.dateAdapter.deserialize(today.subtract(6,'days').toDate());
                this.calendar.endDate = this.dateAdapter.deserialize(new Date());
                break;
            case 'Lastmonth':
                this.calendar.beginDate = this.dateAdapter.deserialize(today.subtract(29,'days').toDate());
                this.calendar.endDate = this.dateAdapter.deserialize(new Date());
                break;
        }
        this.calendar.activeDate = this.calendar.beginDate;
        this.calendar.beginDateSelectedChange.emit(this.calendar.beginDate);
        this.calendar.dateRangesChange.emit({begin: this.calendar.beginDate, end: this.calendar.endDate});
        this.datePicker.close();
    }
}
