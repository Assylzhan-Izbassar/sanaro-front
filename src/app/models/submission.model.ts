/**
 * Models for Submission class in Backend.
 */

export interface ResponseData {
  id?: number;
  question: number;
  answer: number;
}

export interface SubmissionData {
  id?: number;
  username: string;
  phone_number: string;
  is_consult: boolean;
  responses: [ResponseData];
}
