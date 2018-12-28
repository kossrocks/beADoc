package at.fh.ima.swengs.beadoc.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;
import java.util.Set;

@Entity
@JsonIdentityInfo(
  generator = ObjectIdGenerators.PropertyGenerator.class,
  property = "id")
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  private String name;
  private String lastName;

  private String username;
  private String password;

  private String eMail;

  @Temporal(TemporalType.TIMESTAMP)
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
  private Date dayOfBirth;

  private Set<Appointment> appointments;

  private Set<Medicine> medicines;

  private Document profilePicture;

  private Set<Document> medicinePictures;

  private boolean admin;
  private boolean employee;
  private boolean active;

  @Enumerated(EnumType.STRING)
  private Gender gender;

  public Set<Appointment> getAppointments() {
    return appointments;
  }

  public void setAppointments(Set<Appointment> appointments) {
    this.appointments = appointments;
  }

  public Set<Medicine> getMedicines() {
    return medicines;
  }

  public void setMedicines(Set<Medicine> medicines) {
    this.medicines = medicines;
  }

  public Document getProfilePicture() {
    return profilePicture;
  }

  public void setProfilePicture(Document profilePicture) {
    this.profilePicture = profilePicture;
  }

  public Set<Document> getMedicinePictures() {
    return medicinePictures;
  }

  public void setMedicinePictures(Set<Document> medicinePictures) {
    this.medicinePictures = medicinePictures;
  }

  public long getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public String geteMail() {
    return eMail;
  }

  public void seteMail(String eMail) {
    this.eMail = eMail;
  }

  public Date getDayOfBirth() {
    return dayOfBirth;
  }

  public void setDayOfBirth(Date dayOfBirth) {
    this.dayOfBirth = dayOfBirth;
  }

  public boolean isEmployee() {
    return employee;
  }

  public void setEmployee(boolean employee) {
    this.employee = employee;
  }

  public boolean isActive() {
    return active;
  }

  public void setActive(boolean active) {
    this.active = active;
  }

  public Gender getGender() {
    return gender;
  }

  public void setGender(Gender gender) {
    this.gender = gender;
  }

  public boolean isAdmin() {
    return admin;
  }

  public void setAdmin(boolean admin) {
    this.admin = admin;
  }

  public String getUsername() {
    return username;
  }

  public String getPassword() {
    return password;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    User user = (User) o;
    return Objects.equals(username, user.username) &&
      Objects.equals(password, user.password);
  }

  @Override
  public int hashCode() {
    return Objects.hash(username, password);
  }
}
