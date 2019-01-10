package at.fh.ima.swengs.moviedbv3.service;

import at.fh.ima.swengs.moviedbv3.model.Medicine;
import at.fh.ima.swengs.moviedbv3.model.MedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service()
public class MedicineService {

  @Autowired
  private MedicineRepository medicineRepository;

  public Optional<Medicine> findById(Long id) {
    return medicineRepository.findById(id);
  }

  public Medicine getMedicine(Long dto) {
    if (dto != null) {
      Medicine entity = medicineRepository.findById(dto).get();
      return entity;
    }
    return null;
  }

  public Set<Medicine> getMedicines(Set<Long> dtos){
    Set<Medicine> entities = new HashSet<>();
    dtos.forEach((dto)->entities.add(medicineRepository.findById(dto).get()));
    return entities;
  }

  public Medicine save(Medicine entity) {
    return medicineRepository.save(entity);
  }
}
