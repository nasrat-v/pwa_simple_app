import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainTestComponent } from './main-test.component';

describe('MainTestComponent', () => {
  let component: MainTestComponent;
  let fixture: ComponentFixture<MainTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
