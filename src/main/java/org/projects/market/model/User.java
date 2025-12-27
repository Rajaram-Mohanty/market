package org.projects.market.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;
import org.projects.market.domain.USER_ROLE;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)       //@JsonProperty(access = Access.WRITE_ONLY): Creates a one-way door that allows the backend to receive sensitive data (like passwords) from the client while ensuring it is never sent back in the response.
    private String password;

    private String email;

    private String FullName;

    private String mobile;

    private USER_ROLE role = USER_ROLE.ROLE_COSTUMER;

    @OneToMany
    private Set<Address> addresses = new HashSet<>();

    @ManyToMany
    @JsonIgnore                                       //@JsonIgnore: Completely hides a field from Jackson, preventing it from being sent to the client and preventing it from being received/updated by the client's JSON. We dont need the used coupons to check as they are already used.
    private Set<Coupon> usedCoupons = new HashSet<>();
}
