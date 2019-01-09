package at.fh.ima.swengs.beadoc.controller;

import at.fh.ima.swengs.beadoc.dto.UserDTO;
import at.fh.ima.swengs.beadoc.facade.UserFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
public class UserController {

  @Autowired
  private UserFacade userFacade;

  @GetMapping("/dto/actors/{id}")
  UserDTO getById(@PathVariable Long id) {
    return userFacade.getById(id);
  }

  @PostMapping("/dto/actors")
  UserDTO create(@RequestBody @Valid UserDTO dto) {
    return userFacade.create(dto);
  }

  @PutMapping("/dto/actors/{id}")
  UserDTO update(@RequestBody @Valid UserDTO dto, @PathVariable Long id) {
    return userFacade.update(id, dto);
  }

}
