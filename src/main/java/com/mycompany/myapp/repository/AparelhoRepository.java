package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Aparelho;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Aparelho entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AparelhoRepository extends JpaRepository<Aparelho, Long> {}
