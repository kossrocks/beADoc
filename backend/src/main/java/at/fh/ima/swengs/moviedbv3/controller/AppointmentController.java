package at.fh.ima.swengs.moviedbv3.controller;

import at.fh.ima.swengs.moviedbv3.dto.AppointmentDTO;
import at.fh.ima.swengs.moviedbv3.facade.AppointmentFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
public class AppointmentController {

    @Autowired
    private AppointmentFacade appointmentFacade;

    @GetMapping("/dto/appointments/{id}")
    AppointmentDTO getById(@PathVariable Long id) {
        return appointmentFacade.getById(id);
    }

    @PostMapping("/dto/appointments")
    AppointmentDTO create(@RequestBody @Valid AppointmentDTO dto) {
        return appointmentFacade.create(dto);
    }

    @PutMapping("/dto/appointments/{id}")
    AppointmentDTO update(@RequestBody @Valid AppointmentDTO dto, @PathVariable Long id) {
        return appointmentFacade.update(id, dto);
    }

}
