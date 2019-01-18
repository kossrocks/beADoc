package at.fh.ima.swengs.moviedbv3.controller;

import at.fh.ima.swengs.moviedbv3.dto.UserDTO;
import at.fh.ima.swengs.moviedbv3.facade.UserFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class UserController {

  @Autowired
  private UserFacade userFacade;

  @GetMapping("/dto/users/{id}")
  UserDTO getById(@PathVariable Long id) {
    return userFacade.getById(id);
  }

  @GetMapping("/dto/users}")
  List<UserDTO> getAll() {
    return userFacade.getAll();
  }

  @PostMapping("/dto/users")
  UserDTO create(@RequestBody @Valid UserDTO dto) {
    return userFacade.create(dto);
  }

  @PutMapping("/dto/users/{id}")
  UserDTO update(@RequestBody @Valid UserDTO dto, @PathVariable Long id) {
    return userFacade.update(id, dto);
  }

}
