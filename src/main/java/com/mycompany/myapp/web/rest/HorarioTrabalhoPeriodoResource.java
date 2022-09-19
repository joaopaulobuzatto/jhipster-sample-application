package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.HorarioTrabalhoPeriodo;
import com.mycompany.myapp.repository.HorarioTrabalhoPeriodoRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.HorarioTrabalhoPeriodo}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class HorarioTrabalhoPeriodoResource {

    private final Logger log = LoggerFactory.getLogger(HorarioTrabalhoPeriodoResource.class);

    private static final String ENTITY_NAME = "horarioTrabalhoPeriodo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final HorarioTrabalhoPeriodoRepository horarioTrabalhoPeriodoRepository;

    public HorarioTrabalhoPeriodoResource(HorarioTrabalhoPeriodoRepository horarioTrabalhoPeriodoRepository) {
        this.horarioTrabalhoPeriodoRepository = horarioTrabalhoPeriodoRepository;
    }

    /**
     * {@code POST  /horario-trabalho-periodos} : Create a new horarioTrabalhoPeriodo.
     *
     * @param horarioTrabalhoPeriodo the horarioTrabalhoPeriodo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new horarioTrabalhoPeriodo, or with status {@code 400 (Bad Request)} if the horarioTrabalhoPeriodo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/horario-trabalho-periodos")
    public ResponseEntity<HorarioTrabalhoPeriodo> createHorarioTrabalhoPeriodo(
        @Valid @RequestBody HorarioTrabalhoPeriodo horarioTrabalhoPeriodo
    ) throws URISyntaxException {
        log.debug("REST request to save HorarioTrabalhoPeriodo : {}", horarioTrabalhoPeriodo);
        if (horarioTrabalhoPeriodo.getId() != null) {
            throw new BadRequestAlertException("A new horarioTrabalhoPeriodo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HorarioTrabalhoPeriodo result = horarioTrabalhoPeriodoRepository.save(horarioTrabalhoPeriodo);
        return ResponseEntity
            .created(new URI("/api/horario-trabalho-periodos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /horario-trabalho-periodos/:id} : Updates an existing horarioTrabalhoPeriodo.
     *
     * @param id the id of the horarioTrabalhoPeriodo to save.
     * @param horarioTrabalhoPeriodo the horarioTrabalhoPeriodo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated horarioTrabalhoPeriodo,
     * or with status {@code 400 (Bad Request)} if the horarioTrabalhoPeriodo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the horarioTrabalhoPeriodo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/horario-trabalho-periodos/{id}")
    public ResponseEntity<HorarioTrabalhoPeriodo> updateHorarioTrabalhoPeriodo(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody HorarioTrabalhoPeriodo horarioTrabalhoPeriodo
    ) throws URISyntaxException {
        log.debug("REST request to update HorarioTrabalhoPeriodo : {}, {}", id, horarioTrabalhoPeriodo);
        if (horarioTrabalhoPeriodo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, horarioTrabalhoPeriodo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!horarioTrabalhoPeriodoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        HorarioTrabalhoPeriodo result = horarioTrabalhoPeriodoRepository.save(horarioTrabalhoPeriodo);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, horarioTrabalhoPeriodo.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /horario-trabalho-periodos/:id} : Partial updates given fields of an existing horarioTrabalhoPeriodo, field will ignore if it is null
     *
     * @param id the id of the horarioTrabalhoPeriodo to save.
     * @param horarioTrabalhoPeriodo the horarioTrabalhoPeriodo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated horarioTrabalhoPeriodo,
     * or with status {@code 400 (Bad Request)} if the horarioTrabalhoPeriodo is not valid,
     * or with status {@code 404 (Not Found)} if the horarioTrabalhoPeriodo is not found,
     * or with status {@code 500 (Internal Server Error)} if the horarioTrabalhoPeriodo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/horario-trabalho-periodos/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<HorarioTrabalhoPeriodo> partialUpdateHorarioTrabalhoPeriodo(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody HorarioTrabalhoPeriodo horarioTrabalhoPeriodo
    ) throws URISyntaxException {
        log.debug("REST request to partial update HorarioTrabalhoPeriodo partially : {}, {}", id, horarioTrabalhoPeriodo);
        if (horarioTrabalhoPeriodo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, horarioTrabalhoPeriodo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!horarioTrabalhoPeriodoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<HorarioTrabalhoPeriodo> result = horarioTrabalhoPeriodoRepository
            .findById(horarioTrabalhoPeriodo.getId())
            .map(existingHorarioTrabalhoPeriodo -> {
                if (horarioTrabalhoPeriodo.getDataCriacao() != null) {
                    existingHorarioTrabalhoPeriodo.setDataCriacao(horarioTrabalhoPeriodo.getDataCriacao());
                }
                if (horarioTrabalhoPeriodo.getDiaDaSemana() != null) {
                    existingHorarioTrabalhoPeriodo.setDiaDaSemana(horarioTrabalhoPeriodo.getDiaDaSemana());
                }
                if (horarioTrabalhoPeriodo.getPeriodo1Inicio() != null) {
                    existingHorarioTrabalhoPeriodo.setPeriodo1Inicio(horarioTrabalhoPeriodo.getPeriodo1Inicio());
                }
                if (horarioTrabalhoPeriodo.getPeriodo1Fim() != null) {
                    existingHorarioTrabalhoPeriodo.setPeriodo1Fim(horarioTrabalhoPeriodo.getPeriodo1Fim());
                }
                if (horarioTrabalhoPeriodo.getPeriodo2Inicio() != null) {
                    existingHorarioTrabalhoPeriodo.setPeriodo2Inicio(horarioTrabalhoPeriodo.getPeriodo2Inicio());
                }
                if (horarioTrabalhoPeriodo.getPeriodo2Fim() != null) {
                    existingHorarioTrabalhoPeriodo.setPeriodo2Fim(horarioTrabalhoPeriodo.getPeriodo2Fim());
                }
                if (horarioTrabalhoPeriodo.getPeriodo3Inicio() != null) {
                    existingHorarioTrabalhoPeriodo.setPeriodo3Inicio(horarioTrabalhoPeriodo.getPeriodo3Inicio());
                }
                if (horarioTrabalhoPeriodo.getPeriodo3Fim() != null) {
                    existingHorarioTrabalhoPeriodo.setPeriodo3Fim(horarioTrabalhoPeriodo.getPeriodo3Fim());
                }
                if (horarioTrabalhoPeriodo.getPeriodo4Inicio() != null) {
                    existingHorarioTrabalhoPeriodo.setPeriodo4Inicio(horarioTrabalhoPeriodo.getPeriodo4Inicio());
                }
                if (horarioTrabalhoPeriodo.getPeriodo4Fim() != null) {
                    existingHorarioTrabalhoPeriodo.setPeriodo4Fim(horarioTrabalhoPeriodo.getPeriodo4Fim());
                }

                return existingHorarioTrabalhoPeriodo;
            })
            .map(horarioTrabalhoPeriodoRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, horarioTrabalhoPeriodo.getId().toString())
        );
    }

    /**
     * {@code GET  /horario-trabalho-periodos} : get all the horarioTrabalhoPeriodos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of horarioTrabalhoPeriodos in body.
     */
    @GetMapping("/horario-trabalho-periodos")
    public List<HorarioTrabalhoPeriodo> getAllHorarioTrabalhoPeriodos() {
        log.debug("REST request to get all HorarioTrabalhoPeriodos");
        return horarioTrabalhoPeriodoRepository.findAll();
    }

    /**
     * {@code GET  /horario-trabalho-periodos/:id} : get the "id" horarioTrabalhoPeriodo.
     *
     * @param id the id of the horarioTrabalhoPeriodo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the horarioTrabalhoPeriodo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/horario-trabalho-periodos/{id}")
    public ResponseEntity<HorarioTrabalhoPeriodo> getHorarioTrabalhoPeriodo(@PathVariable Long id) {
        log.debug("REST request to get HorarioTrabalhoPeriodo : {}", id);
        Optional<HorarioTrabalhoPeriodo> horarioTrabalhoPeriodo = horarioTrabalhoPeriodoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(horarioTrabalhoPeriodo);
    }

    /**
     * {@code DELETE  /horario-trabalho-periodos/:id} : delete the "id" horarioTrabalhoPeriodo.
     *
     * @param id the id of the horarioTrabalhoPeriodo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/horario-trabalho-periodos/{id}")
    public ResponseEntity<Void> deleteHorarioTrabalhoPeriodo(@PathVariable Long id) {
        log.debug("REST request to delete HorarioTrabalhoPeriodo : {}", id);
        horarioTrabalhoPeriodoRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
