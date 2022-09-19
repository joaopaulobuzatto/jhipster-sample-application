package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Feriado;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Feriado entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FeriadoRepository extends JpaRepository<Feriado, Long> {}
