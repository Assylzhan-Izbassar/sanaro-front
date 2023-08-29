import { Answer, AnswerData } from './../../models/answer.model';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { BaseService } from '../core/base.service';

@Injectable({
  providedIn: 'root',
})
export class AnswersService extends BaseService {
  private _url: string = `${this.apiUrl}/content_management/questions/`
  // getter and setter for _url
  public get url(): string {
    return this._url;
  }
  public set url(value: string) {
    this._url = value;
  }

  getAnswers(idx: number): Observable<Answer[]> {
    let tempUrl = this.url + `${idx}/answers/`;
    return this.http.get<AnswerData[]>(tempUrl).pipe(
      map((response: any[]) => {
        return response.map((item) => new Answer(item));
      }),
      catchError(this.handleError)
    );
  }
}
