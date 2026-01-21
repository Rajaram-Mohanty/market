package org.projects.market.model;

import jakarta.persistence.*;
import lombok.*;
import org.projects.market.domain.AccountStatus;
import org.projects.market.domain.USER_ROLE;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class Seller {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;


    private String sellerName;


    private String mobile;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    @Embedded
    private BusinessDetails businessDetails = new BusinessDetails();


    @Embedded
    private BankDetails bankDetails = new BankDetails();


    @OneToOne(cascade = CascadeType.ALL)
    private Address pickupAddress = new Address();

    private String GSTIN;

    private USER_ROLE role;

    private Boolean isEmailVerified = false;

    private AccountStatus accountStatus = AccountStatus.PENDING_VERIFICATION;


}