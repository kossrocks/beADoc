import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentDoctorFormComponent } from './appointment-doctor-form.component';

describe('AppointmentDoctorFormComponent', () => {
  let component: AppointmentDoctorFormComponent;
  let fixture: ComponentFixture<AppointmentDoctorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentDoctorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentDoctorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
