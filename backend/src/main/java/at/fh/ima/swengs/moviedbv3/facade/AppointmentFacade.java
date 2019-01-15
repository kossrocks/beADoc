package at.fh.ima.swengs.moviedbv3.facade;

import at.fh.ima.swengs.moviedbv3.dto.AppointmentDTO;
import at.fh.ima.swengs.moviedbv3.model.Appointment;
import at.fh.ima.swengs.moviedbv3.service.AppointmentService;
import at.fh.ima.swengs.moviedbv3.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service()
@Transactional
public class AppointmentFacade {

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private UserService userService;

    void mapDtoToEntity(AppointmentDTO dto, Appointment entity) {
        entity.setAppointmentDate(dto.getAppointmentDate());
        entity.setAppointmentTime(dto.getAppointmentTime());
        entity.setFixed(dto.isFixed());
        entity.setPatient(userService.getUser(dto.getPatient()));
    }

    private void mapEntityToDto(Appointment entity, AppointmentDTO dto) {
        dto.setId(entity.getId());
        dto.setAppointmentDate(entity.getAppointmentDate());
        dto.setAppointmentTime(entity.getAppointmentTime());
        dto.setFixed(entity.isFixed());
        if (entity.getPatient() != null) {
            dto.setPatient(entity.getPatient().getId());
        }
    }

    public AppointmentDTO update(Long id, AppointmentDTO dto) {
        Appointment entity = appointmentService.findById(id).get();
        mapDtoToEntity(dto, entity);
        mapEntityToDto(appointmentService.save(entity), dto);
        return dto;
    }

    public AppointmentDTO create(AppointmentDTO dto) {
        Appointment entity = new Appointment(dto.getAppointmentDate(), dto.getAppointmentTime());
        mapDtoToEntity(dto, entity);
        mapEntityToDto(appointmentService.save(entity), dto);
        return dto;
    }

    public AppointmentDTO getById(Long id) {
        Appointment entity = appointmentService.findById(id).get();
        AppointmentDTO dto = new AppointmentDTO();
        mapEntityToDto(entity, dto);
        return dto;
    }
}
