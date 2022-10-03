import { Injectable } from '@angular/core';

@Injectable()
export class AppInfoService {
  constructor() {}

  public get title() {
    return 'نظام أرشيف لحفظ الوثائق';
  }

  public get currentYear() {
    return new Date().getFullYear();
  }
}
