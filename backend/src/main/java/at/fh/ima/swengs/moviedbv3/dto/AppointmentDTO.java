package at.fh.ima.swengs.moviedbv3.dto;

import java.util.Date;
import java.util.Set;

public class AppointmentDTO {

    private long id;
    private Date appointmentDate;
    private long appointmentTime;
    private boolean fixed;
    private long patient;
    private boolean soon;
    private String preferences;

  public boolean isSoon() {
    return soon;
  }

  public void setSoon(boolean soon) {
    this.soon = soon;
  }

  public String getPreferences() {
    return preferences;
  }

  public void setPreferences(String preferences) {
    this.preferences = preferences;
  }

  public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(Date appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public long getAppointmentTime() {
        return appointmentTime;
    }

    public void setAppointmentTime(long appointmentTime) {
        this.appointmentTime = appointmentTime;
    }

    public boolean isFixed() {
        return fixed;
    }

    public void setFixed(boolean fixed) {
        this.fixed = fixed;
    }

    public long getPatient() {
        return patient;
    }

    public void setPatient(long patient) {
        this.patient = patient;
    }
}
