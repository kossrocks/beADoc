package at.fh.ima.swengs.moviedbv3.facade;

import at.fh.ima.swengs.moviedbv3.dto.InquiryDTO;
import at.fh.ima.swengs.moviedbv3.model.Inquiry;
import at.fh.ima.swengs.moviedbv3.model.InquiryRepository;
import at.fh.ima.swengs.moviedbv3.model.User;
import at.fh.ima.swengs.moviedbv3.model.UserRepository;
import at.fh.ima.swengs.moviedbv3.service.InquiryService;
import at.fh.ima.swengs.moviedbv3.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service()
@Transactional
public class InquiryFacade {

  @Autowired
  private InquiryService inquiryService;

  @Autowired
  private InquiryRepository inquiryRepository;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private UserService userService;

  //User entity should not be changed by a changing inquiry
  void mapDtoToEntity(InquiryDTO dto, Inquiry entityInq) {
    entityInq.setId(dto.getId());
    entityInq.setSoon(dto.isSoon());
    entityInq.setMonday(dto.isMonday());
    entityInq.setTuesday(dto.isTuesday());
    entityInq.setWednesday(dto.isWednesday());
    entityInq.setThursday(dto.isThursday());
    entityInq.setFriday(dto.isFriday());
    entityInq.setMorning(dto.isMorning());
    entityInq.setMidday(dto.isMidday());
    entityInq.setAfternoon(dto.isAfternoon());
    entityInq.setPatient(userService.getByUsername(SecurityContextHolder.getContext().getAuthentication().getName()));
    entityInq.setDayOfCreation(dto.getDayOfCreation());
  }

  //user entity is needed to correctly fill inquiryDTO
  private void mapEntityToDto(Inquiry entityInq, User entityUser, InquiryDTO dto) {
    dto.setId(entityInq.getId());
    dto.setUserId(entityUser.getId());
    dto.setUsername(entityUser.getUsername());
    dto.setName(entityUser.getName());
    dto.setLastName(entityUser.getLastName());
    dto.setSoon(entityInq.isSoon());
    dto.setMonday(entityInq.isMonday());
    dto.setTuesday(entityInq.isTuesday());
    dto.setWednesday(entityInq.isWednesday());
    dto.setThursday(entityInq.isThursday());
    dto.setFriday(entityInq.isFriday());
    dto.setMorning(entityInq.isMorning());
    dto.setMidday(entityInq.isMidday());
    dto.setAfternoon(entityInq.isAfternoon());
    dto.setDayOfCreation(entityInq.getDayOfCreation());
  }

  public InquiryDTO create(InquiryDTO dto) {
    Inquiry entity = new Inquiry();
    mapDtoToEntity(dto, entity);
    entity.setDayOfCreation(new Date());
    inquiryService.save(entity);
    return dto;
  }

  public List<InquiryDTO> getAll() {
    List<Inquiry> listEntityApp = inquiryRepository.findAll();
    List<InquiryDTO> dtos = new ArrayList<>();
    for (Inquiry inquiry : listEntityApp) {
      InquiryDTO dto = new InquiryDTO();
      User user = userRepository.findById(inquiry.getPatient().getId()).get(); //find the User that created the inquiry
      mapEntityToDto(inquiry, user, dto);
      dtos.add(dto);
    }

    return dtos;
  }

  public InquiryDTO getById(Long id) {
    Inquiry entity = inquiryService.findById(id).get();
    InquiryDTO dto = new InquiryDTO();
    User user = userRepository.findById(entity.getPatient().getId()).get();
    mapEntityToDto(entity, user, dto);
    return dto;
  }


}
