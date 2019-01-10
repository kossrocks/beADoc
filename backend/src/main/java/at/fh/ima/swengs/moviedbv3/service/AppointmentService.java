package at.fh.ima.swengs.beadoc.service;

import at.fh.ima.swengs.beadoc.model.Appointment;
import at.fh.ima.swengs.beadoc.model.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service()
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    public Optional<Appointment> findById(long id) { return appointmentRepository.findById(id); }

    public Appointment save(Appointment entity) {return appointmentRepository.save(entity); }

    public Set<Appointment> getAppointments(Set<Long> dtos){
      Set<Appointment> entities = new HashSet<>();
      dtos.forEach((dto)->entities.add(appointmentRepository.findById(dto).get()));
      return entities;
    }
}
