package at.fh.ima.swengs.moviedbv3.facade;

import at.fh.ima.swengs.moviedbv3.dto.QuestionaireDTO;
import at.fh.ima.swengs.moviedbv3.model.Questionaire;
import at.fh.ima.swengs.moviedbv3.service.QuestionaireService;
import at.fh.ima.swengs.moviedbv3.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

@Service()
@Transactional
public class QuestionaireFacade {

  @Autowired
  private UserService userService;

  @Autowired
  private QuestionaireService questionaireService;

  void mapDtoToEntity(QuestionaireDTO dto, Questionaire entity){
    entity.setAnswer1(dto.getAnswer1());
    entity.setAnswer2(dto.getAnswer2());
    entity.setAnswer3(dto.getAnswer3());
    entity.setAnswer4(dto.getAnswer4());
    entity.setAnswer5(dto.getAnswer5());
    entity.setAnswer6(dto.getAnswer6());
    entity.setAnswer7(dto.getAnswer7());
    entity.setAnswer8(dto.getAnswer8());
    entity.setAnswer9(dto.getAnswer9());
    entity.setAnswer10(dto.getAnswer10());
    entity.setUsers(userService.getUserSet(dto.getUsers()));
  }

  void mapEntityToDto(Questionaire entity, QuestionaireDTO dto){
    dto.setId(entity.getId());
    dto.setAnswer1(entity.getAnswer1());
    dto.setAnswer2(entity.getAnswer2());
    dto.setAnswer3(entity.getAnswer3());
    dto.setAnswer4(entity.getAnswer4());
    dto.setAnswer5(entity.getAnswer5());
    dto.setAnswer6(entity.getAnswer6());
    dto.setAnswer7(entity.getAnswer7());
    dto.setAnswer8(entity.getAnswer8());
    dto.setAnswer9(entity.getAnswer9());
    dto.setAnswer10(entity.getAnswer10());
    dto.setUsers(entity.getUsers().stream().map((m) -> m.getId()).collect(Collectors.toSet()));
  }

  public QuestionaireDTO update(Long id, QuestionaireDTO dto) {
    Questionaire entity = questionaireService.findById(id).get();
    mapDtoToEntity(dto, entity);
    mapEntityToDto(questionaireService.save(entity), dto);
    return dto;
  }

  public QuestionaireDTO create(QuestionaireDTO dto) {
    Questionaire entity = new Questionaire();
    mapDtoToEntity(dto, entity);
    mapEntityToDto(questionaireService.save(entity), dto);
    return dto;
  }

  public QuestionaireDTO getById(Long id) {
    Questionaire entity = questionaireService.findById(id).get();
    QuestionaireDTO dto = new QuestionaireDTO();
    mapEntityToDto(entity, dto);
    return dto;
  }

}
