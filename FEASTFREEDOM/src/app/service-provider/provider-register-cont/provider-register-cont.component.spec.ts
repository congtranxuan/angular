import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderRegisterContComponent } from './provider-register-cont.component';

describe('ProviderRegisterContComponent', () => {
  let component: ProviderRegisterContComponent;
  let fixture: ComponentFixture<ProviderRegisterContComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderRegisterContComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderRegisterContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
