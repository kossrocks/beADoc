import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentPatientListComponent } from './appointment-patient-list.component';

describe('AppointmentPatientListComponent', () => {
  let component: AppointmentPatientListComponent;
  let fixture: ComponentFixture<AppointmentPatientListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentPatientListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentPatientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
