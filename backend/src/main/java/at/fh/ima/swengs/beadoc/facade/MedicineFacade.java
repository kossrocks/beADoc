package at.fh.ima.swengs.beadoc.facade;

import at.fh.ima.swengs.beadoc.dto.MedicineDTO;
import at.fh.ima.swengs.beadoc.model.Medicine;
import at.fh.ima.swengs.beadoc.service.MedicineService;
import at.fh.ima.swengs.beadoc.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

@Service()
@Transactional
public class MedicineFacade {

    @Autowired
    private MedicineService medicineService;

    @Autowired
    private UserService userService;


    void mapDtoToEntity(MedicineDTO dto, Medicine entity) {
        entity.setName(dto.getName());
        entity.setConsumers(userService.getUserSet(dto.getConsumers()));
        entity.setDosage(dto.getDosage());
        entity.setSideEffects(dto.getSideEffects());
    }

    private void mapEntityToDto(Medicine entity, MedicineDTO dto) {
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        if (entity.getConsumers() != null) {
            dto.setConsumers(entity.getConsumers().stream().map((u) -> u.getId()).collect(Collectors.toSet()));
        }
        entity.setDosage(entity.getDosage());
        entity.setSideEffects(entity.getSideEffects());
    }

    public MedicineDTO update(Long id, MedicineDTO dto) {
        Medicine entity = medicineService.findById(id).get();
        mapDtoToEntity(dto, entity);
        mapEntityToDto(medicineService.save(entity), dto);
        return dto;
    }

    public MedicineDTO create(MedicineDTO dto) {
        Medicine entity = new Medicine();
        mapDtoToEntity(dto, entity);
        mapEntityToDto(medicineService.save(entity), dto);
        return dto;
    }

    public MedicineDTO getById(Long id) {
        Medicine entity = medicineService.findById(id).get();
        MedicineDTO dto = new MedicineDTO();
        mapEntityToDto(entity, dto);
        return dto;
    }

}
