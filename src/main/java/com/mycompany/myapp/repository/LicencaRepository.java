package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Licenca;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Licenca entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LicencaRepository extends JpaRepository<Licenca, Long> {}
