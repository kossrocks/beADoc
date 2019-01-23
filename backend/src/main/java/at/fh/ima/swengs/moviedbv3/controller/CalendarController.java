package at.fh.ima.swengs.moviedbv3.controller;

import at.fh.ima.swengs.moviedbv3.dto.CalendarEntryDTO;
import at.fh.ima.swengs.moviedbv3.facade.CalendarEntryFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping
public class CalendarController {

  @Autowired
  private CalendarEntryFacade calendarEntryFacade;

  @GetMapping("/dto/calendarentries")
  List<CalendarEntryDTO> getCalendarEntries() {
    return calendarEntryFacade.getAll();
  }

}
