package at.fh.ima.swengs.moviedbv3.dto;

import at.fh.ima.swengs.moviedbv3.model.Gender;
import at.fh.ima.swengs.moviedbv3.model.Media;
import at.fh.ima.swengs.moviedbv3.model.Questionaire;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;
import java.util.Set;

public class UserDTO {

  private long id;
  private String name;
  private String lastName;
  private String username;
  private String password;
  private String eMail;
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
  private Date dayOfBirth;
  private Set<Long> appointments;
  private Set<Long> medicines;
  private boolean admin;
  private boolean employee;
  private boolean active;
  private Gender gender;
  private Set<Media> profilPictures;
  private Set<Media> pictures;
  private Set<Long> questionaires;
  private Set<Long> inquiries;
  private String userData;

  public String getUserData() {
    return userData;
  }

  public void setUserData(String userData) {
    this.userData = userData;
  }

  public Set<Long> getInquiries() {
    return inquiries;
  }

  public void setInquiries(Set<Long> inquiries) {
    this.inquiries = inquiries;
  }

  public Set<Long> getQuestionaires() {
    return questionaires;
  }

  public void setQuestionaires(Set<Long> questionaires) {
    this.questionaires = questionaires;
  }

  public Set<Media> getPictures() {
    return pictures;
  }

  public void setPictures(Set<Media> pictures) {
    this.pictures = pictures;
  }

  public Set<Media> getProfilPictures() {
    return profilPictures;
  }

  public void setProfilPictures(Set<Media> profilPictures) {
    this.profilPictures = profilPictures;
  }

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

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
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

  public Set<Long> getAppointments() {
    return appointments;
  }

  public void setAppointments(Set<Long> appointments) {
    this.appointments = appointments;
  }

  public Set<Long> getMedicines() {
    return medicines;
  }

  public void setMedicines(Set<Long> medicines) {
    this.medicines = medicines;
  }

  public boolean isAdmin() {
    return admin;
  }

  public void setAdmin(boolean admin) {
    this.admin = admin;
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
}
