package org.projects.market.repository;

import org.projects.market.model.Deal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DealRepository extends JpaRepository<Deal,Long> {

}
