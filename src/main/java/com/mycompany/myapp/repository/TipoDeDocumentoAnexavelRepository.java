package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.TipoDeDocumentoAnexavel;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the TipoDeDocumentoAnexavel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoDeDocumentoAnexavelRepository extends JpaRepository<TipoDeDocumentoAnexavel, Long> {}
