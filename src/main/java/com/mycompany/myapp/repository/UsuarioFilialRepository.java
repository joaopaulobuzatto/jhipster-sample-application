package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.UsuarioFilial;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the UsuarioFilial entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UsuarioFilialRepository extends JpaRepository<UsuarioFilial, Long> {}
