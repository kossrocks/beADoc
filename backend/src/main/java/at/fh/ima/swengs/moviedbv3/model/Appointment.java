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

    private boolean soon;

    private String preferences;

    @Version
    @JsonIgnore
    private long version;

    public Appointment() {
    }

    public Appointment(Date appointmentDate, long appointmentTime) {
        LocalDate localDate = appointmentDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        this.id = ((localDate.getYear()*100000000)+(localDate.getMonthValue()*1000000)+(localDate.getDayOfMonth()*10000)+appointmentTime);
        this.appointmentDate = appointmentDate;

        this.appointmentTime = ((Math.floorDiv(appointmentTime,100)%24) *100) + ((appointmentTime - Math.floorDiv(appointmentTime,100)*100)%60);
    }

  public boolean isFixed() {
    return fixed;
  }

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
