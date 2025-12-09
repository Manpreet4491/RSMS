package com.botman.backend.specification;

import com.botman.backend.model.SalesRecord;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.util.List;

public class SalesRecordSpecifications {

    public static Specification<SalesRecord> byCustomerRegion(String region) {
        return (root, query, cb) ->
                (region == null || region.isBlank())
                        ? null
                        : cb.equal(root.get("customerRegion"), region);
    }

    public static Specification<SalesRecord> byGender(String gender) {
        return (root, query, cb) ->
                (gender == null || gender.isBlank())
                        ? null
                        : cb.equal(root.get("gender"), gender);
    }

    public static Specification<SalesRecord> byAgeBetween(Integer minAge, Integer maxAge) {
        return (root, query, cb) -> {
            if (minAge == null && maxAge == null) return null;

            if (minAge != null && maxAge != null) {
                return cb.between(root.get("age"), minAge, maxAge);
            } else if (minAge != null) {
                return cb.greaterThanOrEqualTo(root.get("age"), minAge);
            } else {
                return cb.lessThanOrEqualTo(root.get("age"), maxAge);
            }
        };
    }

    public static Specification<SalesRecord> byProductCategory(String category) {
        return (root, query, cb) ->
                (category == null || category.isBlank())
                        ? null
                        : cb.equal(root.get("productCategory"), category);
    }

    public static Specification<SalesRecord> byPaymentMethod(String paymentMethod) {
        return (root, query, cb) ->
                (paymentMethod == null || paymentMethod.isBlank())
                        ? null
                        : cb.equal(root.get("paymentMethod"), paymentMethod);
    }

    public static Specification<SalesRecord> byTags(List<String> tags) {
        return (root, query, cb) -> {
            if (tags == null || tags.isEmpty()) return null;
            Predicate[] predicates = tags.stream()
                    .map(tag -> cb.like(cb.lower(root.get("tags")), "%" + tag.toLowerCase() + "%"))
                    .toArray(Predicate[]::new);

            return cb.or(predicates);
        };
    }

    public static Specification<SalesRecord> byDateRange(LocalDate start, LocalDate end) {
        return (root, query, cb) -> {
            if (start == null && end == null) return null;

            if (start != null && end != null) {
                return cb.between(root.get("date"), start, end);
            } else if (start != null) {
                return cb.greaterThanOrEqualTo(root.get("date"), start);
            } else {
                return cb.lessThanOrEqualTo(root.get("date"), end);
            }
        };
    }

    public static Specification<SalesRecord> bySearchTerm(String search) {
        return (root, query, cb) -> {
            if (search == null || search.isBlank()) return null;
            String like = "%" + search.toLowerCase() + "%";

            return cb.or(
                    cb.like(cb.lower(root.get("customerName")), like),
                    cb.like(cb.lower(root.get("phoneNumber")), like),
                    cb.like(cb.lower(root.get("productName")), like),
                    cb.like(cb.lower(root.get("employeeName")), like)
            );
        };
    }
}
