package at.fh.ima.swengs.moviedbv3.facade;

import at.fh.ima.swengs.moviedbv3.dto.InquiryDTO;
import at.fh.ima.swengs.moviedbv3.model.Inquiry;
import at.fh.ima.swengs.moviedbv3.model.InquiryRepository;
import at.fh.ima.swengs.moviedbv3.model.User;
import at.fh.ima.swengs.moviedbv3.model.UserRepository;
import at.fh.ima.swengs.moviedbv3.service.InquiryService;
import at.fh.ima.swengs.moviedbv3.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service()
@Transactional
public class InquiryFacade {

    @Autowired
    private InquiryService inquiryService;

    @Autowired
    private InquiryRepository inquiryRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    void mapDtoToEntity(InquiryDTO dto, Inquiry entityInq) {
        entityInq.setId(dto.getId());
        entityInq.setSoon(dto.isSoon());
        entityInq.setMonday(dto.isMonday());
        entityInq.setTuesday(dto.isTuesday());
        entityInq.setWednesday(dto.isWednesday());
        entityInq.setThursday(dto.isThursday());
        entityInq.setFriday(dto.isFriday());
        entityInq.setMorning(dto.isMorning());
        entityInq.setMidday(dto.isMidday());
        entityInq.setAfternoon(dto.isAfternoon());

        //entityInq.setPatient(userService.getUser(dto.getPatient()));
    }

    private void mapEntityToDto (Inquiry entityInq, User entityUser, InquiryDTO dto) {
        dto.setUserId(entityUser.getId());
        dto.setUsername(entityUser.getUsername());
        dto.setName(entityUser.getName());
        dto.setLastName(entityUser.getLastName());
        dto.setSoon(entityInq.isSoon());
        dto.setMonday(entityInq.isSoon());
        dto.setTuesday(entityInq.isTuesday());
        dto.setWednesday(entityInq.isWednesday());
        dto.setThursday(entityInq.isThursday());
        dto.setFriday(entityInq.isFriday());
        dto.setMorning(entityInq.isMorning());
        dto.setMidday(entityInq.isMidday());
        dto.setAfternoon(entityInq.isAfternoon());
    }

    public InquiryDTO create(InquiryDTO dto) {
        Inquiry entity = new Inquiry();
        mapDtoToEntity(dto, entity);
        inquiryService.save(entity);
        return dto;
    }

    public List<InquiryDTO> getAll() {
        List<Inquiry> listEntityApp = inquiryRepository.findAll();
        List<InquiryDTO> dtos = new ArrayList<>();
        for(Inquiry appointment: listEntityApp){
            InquiryDTO dto = new InquiryDTO();
            User user = userRepository.findById(appointment.getPatient().getId()).get();
            mapEntityToDto(appointment,user,dto);
            dtos.add(dto);
        }

        return dtos;
    }


}
