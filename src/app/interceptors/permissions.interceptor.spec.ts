import { TestBed } from '@angular/core/testing';

import { PermissionsInterceptor } from './permissions.interceptor';

describe('PermissionsInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      PermissionsInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: PermissionsInterceptor = TestBed.inject(PermissionsInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
