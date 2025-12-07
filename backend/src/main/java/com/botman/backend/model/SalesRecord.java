package com.botman.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name="sales")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SalesRecord {
    @Id
    @Column(name = "transaction_id", nullable = false, unique = true)
    private String transactionId;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "customer_id")
    private String customerId;

    @Column(name = "customer_name")
    private String customerName;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "gender")
    private String gender;

    @Column(name = "age")
    private Integer age;

    @Column(name = "customer_region")
    private String customerRegion;

    @Column(name = "customer_type")
    private String customerType;

    @Column(name = "product_id")
    private String productId;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "brand")
    private String brand;

    @Column(name = "product_category")
    private String productCategory;

    @Column(name = "tags", length = 1000)
    private String tags;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "price_per_unit", precision = 15, scale = 2)
    private BigDecimal pricePerUnit;

    @Column(name = "discount_percentage", precision = 5, scale = 2)
    private BigDecimal discountPercentage;

    @Column(name = "total_amount", precision = 15, scale = 2)
    private BigDecimal totalAmount;

    @Column(name = "final_amount", precision = 15, scale = 2)
    private BigDecimal finalAmount;

    @Column(name = "payment_method")
    private String paymentMethod;

    @Column(name = "order_status")
    private String orderStatus;

    @Column(name = "delivery_type")
    private String deliveryType;

    @Column(name = "store_id")
    private String storeId;

    @Column(name = "store_location")
    private String storeLocation;

    @Column(name = "salesperson_id")
    private String salespersonId;

    @Column(name = "employee_name")
    private String employeeName;
}
