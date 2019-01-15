package at.fh.ima.swengs.moviedbv3.controller;


import at.fh.ima.swengs.moviedbv3.dto.AppointmentEntryDTO;
import at.fh.ima.swengs.moviedbv3.facade.AppointmentEntryFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping
public class AppointmentEntryController {

    @Autowired
    private AppointmentEntryFacade appointmentEntryFacade;

    @GetMapping("/dto/appointmententries")
    List<AppointmentEntryDTO> getAppointmentEntries() {
        return appointmentEntryFacade.getAll();
    }
}
