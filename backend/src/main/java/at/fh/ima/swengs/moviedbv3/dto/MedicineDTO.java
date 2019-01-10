package at.fh.ima.swengs.moviedbv3.dto;

import java.util.Set;

public class MedicineDTO {

    private long id;
    private String name;
    private Set<Long> consumers;
    private String dosage;
    private String sideEffects;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Long> getConsumers() {
        return consumers;
    }

    public void setConsumers(Set<Long> consumers) {
        this.consumers = consumers;
    }

    public String getDosage() {
        return dosage;
    }

    public void setDosage(String dosage) {
        this.dosage = dosage;
    }

  public String getSideEffects() {
    return sideEffects;
  }

  public void setSideEffects(String sideEffects) {
    this.sideEffects = sideEffects;
  }
}
