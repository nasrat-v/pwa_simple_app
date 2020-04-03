import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterScreen } from './register-screen';

describe('LoginScreen', () => {
  let component: RegisterScreen;
  let fixture: ComponentFixture<RegisterScreen>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterScreen],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
