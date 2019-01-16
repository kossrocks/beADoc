package at.fh.ima.swengs.moviedbv3.service;

import at.fh.ima.swengs.moviedbv3.model.Questionaire;
import at.fh.ima.swengs.moviedbv3.model.QuestionaireRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service()
public class QuestionaireService {

  @Autowired
  private QuestionaireRepository questionaireRepository;

  public Optional<Questionaire> findById(Long id) {
    return questionaireRepository.findById(id);
  }

  public Questionaire save(Questionaire entity) {
    return questionaireRepository.save(entity);
  }

  public Set<Questionaire> getQuestionaires(Set<Long> dtos) {
    Set<Questionaire> entities = new HashSet<>();
    dtos.forEach((dto)->entities.add(questionaireRepository.findById(dto).get()));
    return entities;
  }
}
