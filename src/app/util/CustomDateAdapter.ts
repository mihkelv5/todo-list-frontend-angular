import {MAT_DATE_LOCALE, NativeDateAdapter} from '@angular/material/core';
import {Inject, Injectable, Optional} from "@angular/core";
import {Platform} from "@angular/cdk/platform";

@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {

  constructor(@Optional() @Inject(MAT_DATE_LOCALE) matDateLocale: any, platform: Platform) {
    super(matDateLocale, platform);
  }

  override getFirstDayOfWeek(): number {
    return 1;
  }
}
