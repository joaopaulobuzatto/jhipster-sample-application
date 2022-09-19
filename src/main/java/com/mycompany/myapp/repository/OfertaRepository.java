package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Oferta;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Oferta entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OfertaRepository extends JpaRepository<Oferta, Long> {}
