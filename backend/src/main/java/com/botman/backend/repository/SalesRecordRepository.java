package com.botman.backend.repository;

import com.botman.backend.model.SalesRecord;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SalesRecordRepository extends JpaRepository<SalesRecord, String> {
    Page<SalesRecord> findAll(Specification<SalesRecord> salesRecordSpecification, Pageable pageable);
}
