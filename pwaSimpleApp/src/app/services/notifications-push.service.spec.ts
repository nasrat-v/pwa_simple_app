import { TestBed } from '@angular/core/testing';

import { NotificationsPushService } from './notifications-push.service';

describe('NotificationPushsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service : NotificationsPushService = TestBed.get(NotificationsPushService);
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