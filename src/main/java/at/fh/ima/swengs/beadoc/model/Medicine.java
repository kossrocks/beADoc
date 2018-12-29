package at.fh.ima.swengs.beadoc.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.util.Objects;
import java.util.Set;

@Entity
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class Medicine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    @OneToOne
    private Document picture;

    @ManyToMany
    private Set<User> consumers;

    private String dosage;

    private Set<String> sideEffects;

    @Version
    @JsonIgnore
    private long version;

    public long getId() {
        return id;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Document getPicture() {
        return picture;
    }

    public void setPicture(Document picture) {
        this.picture = picture;
    }

    public Set<User> getConsumers() {
        return consumers;
    }

    public void setConsumers(Set<User> consumers) {
        this.consumers = consumers;
    }

    public String getDosage() {
        return dosage;
    }

    public void setDosage(String dosage) {
        this.dosage = dosage;
    }

    public Set<String> getSideEffects() {
        return sideEffects;
    }

    public void setSideEffects(Set<String> sideEffects) {
        this.sideEffects = sideEffects;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Medicine medicine = (Medicine) o;
        return id == medicine.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
