import { Component } from '@angular/core';

import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-edit',
  imports: [],
  templateUrl: './edit.html',
  styleUrl: './edit.css'
})
export class Edit {

  valueObservable = 0;
  valuePromise = 0;

  executeObservable() {

    interval(1000)
      .pipe(
        map(val =>
          val + 1
        )
      )
      .subscribe(val => {
        this.valueObservable = val;
      });
  }

  executePromise() {
    let count = 1;

    const step = () => {
      if (count > 5) return;

      new Promise<void>((resolve) => {
        setTimeout(() => {
          this.valuePromise = count;
          count++;
          resolve();
        }, 1000);
      }).then(() => step());
    };

    step();
  }

}
