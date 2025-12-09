package com.botman.backend.controller;

import com.botman.backend.dto.SalesFilterRequest;
import com.botman.backend.model.SalesRecord;
import com.botman.backend.service.SalesService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sales")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class SalesController {
    private final SalesService salesService;

    @GetMapping
    public Page<SalesRecord> getSales(@Valid SalesFilterRequest request) {
        return salesService.getSales(request);
    }

    @GetMapping("/ping")
    public String ping() {
        return "ok";
    }
}
