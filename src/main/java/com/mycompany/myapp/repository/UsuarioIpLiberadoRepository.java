package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.UsuarioIpLiberado;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the UsuarioIpLiberado entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UsuarioIpLiberadoRepository extends JpaRepository<UsuarioIpLiberado, Long> {}
