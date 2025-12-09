package com.botman.backend.service;

import com.botman.backend.dto.SalesFilterRequest;
import com.botman.backend.model.SalesRecord;
import com.botman.backend.repository.SalesRecordRepository;
import com.botman.backend.specification.SalesRecordSpecifications;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SalesService {

    private final SalesRecordRepository repository;

    public Page<SalesRecord> getSales(SalesFilterRequest req) {

        int page = req.getPage() != null ? req.getPage() : 0;
        int size = req.getSize() != null ? req.getSize() : 20;

        Sort sort = buildSort(req.getSortBy());

        Specification<SalesRecord> spec = Specification
                .where(SalesRecordSpecifications.byCustomerRegion(req.getCustomerRegion()))
                .and(SalesRecordSpecifications.byGender(req.getGender()))
                .and(SalesRecordSpecifications.byAgeBetween(req.getMinAge(), req.getMaxAge()))
                .and(SalesRecordSpecifications.byProductCategory(req.getProductCategory()))
                .and(SalesRecordSpecifications.byPaymentMethod(req.getPaymentMethod()))
                .and(SalesRecordSpecifications.byTags(req.getTags()))
                .and(SalesRecordSpecifications.byDateRange(req.getStartDate(), req.getEndDate()))
                .and(SalesRecordSpecifications.bySearchTerm(req.getSearchTerm()));

        return repository.findAll(spec, PageRequest.of(page, size, sort));

    }

    private Sort buildSort(String sortByRaw) {
        if (sortByRaw == null || sortByRaw.isBlank()) {
            return Sort.by("customerName").ascending();
        }

        return switch (sortByRaw) {
            case "CUSTOMER_NAME_DESC" -> Sort.by("customerName").descending();
            case "DATE_ASC" -> Sort.by("date").ascending();
            case "DATE_DESC" -> Sort.by("date").descending();
            case "TOTAL_AMOUNT_ASC" -> Sort.by("totalAmount").ascending();
            case "TOTAL_AMOUNT_DESC" -> Sort.by("totalAmount").descending();
            default -> Sort.by("customerName").ascending();
        };
    }
}
