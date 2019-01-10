package at.fh.ima.swengs.beadoc.facade;

import at.fh.ima.swengs.beadoc.dto.UserDTO;
import at.fh.ima.swengs.beadoc.model.User;
import at.fh.ima.swengs.beadoc.service.AppointmentService;
import at.fh.ima.swengs.beadoc.service.DocumentService;
import at.fh.ima.swengs.beadoc.service.MedicineService;
import at.fh.ima.swengs.beadoc.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
  DocumentService documentService;

  void mapDtoToEntity(UserDTO dto, User entity){

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

  }

  void mapEntityToDto(User entity, UserDTO dto){
    dto.setId(entity.getId());
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
  }

  public UserDTO update(Long id, UserDTO dto) {
    User entity = userService.findById(id).get();
    mapDtoToEntity(dto, entity);
    mapEntityToDto(userService.save(entity), dto);
    return dto;
  }

  public UserDTO create(UserDTO dto) {
    User entity = new User();
    mapDtoToEntity(dto, entity);
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
