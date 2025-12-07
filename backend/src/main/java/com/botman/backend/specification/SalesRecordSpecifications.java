package com.botman.backend.specification;

import com.botman.backend.dto.SalesFilterRequest;
import com.botman.backend.model.SalesRecord;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class SalesRecordSpecifications {
    public static Specification<SalesRecord> withFilters(SalesFilterRequest req) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (req.getSearch() != null && !req.getSearch().isBlank()) {
                String like = "%" + req.getSearch().toLowerCase() + "%";
                predicates.add(cb.or(cb.like(cb.lower(root.get("customerName")), like), cb.like(cb.lower(root.get("phoneNumber")), like)));
            }

            if (req.getRegions() != null && !req.getRegions().isEmpty()) {
                predicates.add(root.get("customerRegion").in(req.getRegions()));
            }

            if (req.getGenders() != null && !req.getGenders().isEmpty()) {
                predicates.add(root.get("gender").in(req.getGenders()));
            }

            if (req.getProductCategories() != null && !req.getProductCategories().isEmpty()) {
                predicates.add(root.get("productCategory").in(req.getProductCategories()));
            }

            if (req.getPaymentMethods() != null && !req.getPaymentMethods().isEmpty()) {
                predicates.add(root.get("paymentMethod").in(req.getPaymentMethods()));
            }

            if (req.getCustomerTypes() != null && !req.getCustomerTypes().isEmpty()) {
                predicates.add(root.get("customerType").in(req.getCustomerTypes()));
            }

            if (req.getAgeMin() != null) predicates.add(cb.greaterThanOrEqualTo(root.get("age"), req.getAgeMin()));
            if (req.getAgeMax() != null) predicates.add(cb.lessThanOrEqualTo(root.get("age"), req.getAgeMax()));

            if (req.getDateFrom() != null) predicates.add(cb.greaterThanOrEqualTo(root.get("date"), req.getDateFrom()));
            if (req.getDateTo() != null) predicates.add(cb.lessThanOrEqualTo(root.get("date"), req.getDateTo()));

            if (req.getTags() != null && !req.getTags().isEmpty()) {
                List<Predicate> tagPredicates = new ArrayList<>();
                req.getTags().forEach(tag -> tagPredicates.add(cb.like(cb.lower(root.get("tags")), "%" + tag.toLowerCase() + "%")));
                predicates.add(cb.or(tagPredicates.toArray(new Predicate[0])));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
