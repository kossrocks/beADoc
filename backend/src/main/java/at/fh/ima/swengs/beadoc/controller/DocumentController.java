package at.fh.ima.swengs.beadoc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
public class DocumentController {

  @Autowired
  private DocumentFacade documentFacade;

  @GetMapping("/dto/documents/{id}")
  DocumentDTO getById(@PathVariable Long id) {
    return documentFacade.getById(id);
  }

  @PostMapping("/dto/documents")
  DocumentDTO create(@RequestBody @Valid DocumentDTO dto) {
    return documentFacade.create(dto);
  }

  @PutMapping("/dto/documents/{id}")
  DocumentDTO update(@RequestBody @Valid DocumentDTO dto, @PathVariable Long id) {
    return documentFacade.update(id, dto);
  }

}
