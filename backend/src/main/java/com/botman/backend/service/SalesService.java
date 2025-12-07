package com.botman.backend.service;

import com.botman.backend.dto.SalesFilterRequest;
import com.botman.backend.model.SalesRecord;
import com.botman.backend.repository.SalesRecordRepository;
import com.botman.backend.specification.SalesRecordSpecifications;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SalesService {
    private final SalesRecordRepository repository;

    public Page<SalesRecord> getSales(SalesFilterRequest req) {

        if (req.getAgeMin() != null && req.getAgeMax() != null && req.getAgeMin() > req.getAgeMax()) {
            int t = req.getAgeMin();
            req.setAgeMin(req.getAgeMax());
            req.setAgeMax(t);
        }

        if (req.getDateFrom() != null && req.getDateTo() != null && req.getDateFrom().isAfter(req.getDateTo())) {
            var t = req.getDateFrom();
            req.setDateFrom(req.getDateTo());
            req.setDateTo(t);
        }

        String sortField = switch (req.getSortBy()) {
            case "quantity" -> "quantity";
            case "customerName" -> "customerName";
            default -> "date";
        };

        Sort sort = Sort.by("asc".equalsIgnoreCase(req.getSortDir()) ? Sort.Direction.ASC : Sort.Direction.DESC, sortField);
        Pageable pageable = PageRequest.of(Math.max(req.getPage(), 0), req.getSize() <= 0 ? 10 : req.getSize(), sort);

        return repository.findAll(SalesRecordSpecifications.withFilters(req), pageable);
    }
}
