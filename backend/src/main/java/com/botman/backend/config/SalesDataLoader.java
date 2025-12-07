package com.botman.backend.config;

import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import com.botman.backend.model.SalesRecord;
import com.botman.backend.repository.SalesRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.InputStreamReader;
import java.io.Reader;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Component
@RequiredArgsConstructor
public class SalesDataLoader implements CommandLineRunner {

    private final SalesRecordRepository repository;
    private static final DateTimeFormatter DATE_FMT = DateTimeFormatter.ofPattern("M/d/yy");

    @Override
    public void run(String... args) throws Exception {
        long existing = repository.count();
        System.out.println("SalesDataLoader: existing rows = " + existing);
        if (existing > 0) return;

        ClassPathResource resource = new ClassPathResource("data/sales_data.csv");
        if (!resource.exists()) {
            System.out.println("CSV not found: data/sales_data.csv");
            return;
        }

        try (Reader r = new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8);
             CSVReader csv = new CSVReaderBuilder(r).withSkipLines(1).build()) {

            String[] cols;
            int rows = 0;

            while ((cols = csv.readNext()) != null) {
                if (cols.length < 26) continue;

                SalesRecord record = SalesRecord.builder()
                        .transactionId(cols[0].trim())
                        .date(parseDate(cols[1]))
                        .customerId(cols[2].trim())
                        .customerName(cols[3].trim())
                        .phoneNumber(cols[4].trim())
                        .gender(cols[5].trim())
                        .age(parseInt(cols[6]))
                        .customerRegion(cols[7].trim())
                        .customerType(cols[8].trim())
                        .productId(cols[9].trim())
                        .productName(cols[10].trim())
                        .brand(cols[11].trim())
                        .productCategory(cols[12].trim())
                        .tags(cols[13].trim())
                        .quantity(parseInt(cols[14]))
                        .pricePerUnit(parseBig(cols[15]))
                        .discountPercentage(parseBig(cols[16]))
                        .totalAmount(parseBig(cols[17]))
                        .finalAmount(parseBig(cols[18]))
                        .paymentMethod(cols[19].trim())
                        .orderStatus(cols[20].trim())
                        .deliveryType(cols[21].trim())
                        .storeId(cols[22].trim())
                        .storeLocation(cols[23].trim())
                        .salespersonId(cols[24].trim())
                        .employeeName(cols[25].trim())
                        .build();

                repository.save(record);
                rows++;
            }

            System.out.println("CSV load complete. Inserted rows: " + rows);
            System.out.println("Total rows in DB: " + repository.count());
        }
    }

    private LocalDate parseDate(String v) {
        v = v.trim();
        if (v.isEmpty()) return null;
        try {
            return LocalDate.parse(v, DATE_FMT);
        } catch (Exception e) {
            return null;
        }
    }

    private Integer parseInt(String v) {
        v = v.trim();
        if (v.isEmpty()) return null;
        try {
            return Integer.valueOf(v);
        } catch (Exception e) {
            return null;
        }
    }

    private BigDecimal parseBig(String v) {
        v = v.trim();
        if (v.isEmpty()) return null;
        try {
            return new BigDecimal(v);
        } catch (Exception e) {
            return null;
        }
    }
}
