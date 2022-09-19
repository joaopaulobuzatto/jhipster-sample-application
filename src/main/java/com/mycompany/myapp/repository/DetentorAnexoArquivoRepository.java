package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.DetentorAnexoArquivo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the DetentorAnexoArquivo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DetentorAnexoArquivoRepository extends JpaRepository<DetentorAnexoArquivo, Long> {}
