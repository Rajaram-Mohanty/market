package org.projects.market.repository;

import org.projects.market.model.Deal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DealRepository extends JpaRepository<Deal, Long> {

    @Override
    @Query("SELECT d FROM Deal d LEFT JOIN FETCH d.category")
    List<Deal> findAll();

    @Override
    @Query("SELECT d FROM Deal d LEFT JOIN FETCH d.category WHERE d.id = :id")
    java.util.Optional<Deal> findById(@org.springframework.data.repository.query.Param("id") Long id);
}
