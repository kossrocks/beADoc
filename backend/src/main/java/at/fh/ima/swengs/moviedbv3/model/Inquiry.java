package at.fh.ima.swengs.moviedbv3.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Version;
import java.util.Objects;

@Entity
public class Inquiry {

    @Id
    private long id;
    private boolean soon;
    private boolean monday;
    private boolean tuesday;
    private boolean wednesday;
    private boolean thursday;
    private boolean friday;
    private boolean morning;
    private boolean midday;
    private boolean evening;

    @ManyToOne
    private User patient;

    @Version
    @JsonIgnore
    private long version;

    public Inquiry() {
    }

    public Inquiry(boolean soon, boolean monday, boolean tuesday, boolean wednesday, boolean thursday, boolean friday, boolean morning, boolean midday, boolean evening) {
        this.soon = soon;
        this.monday = monday;
        this.tuesday = tuesday;
        this.wednesday = wednesday;
        this.thursday = thursday;
        this.friday = friday;
        this.morning = morning;
        this.midday = midday;
        this.evening = evening;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public boolean isSoon() {
        return soon;
    }

    public void setSoon(boolean soon) {
        this.soon = soon;
    }

    public boolean isMonday() {
        return monday;
    }

    public void setMonday(boolean monday) {
        this.monday = monday;
    }

    public boolean isTuesday() {
        return tuesday;
    }

    public void setTuesday(boolean tuesday) {
        this.tuesday = tuesday;
    }

    public boolean isWednesday() {
        return wednesday;
    }

    public void setWednesday(boolean wednesday) {
        this.wednesday = wednesday;
    }

    public boolean isThursday() {
        return thursday;
    }

    public void setThursday(boolean thursday) {
        this.thursday = thursday;
    }

    public boolean isFriday() {
        return friday;
    }

    public void setFriday(boolean friday) {
        this.friday = friday;
    }

    public boolean isMorning() {
        return morning;
    }

    public void setMorning(boolean morning) {
        this.morning = morning;
    }

    public boolean isMidday() {
        return midday;
    }

    public void setMidday(boolean midday) {
        this.midday = midday;
    }

    public boolean isEvening() {
        return evening;
    }

    public void setEvening(boolean evening) {
        this.evening = evening;
    }

    public User getPatient() {
        return patient;
    }

    public void setPatient(User patient) {
        this.patient = patient;
    }

    public long getVersion() {
        return version;
    }

    public void setVersion(long version) {
        this.version = version;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Inquiry inquiry = (Inquiry) o;
        return id == inquiry.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
