package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.UsuarioGrupoPermissoes;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the UsuarioGrupoPermissoes entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UsuarioGrupoPermissoesRepository extends JpaRepository<UsuarioGrupoPermissoes, Long> {}
