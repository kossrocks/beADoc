import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentPatientFormComponent } from './appointment-patient-form.component';

describe('AppointmentPatientFormComponent', () => {
  let component: AppointmentPatientFormComponent;
  let fixture: ComponentFixture<AppointmentPatientFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentPatientFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentPatientFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
