package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Filial;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Filial entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FilialRepository extends JpaRepository<Filial, Long> {}
