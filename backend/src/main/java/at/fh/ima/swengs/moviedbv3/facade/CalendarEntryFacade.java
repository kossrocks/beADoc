package at.fh.ima.swengs.moviedbv3.facade;

import at.fh.ima.swengs.moviedbv3.dto.CalendarEntryDTO;
import at.fh.ima.swengs.moviedbv3.model.Appointment;
import at.fh.ima.swengs.moviedbv3.model.AppointmentRepository;
import at.fh.ima.swengs.moviedbv3.model.User;
import at.fh.ima.swengs.moviedbv3.model.UserRepository;
import at.fh.ima.swengs.moviedbv3.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service()
@Transactional
public class CalendarEntryFacade {

  @Autowired
  private AppointmentService appointmentService;
  @Autowired
  private AppointmentRepository appointmentRepository;
  @Autowired
  private UserRepository userRepository;

  void mapDtoToEntity(CalendarEntryDTO dto, Appointment entityApp, User entityUser) {

  }

  private void mapEntityToDto(Appointment entityApp, User entityUser, CalendarEntryDTO dto) {
    dto.setAppointmentDate(entityApp.getAppointmentDate());
    dto.setAppointmentTime(entityApp.getAppointmentTime());
    dto.setFixed(entityApp.isFixed());
    dto.setUserId(entityUser.getId());
    dto.setUsername(entityUser.getUsername());
    dto.setLastName(entityUser.getLastName());
    dto.setName(entityUser.getName());
  }

  public List<CalendarEntryDTO> getAll() {
    List<Appointment> listEntityApp = appointmentRepository.findAll();
    List<CalendarEntryDTO> dtos = new ArrayList<>();
    for(Appointment appointment: listEntityApp){
      CalendarEntryDTO dto = new CalendarEntryDTO();
      User user = userRepository.findById(appointment.getPatient().getId()).get();
      mapEntityToDto(appointment,user,dto);
      dtos.add(dto);
    }

    return dtos;
  }
}
