import { TestBed } from '@angular/core/testing';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import {
  Question,
  QuestionData,
} from 'src/app/models/question.model';
import { environment } from 'src/environments/environment';

import { AnswersService } from './answers.service';

describe('AnswersService', () => {
  let service: AnswersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnswersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
