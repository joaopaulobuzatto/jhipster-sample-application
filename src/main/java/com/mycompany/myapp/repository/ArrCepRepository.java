package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.ArrCep;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the ArrCep entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ArrCepRepository extends JpaRepository<ArrCep, Long> {}
