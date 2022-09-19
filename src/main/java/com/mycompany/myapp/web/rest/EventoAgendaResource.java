package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.EventoAgenda;
import com.mycompany.myapp.repository.EventoAgendaRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.EventoAgenda}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EventoAgendaResource {

    private final Logger log = LoggerFactory.getLogger(EventoAgendaResource.class);

    private static final String ENTITY_NAME = "eventoAgenda";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EventoAgendaRepository eventoAgendaRepository;

    public EventoAgendaResource(EventoAgendaRepository eventoAgendaRepository) {
        this.eventoAgendaRepository = eventoAgendaRepository;
    }

    /**
     * {@code POST  /evento-agenda} : Create a new eventoAgenda.
     *
     * @param eventoAgenda the eventoAgenda to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new eventoAgenda, or with status {@code 400 (Bad Request)} if the eventoAgenda has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/evento-agenda")
    public ResponseEntity<EventoAgenda> createEventoAgenda(@Valid @RequestBody EventoAgenda eventoAgenda) throws URISyntaxException {
        log.debug("REST request to save EventoAgenda : {}", eventoAgenda);
        if (eventoAgenda.getId() != null) {
            throw new BadRequestAlertException("A new eventoAgenda cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EventoAgenda result = eventoAgendaRepository.save(eventoAgenda);
        return ResponseEntity
            .created(new URI("/api/evento-agenda/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /evento-agenda/:id} : Updates an existing eventoAgenda.
     *
     * @param id the id of the eventoAgenda to save.
     * @param eventoAgenda the eventoAgenda to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated eventoAgenda,
     * or with status {@code 400 (Bad Request)} if the eventoAgenda is not valid,
     * or with status {@code 500 (Internal Server Error)} if the eventoAgenda couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/evento-agenda/{id}")
    public ResponseEntity<EventoAgenda> updateEventoAgenda(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody EventoAgenda eventoAgenda
    ) throws URISyntaxException {
        log.debug("REST request to update EventoAgenda : {}, {}", id, eventoAgenda);
        if (eventoAgenda.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, eventoAgenda.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!eventoAgendaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        EventoAgenda result = eventoAgendaRepository.save(eventoAgenda);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, eventoAgenda.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /evento-agenda/:id} : Partial updates given fields of an existing eventoAgenda, field will ignore if it is null
     *
     * @param id the id of the eventoAgenda to save.
     * @param eventoAgenda the eventoAgenda to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated eventoAgenda,
     * or with status {@code 400 (Bad Request)} if the eventoAgenda is not valid,
     * or with status {@code 404 (Not Found)} if the eventoAgenda is not found,
     * or with status {@code 500 (Internal Server Error)} if the eventoAgenda couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/evento-agenda/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<EventoAgenda> partialUpdateEventoAgenda(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody EventoAgenda eventoAgenda
    ) throws URISyntaxException {
        log.debug("REST request to partial update EventoAgenda partially : {}, {}", id, eventoAgenda);
        if (eventoAgenda.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, eventoAgenda.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!eventoAgendaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<EventoAgenda> result = eventoAgendaRepository
            .findById(eventoAgenda.getId())
            .map(existingEventoAgenda -> {
                if (eventoAgenda.getDataCriacao() != null) {
                    existingEventoAgenda.setDataCriacao(eventoAgenda.getDataCriacao());
                }
                if (eventoAgenda.getData() != null) {
                    existingEventoAgenda.setData(eventoAgenda.getData());
                }
                if (eventoAgenda.getDescricao() != null) {
                    existingEventoAgenda.setDescricao(eventoAgenda.getDescricao());
                }

                return existingEventoAgenda;
            })
            .map(eventoAgendaRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, eventoAgenda.getId().toString())
        );
    }

    /**
     * {@code GET  /evento-agenda} : get all the eventoAgenda.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of eventoAgenda in body.
     */
    @GetMapping("/evento-agenda")
    public List<EventoAgenda> getAllEventoAgenda() {
        log.debug("REST request to get all EventoAgenda");
        return eventoAgendaRepository.findAll();
    }

    /**
     * {@code GET  /evento-agenda/:id} : get the "id" eventoAgenda.
     *
     * @param id the id of the eventoAgenda to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the eventoAgenda, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/evento-agenda/{id}")
    public ResponseEntity<EventoAgenda> getEventoAgenda(@PathVariable Long id) {
        log.debug("REST request to get EventoAgenda : {}", id);
        Optional<EventoAgenda> eventoAgenda = eventoAgendaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(eventoAgenda);
    }

    /**
     * {@code DELETE  /evento-agenda/:id} : delete the "id" eventoAgenda.
     *
     * @param id the id of the eventoAgenda to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/evento-agenda/{id}")
    public ResponseEntity<Void> deleteEventoAgenda(@PathVariable Long id) {
        log.debug("REST request to delete EventoAgenda : {}", id);
        eventoAgendaRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
