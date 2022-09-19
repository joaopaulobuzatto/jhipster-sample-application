package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.HorarioTrabalho;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the HorarioTrabalho entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HorarioTrabalhoRepository extends JpaRepository<HorarioTrabalho, Long> {}
