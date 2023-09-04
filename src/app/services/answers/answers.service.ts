import { Answer, AnswerData } from './../../models/answer.model';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { BaseService } from '../core/base.service';

@Injectable({
  providedIn: 'root',
})
export class AnswersService extends BaseService {
  private readonly baseUrl: string = `${this.apiUrl}/content_management/`;
  private readonly url: string = `${this.apiUrl}/content_management/answers/`

  getAnswers(idx: number): Observable<Answer[]> {
    let tempUrl = this.baseUrl + 'questions/' + `${idx}/answers/`;
    return this.http.get<AnswerData[]>(tempUrl).pipe(
      map((response: any[]) => {
        return response.map((item) => new Answer(item));
      }),
      catchError(this.handleError)
    );
  }
}
