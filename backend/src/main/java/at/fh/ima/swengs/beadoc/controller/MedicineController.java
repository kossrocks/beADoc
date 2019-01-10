package at.fh.ima.swengs.beadoc.controller;

import at.fh.ima.swengs.beadoc.dto.MedicineDTO;
import at.fh.ima.swengs.beadoc.facade.MedicineFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
public class MedicineController {

    @Autowired
    private MedicineFacade medicineFacade;

    @GetMapping("/dto/medicines/{id}")
    MedicineDTO getById(@PathVariable Long id) {
        return medicineFacade.getById(id);
    }

    @PostMapping("/dto/medicines")
    MedicineDTO create(@RequestBody @Valid MedicineDTO dto) {
        return medicineFacade.create(dto);
    }

    @PutMapping("/dto/medicines/{id}")
    MedicineDTO update(@RequestBody @Valid MedicineDTO dto, @PathVariable Long id) {
        return medicineFacade.update(id, dto);
    }

}
