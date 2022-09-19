package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Operadora;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Operadora entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OperadoraRepository extends JpaRepository<Operadora, Long> {}
