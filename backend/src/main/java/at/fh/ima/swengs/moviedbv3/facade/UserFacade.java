package at.fh.ima.swengs.moviedbv3.facade;

import at.fh.ima.swengs.moviedbv3.dto.QuestionaireDTO;
import at.fh.ima.swengs.moviedbv3.dto.UserDTO;
import at.fh.ima.swengs.moviedbv3.model.Questionaire;
import at.fh.ima.swengs.moviedbv3.model.User;
import at.fh.ima.swengs.moviedbv3.service.*;
import at.fh.ima.swengs.moviedbv3.service.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service()
@Transactional
public class UserFacade {

  @Autowired
  UserService userService;

  @Autowired
  UserDetailsServiceImpl impl;

  @Autowired
  AppointmentService appointmentService;

  @Autowired
  private BCryptPasswordEncoder encoder;

  @Autowired
  MedicineService medicineService;

  @Autowired
  QuestionaireService questionaireService;

  @Autowired
  InquiryService inquiryService;


  void mapDtoToEntity(UserDTO dto, User entity) {

    entity.setName(dto.getName());
    entity.setLastName(dto.getLastName());
    entity.setUsername(dto.getUsername());
    if(dto.getPassword() == null || dto.getPassword().length() == 0) {
      entity.setPassword(entity.getPassword());
    } else{
      entity.setPassword(encoder.encode(dto.getPassword())); //HIER ENCRYPTEN
    }
    entity.setEMail(dto.getEMail());
    entity.setDayOfBirth(dto.getDayOfBirth());
    entity.setAppointments(appointmentService.getAppointments(dto.getAppointments()));
    entity.setMedicines(medicineService.getMedicines(dto.getMedicines()));
    entity.setAdmin(dto.isAdmin());
    entity.setEmployee(dto.isEmployee());
    entity.setActive(dto.isActive());
    entity.setGender(dto.getGender());
    entity.setPictures(dto.getPictures());
    entity.setProfilPictures(dto.getProfilPictures());
    //entity.setQuestionaires(questionaireService.getQuestionaires(dto.getQuestionaires()));
    entity.setInquiries(inquiryService.getInquirys(dto.getInquiries()));

  }

  void mapEntityToDto(User entity, UserDTO dto) {
    dto.setId(entity.getId());
    dto.setName(entity.getName());
    dto.setLastName(entity.getLastName());
    dto.setUsername(entity.getUsername());
    //dto.setPassword(entity.getPassword());
    dto.setEMail(entity.getEMail());
    dto.setDayOfBirth(entity.getDayOfBirth());
    if (entity.getAppointments() != null) {
      dto.setAppointments(entity.getAppointments().stream().map((a) -> a.getId()).collect(Collectors.toSet()));
    }
    if (entity.getMedicines() != null) {
      dto.setMedicines(entity.getMedicines().stream().map((m) -> m.getId()).collect(Collectors.toSet()));
    }
    dto.setAdmin(entity.isAdmin());
    dto.setEmployee(entity.isEmployee());
    dto.setActive(entity.isActive());
    dto.setGender(entity.getGender());
    dto.setPictures(entity.getPictures());
    dto.setProfilPictures(entity.getProfilPictures());
    if (entity.getQuestionaires() != null) {
      dto.setQuestionaires(entity.getQuestionaires().stream().map((m) -> m.getId()).collect(Collectors.toSet()));
    }
    if (entity.getInquiries() != null) {
      dto.setInquiries(entity.getInquiries().stream().map((m) -> m.getId()).collect(Collectors.toSet()));
    }
    String userDataString = Long.toString(entity.getId()) + ':' + entity.getLastName() + ' ' + entity.getName() ;
    dto.setUserData(userDataString);
  }

  public UserDTO update (Long id, UserDTO dto) {
    User entity = userService.findById(id).get();
    mapDtoToEntity(dto, entity);
    mapEntityToDto(userService.save(entity), dto);
    return dto;
  }

  public UserDTO create(UserDTO dto) {
    Questionaire questionaireEntity = new Questionaire();
    questionaireService.save(questionaireEntity);

    Set<Questionaire> questionaires = new HashSet<>();
    questionaires.add(questionaireEntity);

    User entity = new User();
    mapDtoToEntity(dto, entity);
    entity.setQuestionaires(questionaires);
    entity.setActive(true);
    mapEntityToDto(userService.save(entity), dto);

    return dto;
  }

  public UserDTO getById(Long id) {
    User entity = userService.findById(id).get();
    UserDTO dto = new UserDTO();
    mapEntityToDto(entity, dto);
    return dto;
  }

  public List<UserDTO> getAll(){
    List<User> entitys = userService.getAll();
    List<UserDTO> dtos = new ArrayList<>();
    for(User entity: entitys){
      UserDTO dto = new UserDTO();
      mapEntityToDto(entity,dto);
      dtos.add(dto);
    }
    return dtos;
  }

}
