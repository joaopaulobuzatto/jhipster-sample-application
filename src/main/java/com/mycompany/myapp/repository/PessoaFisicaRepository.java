package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.PessoaFisica;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the PessoaFisica entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PessoaFisicaRepository extends JpaRepository<PessoaFisica, Long> {}
