package at.fh.ima.swengs.beadoc.service;

import at.fh.ima.swengs.beadoc.model.BloodType;
import at.fh.ima.swengs.beadoc.model.BloodTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service()
public class BloodTypeService {

  @Autowired
  private BloodTypeRepository bloodTypeRepository;

  public BloodType getBloodType(Long dto){
    if(dto!=null) {
      BloodType entity = bloodTypeRepository.findById(dto).get();
      return entity;
    }
    return null;
  }


}
