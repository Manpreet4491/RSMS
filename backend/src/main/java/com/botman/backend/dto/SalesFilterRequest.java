package com.botman.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SalesFilterRequest {

    private Integer page = 0;
    private Integer size = 20;

    private String customerRegion;
    private String gender;
    private Integer minAge;
    private Integer maxAge;
    private String productCategory;
    private List<String> tags;
    private String paymentMethod;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate startDate;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate endDate;

    private String searchTerm;
    private String sortBy;
}
