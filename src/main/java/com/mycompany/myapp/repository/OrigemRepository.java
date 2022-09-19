package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Origem;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Origem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrigemRepository extends JpaRepository<Origem, Long> {}
