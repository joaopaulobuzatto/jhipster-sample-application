package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.EventoAgenda;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the EventoAgenda entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EventoAgendaRepository extends JpaRepository<EventoAgenda, Long> {}
