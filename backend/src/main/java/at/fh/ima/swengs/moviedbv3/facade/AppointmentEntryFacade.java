package at.fh.ima.swengs.moviedbv3.facade;

import at.fh.ima.swengs.moviedbv3.dto.AppointmentEntryDTO;
import at.fh.ima.swengs.moviedbv3.model.Appointment;
import at.fh.ima.swengs.moviedbv3.model.AppointmentRepository;
import at.fh.ima.swengs.moviedbv3.model.User;
import at.fh.ima.swengs.moviedbv3.model.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service()
@Transactional
public class AppointmentEntryFacade {

    @Autowired
    private AppointmentRepository appointmentRepository;
    @Autowired
    private UserRepository userRepository;

    void mapDtoToEntity(AppointmentEntryDTO dto, Appointment entityApp, User entityUser) {

    }

    private void mapEntityToDto(Appointment entityApp, User entityUser, AppointmentEntryDTO dto) {
        dto.setAppointmentDate(entityApp.getAppointmentDate());
        dto.setAppointmentTime(entityApp.getAppointmentTime());
        dto.setAppointmentID(entityApp.getId());
        dto.setFixed(entityApp.isFixed());
        dto.setUserId(entityUser.getId());
        dto.setUsername(entityUser.getUsername());
        dto.setLastName(entityUser.getLastName());
        dto.setName(entityUser.getName());
    }

    public List<AppointmentEntryDTO> getAll() {
        List<Appointment> listEntityApp = appointmentRepository.findAll();
        List<AppointmentEntryDTO> dtos = new ArrayList<>();
        for(Appointment appointment: listEntityApp){
            AppointmentEntryDTO dto = new AppointmentEntryDTO();
            User user = userRepository.findById(appointment.getPatient().getId()).get();
            mapEntityToDto(appointment,user,dto);
            dtos.add(dto);
        }

        return dtos;
    }
}
