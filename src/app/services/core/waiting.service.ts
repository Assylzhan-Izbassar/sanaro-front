import { Injectable } from '@angular/core';
import { firstValueFrom, isObservable, Observable } from 'rxjs';

declare const Zone: any;

@Injectable({
  providedIn: 'root',
})
export class WaitingService {
  constructor() {}

  async waitFor<T>(prom: Promise<T> | Observable<T>): Promise<T> {
    if (isObservable(prom)) {
      prom = firstValueFrom(prom);
    }

    const macroTask = Zone.current.scheduleMacroTask(
      `WAITFOR-${Math.random()}`,
      () => {},
      {},
      () => {}
    );
    return prom.then((p: T) => {
      macroTask.invoke();
      return p;
    });
  }
}
