package at.fh.ima.swengs.moviedbv3.controller;

import at.fh.ima.swengs.moviedbv3.dto.InquiryDTO;
import at.fh.ima.swengs.moviedbv3.facade.InquiryFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
public class InquiryController {

    @Autowired
    private InquiryFacade inquiryFacade;

    @PostMapping("/dto/inquirys")
    InquiryDTO create(@RequestBody @Valid InquiryDTO dto) {
        return inquiryFacade.create(dto);
    }

    @GetMapping("/dto/inquiryentries")
    List<InquiryDTO> getInquiryEntries() {
        return inquiryFacade.getAll();
    }
}
