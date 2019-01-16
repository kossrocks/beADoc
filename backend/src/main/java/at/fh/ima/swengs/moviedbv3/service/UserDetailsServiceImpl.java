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
      List<String> questionaireAnswers = Arrays.asList("1", "2", "3");
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
      admin.setAdmin(true);
      admin.setEmployee(true);
      questionaires.add(questionaireRepository.findAll().get(0));
      admin.setQuestionaires(questionaires);
      userRepository.save(admin);

      at.fh.ima.swengs.moviedbv3.model.User employee = new at.fh.ima.swengs.moviedbv3.model.User();
      employee.setUsername("employee");
      employee.setName("Emmi");
      employee.setLastName("Emsig");
      employee.setPassword(encoder.encode("12345"));
      employee.setEmployee(true);
      questionaires.removeAll(questionaires);
      questionaires.add(questionaireRepository.findAll().get(1));
      employee.setQuestionaires(questionaires);
      userRepository.save(employee);

      at.fh.ima.swengs.moviedbv3.model.User tester = new at.fh.ima.swengs.moviedbv3.model.User();
      tester.setUsername("tester");
      tester.setName("Teo");
      tester.setLastName("Stern");
      tester.setPassword(encoder.encode("12345"));
      questionaires.removeAll(questionaires);
      questionaires.add(questionaireRepository.findAll().get(2));
      tester.setQuestionaires(questionaires);
      userRepository.save(tester);


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
      at.fh.ima.swengs.moviedbv3.model.Appointment appointmentFixed = new at.fh.ima.swengs.moviedbv3.model.Appointment(new Date(119, 0, 12, 13, 0), 1234);
      appointmentFixed.setFixed(true);
      appointmentFixed.setPatient(userRepository.findByUsername("tester"));
      appointmentRepository.save(appointmentFixed);

      at.fh.ima.swengs.moviedbv3.model.Appointment appointmentNotFixed = new at.fh.ima.swengs.moviedbv3.model.Appointment(new Date(119, 0, 12, 14, 0), 1864);
      appointmentNotFixed.setFixed(false);
      appointmentNotFixed.setPatient(userRepository.findByUsername("tester"));
      appointmentRepository.save(appointmentNotFixed);

      at.fh.ima.swengs.moviedbv3.model.Appointment appointmentOtherUser = new at.fh.ima.swengs.moviedbv3.model.Appointment(new Date(119, 0, 12, 15, 0), 987);
      appointmentOtherUser.setFixed(true);
      appointmentOtherUser.setPatient(userRepository.findByUsername("admin"));
      appointmentRepository.save(appointmentOtherUser);
    }

    if (inquiryRepository.count() == 0) {
      at.fh.ima.swengs.moviedbv3.model.Inquiry inquiry = new at.fh.ima.swengs.moviedbv3.model.Inquiry();
      inquiry.setPatient(userRepository.findByUsername("tester"));
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

}
