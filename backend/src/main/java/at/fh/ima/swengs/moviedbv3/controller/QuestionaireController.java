package at.fh.ima.swengs.moviedbv3.controller;

import at.fh.ima.swengs.moviedbv3.dto.QuestionaireDTO;
import at.fh.ima.swengs.moviedbv3.facade.QuestionaireFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
public class QuestionaireController {

  @Autowired
  private QuestionaireFacade questionaireFacade;

  @GetMapping("/dto/questionaires/{id}")
  QuestionaireDTO getById(@PathVariable Long id) {
    return questionaireFacade.getById(id);
  }

  @PostMapping("/dto/questionaires")
  QuestionaireDTO create(@RequestBody @Valid QuestionaireDTO dto) {
    return questionaireFacade.create(dto);
  }

  @PutMapping("/dto/questionaires/{id}")
  QuestionaireDTO update(@RequestBody @Valid QuestionaireDTO dto, @PathVariable Long id) {
    return questionaireFacade.update(id, dto);
  }

}
