package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.AnexoArquivo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the AnexoArquivo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AnexoArquivoRepository extends JpaRepository<AnexoArquivo, Long> {}
