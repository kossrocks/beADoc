package at.fh.ima.swengs.moviedbv3.service;

import at.fh.ima.swengs.moviedbv3.model.Inquiry;
import at.fh.ima.swengs.moviedbv3.model.InquiryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service()
public class InquiryService {

    @Autowired
    private InquiryRepository inquiryRepository;

    public Optional<Inquiry> findById(long id) {
        return inquiryRepository.findById(id);
    }

    public Inquiry save(Inquiry entity) {return inquiryRepository.save(entity); }

    public Set<Inquiry> getInquirys(Set<Long> dtos){
        Set<Inquiry> entities = new HashSet<>();
        if(entities == null || !entities.isEmpty()) dtos.forEach((dto)->entities.add(inquiryRepository.findById(dto).get()));
        return entities;
    }
}
