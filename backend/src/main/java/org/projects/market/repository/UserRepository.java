package org.projects.market.repository;

import org.projects.market.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface UserRepository extends JpaRepository<User,Long> {

    @Query("SELECT u FROM User u LEFT JOIN FETCH u.addresses WHERE u.email = :email")
    User findByEmail(@Param("email") String email);
}
