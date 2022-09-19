package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.IpLiberado;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the IpLiberado entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IpLiberadoRepository extends JpaRepository<IpLiberado, Long> {}
