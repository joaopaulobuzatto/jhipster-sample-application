package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Cor;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Cor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CorRepository extends JpaRepository<Cor, Long> {}
