import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatemenuComponent } from './updatemenu.component';

describe('UpdatemenuComponent', () => {
  let component: UpdatemenuComponent;
  let fixture: ComponentFixture<UpdatemenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatemenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
