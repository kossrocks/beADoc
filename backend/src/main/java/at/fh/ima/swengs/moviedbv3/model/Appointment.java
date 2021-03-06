package at.fh.ima.swengs.moviedbv3.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.Objects;
import java.util.Set;

@Entity
public class Appointment {

  @Id
  private long id;

  @Temporal(TemporalType.TIMESTAMP)
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
  private Date appointmentDate;
  private long appointmentTime;

  private boolean fixed;

  @ManyToOne
  private User patient;

  @Version
  @JsonIgnore
  private long version;

  public Appointment() {
  }
// to prevent that two appointments are created at the same time and date
  public Appointment(Date appointmentDate, long appointmentTime) {
    LocalDate localDate = appointmentDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
    this.id = ((localDate.getYear() * 100000000) + (localDate.getMonthValue() * 1000000) + (localDate.getDayOfMonth() * 10000) + appointmentTime);
    this.appointmentTime = ((Math.floorDiv(appointmentTime, 100) % 24) * 100) + ((appointmentTime - Math.floorDiv(appointmentTime, 100) * 100) % 60);

    this.appointmentDate = appointmentDate;


  }

  public boolean isFixed() {
    return fixed;
  }

  public long getId() {
    return id;
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

  public void setFixed(boolean fixed) {
    this.fixed = fixed;
  }

  public User getPatient() {
    return patient;
  }

  public void setPatient(User patient) {
    this.patient = patient;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Appointment that = (Appointment) o;
    return id == that.id;
  }

  @Override
  public int hashCode() {
    return Objects.hash(id);
  }
}
