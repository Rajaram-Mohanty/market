package org.projects.market.repository;

import org.projects.market.model.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User,Long> {

    @EntityGraph(attributePaths = "addresses")
    User findByEmail(String email);
}
