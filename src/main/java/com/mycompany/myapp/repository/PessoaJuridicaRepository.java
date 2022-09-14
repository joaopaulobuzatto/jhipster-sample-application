package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.PessoaJuridica;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the PessoaJuridica entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PessoaJuridicaRepository extends JpaRepository<PessoaJuridica, Long> {}
