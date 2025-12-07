package com.botman.backend.dto;

import jakarta.validation.constraints.Min;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.List;

@Data
public class SalesFilterRequest {
    private String search;

    private List<String> regions;
    private List<String> genders;
    private List<String> productCategories;
    private List<String> tags;
    private List<String> paymentMethods;
    private List<String> customerTypes;

    @Min(0)
    private Integer ageMin;

    @Min(0)
    private Integer ageMax;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate dateFrom;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate dateTo;

    private String sortBy = "date";
    private String sortDir = "desc";

    private int page = 0;
    private int size = 10;
}
