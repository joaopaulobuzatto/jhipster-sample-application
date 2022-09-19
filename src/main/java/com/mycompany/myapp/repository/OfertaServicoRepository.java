package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.OfertaServico;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the OfertaServico entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OfertaServicoRepository extends JpaRepository<OfertaServico, Long> {}
