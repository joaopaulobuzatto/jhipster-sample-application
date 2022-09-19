package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.GrupoPermissoes;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the GrupoPermissoes entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GrupoPermissoesRepository extends JpaRepository<GrupoPermissoes, Long> {}
