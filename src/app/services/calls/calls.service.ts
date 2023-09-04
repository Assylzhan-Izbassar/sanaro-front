import { Injectable } from '@angular/core';
import { BaseService } from '../core/base.service';
import { CallRequestData } from 'src/app/models/call-request.model';

@Injectable({
  providedIn: 'root'
})
export class CallsService extends BaseService {
  private readonly url: string = `${this.apiUrl}/lead_generation/callRequests/`;

  postCallRequest(data: CallRequestData) {
    return this.http.post<CallRequestData>(this.url, data);
  }
}
