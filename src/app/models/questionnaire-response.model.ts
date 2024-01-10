// questionnaire-response.model.ts

export interface QuestionnaireResponseData {
  id?: number;
  questionnaire_uuid: string;
  response: number;
  user?: number;
}

export class QuestionnaireResponse {
  private _id?: number | undefined;
  // getter and setter for _id
  public get id(): number | undefined {
    return this._id;
  }

  private _questionnaire_uuid: string;
  // getter and setter for _questionnaire_uuid
  public get questionnaire_uuid(): string {
    return this._questionnaire_uuid;
  }
  public set questionnaire_uuid(value: string) {
    this._questionnaire_uuid = value;
  }

  private _response: number;
  // getter and setter for _response
  public get response(): number {
    return this._response;
  }
  public set response(value: number) {
    this._response = value;
  }

  private _user?: number;
  // getter and setter for _user
  public get user(): number {
    return this._user ? this._user : -1;
  }
  public set user(value: number) {
    this._user = value;
  }

  static count: number = 0;

  constructor(data: QuestionnaireResponseData) {
    if(data.id) {
        this._id = data.id;
    } else {
        this._id = QuestionnaireResponse.count++;
    }
    this._questionnaire_uuid = data.questionnaire_uuid;
    this._response = data.response;
    this._user = data.user;
  }
}
