package at.fh.ima.swengs.moviedbv3.facade;

import at.fh.ima.swengs.moviedbv3.dto.QuestionaireDTO;
import at.fh.ima.swengs.moviedbv3.dto.UserDTO;
import at.fh.ima.swengs.moviedbv3.model.Questionaire;
import at.fh.ima.swengs.moviedbv3.model.User;
import at.fh.ima.swengs.moviedbv3.service.AppointmentService;
import at.fh.ima.swengs.moviedbv3.service.MedicineService;
import at.fh.ima.swengs.moviedbv3.service.QuestionaireService;
import at.fh.ima.swengs.moviedbv3.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service()
@Transactional
public class UserFacade {

  @Autowired
  UserService userService;

  @Autowired
  AppointmentService appointmentService;

  @Autowired
  MedicineService medicineService;

  @Autowired
  QuestionaireService questionaireService;


  void mapDtoToEntity(UserDTO dto, User entity) {

    entity.setName(dto.getName());
    entity.setLastName(dto.getLastName());
    entity.setUsername(dto.getUsername());
    entity.setPassword(dto.getPassword());
    entity.setEMail(dto.getEMail());
    entity.setDayOfBirth(dto.getDayOfBirth());
    entity.setAppointments(appointmentService.getAppointments(dto.getAppointments()));
    entity.setMedicines(medicineService.getMedicines(dto.getMedicines()));
    entity.setAdmin(dto.isAdmin());
    entity.setEmployee(dto.isEmployee());
    entity.setActive(dto.isActive());
    entity.setGender(dto.getGender());
    entity.setPictures(dto.getPictures());
    //entity.setQuestionaires(questionaireService.getQuestionaires(dto.getQuestionaires()));

  }

  void mapEntityToDto(User entity, UserDTO dto) {
    dto.setId(entity.getId());
    dto.setName(entity.getName());
    dto.setLastName(entity.getLastName());
    dto.setUsername(entity.getUsername());
    dto.setPassword(entity.getPassword());
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
    if (entity.getQuestionaires() != null) {
      dto.setQuestionaires(entity.getQuestionaires().stream().map((m) -> m.getId()).collect(Collectors.toSet()));
    }
  }

  public UserDTO update(Long id, UserDTO dto) {
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
    mapEntityToDto(userService.save(entity), dto);




    return dto;
  }

  public UserDTO getById(Long id) {
    User entity = userService.findById(id).get();
    UserDTO dto = new UserDTO();
    mapEntityToDto(entity, dto);
    return dto;
  }

}
