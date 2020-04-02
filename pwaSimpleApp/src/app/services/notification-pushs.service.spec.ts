import { TestBed } from '@angular/core/testing';

import { NotificationPushsService } from './notification-pushs.service';

describe('NotificationPushsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service : NotificationPushsService = TestBed.get(NotificationPushsService);
    expect(service).toBeTruthy();
  })
})

/*
describe('NotificationPushsService', () => {
  let service: NotificationPushsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationPushsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
*/