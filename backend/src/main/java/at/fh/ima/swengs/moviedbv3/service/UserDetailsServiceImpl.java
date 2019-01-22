package at.fh.ima.swengs.moviedbv3.service;

import at.fh.ima.swengs.moviedbv3.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.util.*;

import static at.fh.ima.swengs.moviedbv3.model.Gender.Female;
import static at.fh.ima.swengs.moviedbv3.model.Gender.Male;

@Service("userDetailsService")   // It has to be annotated with @Service.
public class UserDetailsServiceImpl implements UserDetailsService {

  @Autowired
  private BCryptPasswordEncoder encoder;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private MovieRepository movieRepository;

  @Autowired
  private AppointmentRepository appointmentRepository;

  @Autowired
  private QuestionaireRepository questionaireRepository;

  @Autowired
  private InquiryRepository inquiryRepository;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    try {
      at.fh.ima.swengs.moviedbv3.model.User user = userRepository.findByUsername(username);
      if (user.getUsername().equals(username)) {

        // Remember that Spring needs roles to be in this format: "ROLE_" + userRole (i.e. "ROLE_ADMIN")
        // So, we need to set it to that format, so we can verify and compare roles (i.e. hasRole("ADMIN")).
        //List<GrantedAuthority> grantedAuthorities = AuthorityUtils.commaSeparatedStringToAuthorityList(user.isAdmin() ? "ROLE_ADMIN" : "ROLE_USER");

        List<GrantedAuthority> grantedAuthorities = AuthorityUtils.commaSeparatedStringToAuthorityList(roleDistinguish(user));

        // The "User" class is provided by Spring and represents a model class for user to be returned by UserDetailsService
        // And used by auth manager to verify and check user authentication.
        return new User(user.getUsername(), user.getPassword(), grantedAuthorities);
      }
    } catch (Exception e) {
    }
    // If user not found. Throw this exception.
    throw new UsernameNotFoundException("Username: " + username + " not found");
  }

  private String roleDistinguish(at.fh.ima.swengs.moviedbv3.model.User user) {
    if (user.isAdmin()) return "ROLE_ADMIN";
    else if (user.isEmployee() && !user.isAdmin()) return "ROLE_EMPLOYEE";
    else return "ROLE_USER";
  }

  @PostConstruct()
  @Transactional
  public void initUsers() {
    if (questionaireRepository.count() == 0) {
      List<String> questionaireAnswers = Arrays.asList("Test1", "Test2", "Test3");
      List<Questionaire> questionaires = new ArrayList<>();
      questionaireAnswers.forEach(questionaireAnswer -> {
        Questionaire questionaire = new Questionaire();
        questionaire.setAnswer1(questionaireAnswer);
        questionaires.add(questionaire);
      });
      questionaireRepository.saveAll(questionaires);
    }

    if (userRepository.count() == 0) {

      Set<Questionaire> questionaires = new HashSet<>();

      at.fh.ima.swengs.moviedbv3.model.User admin = new at.fh.ima.swengs.moviedbv3.model.User();
      admin.setUsername("admin");
      admin.setName("Paul");
      admin.setLastName("Power");
      admin.setPassword(encoder.encode("12345"));
      admin.seteMail("admin@beadoc.com");
      admin.setDayOfBirth(new Date(177, 5, 23));
      admin.setGender(Male);
      admin.setAdmin(true);
      admin.setEmployee(true);
      admin.setActive(true);
      questionaires.add(questionaireRepository.findAll().get(0));
      admin.setQuestionaires(questionaires);
      userRepository.save(admin);

      at.fh.ima.swengs.moviedbv3.model.User employee = new at.fh.ima.swengs.moviedbv3.model.User();
      employee.setUsername("employee");
      employee.setName("Emmi");
      employee.setLastName("Emsig");
      employee.setPassword(encoder.encode("12345"));
      employee.seteMail("employee@beadoc.com");
      employee.setDayOfBirth(new Date(185, 11, 2));
      employee.setGender(Female);
      employee.setEmployee(true);
      employee.setActive(true);
      questionaires.removeAll(questionaires);
      questionaires.add(questionaireRepository.findAll().get(1));
      employee.setQuestionaires(questionaires);
      userRepository.save(employee);

      at.fh.ima.swengs.moviedbv3.model.User patient = new at.fh.ima.swengs.moviedbv3.model.User();
      patient.setUsername("patient");
      patient.setName("Teo");
      patient.setLastName("Stern");
      patient.setPassword(encoder.encode("12345"));
      patient.seteMail("patient@gmail.com");
      patient.setDayOfBirth(new Date(145, 1, 27));
      patient.setGender(Male);
      patient.setActive(true);
      questionaires.removeAll(questionaires);
      questionaires.add(questionaireRepository.findAll().get(2));
      patient.setQuestionaires(questionaires);
      userRepository.save(patient);


    }

    if (movieRepository.count() == 0) {
      List<String> movieNames = Arrays.asList("Tangled", "The Princess and the Frog", "Beauty and the Beast", "Monsters, Inc.", "Aladdin", "Pocahontas", "Hercules", "A Bug's Life");
      List<Movie> movies = new ArrayList<>();
      movieNames.forEach(movieName -> {
        Movie movie = new Movie();
        movie.setTitle(movieName);
        movies.add(movie);
      });
      movieRepository.saveAll(movies);
    }

    if (appointmentRepository.count() == 0) {
      at.fh.ima.swengs.moviedbv3.model.Appointment appointmentFixed = new at.fh.ima.swengs.moviedbv3.model.Appointment(new Date(119, 0, 12, 13, 0), 1300);//2019.01.12
      appointmentFixed.setFixed(true);
      appointmentFixed.setPatient(userRepository.findByUsername("patient"));
      appointmentRepository.save(appointmentFixed);

      at.fh.ima.swengs.moviedbv3.model.Appointment appointmentNotFixed = new at.fh.ima.swengs.moviedbv3.model.Appointment(new Date(119, 0, 12, 14, 0), 1400);
      appointmentNotFixed.setFixed(false);
      appointmentNotFixed.setPatient(userRepository.findByUsername("patient"));
      appointmentRepository.save(appointmentNotFixed);

      at.fh.ima.swengs.moviedbv3.model.Appointment appointmentOtherUser = new at.fh.ima.swengs.moviedbv3.model.Appointment(new Date(119, 0, 12, 15, 0), 1500);
      appointmentOtherUser.setFixed(true);
      appointmentOtherUser.setPatient(userRepository.findByUsername("patient"));
      appointmentRepository.save(appointmentOtherUser);
    }

    if (inquiryRepository.count() == 0) {
      at.fh.ima.swengs.moviedbv3.model.Inquiry inquiry = new at.fh.ima.swengs.moviedbv3.model.Inquiry();
      inquiry.setPatient(userRepository.findByUsername("patient"));
      inquiry.setSoon(false);
      inquiry.setMonday(true);
      inquiry.setTuesday(false);
      inquiry.setWednesday(false);
      inquiry.setThursday(false);
      inquiry.setFriday(false);
      inquiry.setMorning(true);
      inquiry.setMidday(false);
      inquiry.setAfternoon(false);
      inquiry.setDayOfCreation(new Date());
      inquiryRepository.save(inquiry);


    }

  }

  public String encryptPass(String password){
    return encoder.encode(password);
  }

}
