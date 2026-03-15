package org.projects.market.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.projects.market.domain.USER_ROLE;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY) // @JsonProperty(access = Access.WRITE_ONLY): Creates a
                                                           // one-way door that allows the backend to receive sensitive
                                                           // data (like passwords) from the client while ensuring it is
                                                           // never sent back in the response.
    private String password;

    private String email;

    private String fullName;

    private String mobile;

    private USER_ROLE role = USER_ROLE.ROLE_COSTUMER;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<Address> addresses = new HashSet<>();

    @ManyToMany
    @JsonIgnore // @JsonIgnore: Completely hides a field from Jackson, preventing it from being
                // sent to the client and preventing it from being received/updated by the
                // client's JSON. We dont need the used coupons to check as they are already
                // used.
    private Set<Coupon> usedCoupons = new HashSet<>();
}
