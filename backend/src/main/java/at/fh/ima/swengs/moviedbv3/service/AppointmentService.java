package at.fh.ima.swengs.moviedbv3.service;

import at.fh.ima.swengs.moviedbv3.model.Appointment;
import at.fh.ima.swengs.moviedbv3.model.AppointmentRepository;
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
      if(entities == null || !entities.isEmpty()) dtos.forEach((dto)->entities.add(appointmentRepository.findById(dto).get()));
      return entities;
    }

    public long stringToLong(String timeString){
      return Long.parseLong(timeString.replaceAll(":",""));
    }

    public String longToString(long timeLong){
      String returnString = Long.toString(timeLong).length() == 3 ? Long.toString(timeLong).substring(0,1) + ':' + Long.toString(timeLong).substring(1) : Long.toString(timeLong).substring(0,2) + ':' + Long.toString(timeLong).substring(2);
      return returnString;
    }
}
