package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.HorarioTrabalho;
import com.mycompany.myapp.repository.HorarioTrabalhoRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.HorarioTrabalho}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class HorarioTrabalhoResource {

    private final Logger log = LoggerFactory.getLogger(HorarioTrabalhoResource.class);

    private static final String ENTITY_NAME = "horarioTrabalho";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final HorarioTrabalhoRepository horarioTrabalhoRepository;

    public HorarioTrabalhoResource(HorarioTrabalhoRepository horarioTrabalhoRepository) {
        this.horarioTrabalhoRepository = horarioTrabalhoRepository;
    }

    /**
     * {@code POST  /horario-trabalhos} : Create a new horarioTrabalho.
     *
     * @param horarioTrabalho the horarioTrabalho to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new horarioTrabalho, or with status {@code 400 (Bad Request)} if the horarioTrabalho has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/horario-trabalhos")
    public ResponseEntity<HorarioTrabalho> createHorarioTrabalho(@Valid @RequestBody HorarioTrabalho horarioTrabalho)
        throws URISyntaxException {
        log.debug("REST request to save HorarioTrabalho : {}", horarioTrabalho);
        if (horarioTrabalho.getId() != null) {
            throw new BadRequestAlertException("A new horarioTrabalho cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HorarioTrabalho result = horarioTrabalhoRepository.save(horarioTrabalho);
        return ResponseEntity
            .created(new URI("/api/horario-trabalhos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /horario-trabalhos/:id} : Updates an existing horarioTrabalho.
     *
     * @param id the id of the horarioTrabalho to save.
     * @param horarioTrabalho the horarioTrabalho to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated horarioTrabalho,
     * or with status {@code 400 (Bad Request)} if the horarioTrabalho is not valid,
     * or with status {@code 500 (Internal Server Error)} if the horarioTrabalho couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/horario-trabalhos/{id}")
    public ResponseEntity<HorarioTrabalho> updateHorarioTrabalho(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody HorarioTrabalho horarioTrabalho
    ) throws URISyntaxException {
        log.debug("REST request to update HorarioTrabalho : {}, {}", id, horarioTrabalho);
        if (horarioTrabalho.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, horarioTrabalho.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!horarioTrabalhoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        HorarioTrabalho result = horarioTrabalhoRepository.save(horarioTrabalho);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, horarioTrabalho.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /horario-trabalhos/:id} : Partial updates given fields of an existing horarioTrabalho, field will ignore if it is null
     *
     * @param id the id of the horarioTrabalho to save.
     * @param horarioTrabalho the horarioTrabalho to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated horarioTrabalho,
     * or with status {@code 400 (Bad Request)} if the horarioTrabalho is not valid,
     * or with status {@code 404 (Not Found)} if the horarioTrabalho is not found,
     * or with status {@code 500 (Internal Server Error)} if the horarioTrabalho couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/horario-trabalhos/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<HorarioTrabalho> partialUpdateHorarioTrabalho(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody HorarioTrabalho horarioTrabalho
    ) throws URISyntaxException {
        log.debug("REST request to partial update HorarioTrabalho partially : {}, {}", id, horarioTrabalho);
        if (horarioTrabalho.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, horarioTrabalho.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!horarioTrabalhoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<HorarioTrabalho> result = horarioTrabalhoRepository
            .findById(horarioTrabalho.getId())
            .map(existingHorarioTrabalho -> {
                if (horarioTrabalho.getCodigo() != null) {
                    existingHorarioTrabalho.setCodigo(horarioTrabalho.getCodigo());
                }
                if (horarioTrabalho.getDataCriacao() != null) {
                    existingHorarioTrabalho.setDataCriacao(horarioTrabalho.getDataCriacao());
                }
                if (horarioTrabalho.getDescricao() != null) {
                    existingHorarioTrabalho.setDescricao(horarioTrabalho.getDescricao());
                }

                return existingHorarioTrabalho;
            })
            .map(horarioTrabalhoRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, horarioTrabalho.getId().toString())
        );
    }

    /**
     * {@code GET  /horario-trabalhos} : get all the horarioTrabalhos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of horarioTrabalhos in body.
     */
    @GetMapping("/horario-trabalhos")
    public List<HorarioTrabalho> getAllHorarioTrabalhos() {
        log.debug("REST request to get all HorarioTrabalhos");
        return horarioTrabalhoRepository.findAll();
    }

    /**
     * {@code GET  /horario-trabalhos/:id} : get the "id" horarioTrabalho.
     *
     * @param id the id of the horarioTrabalho to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the horarioTrabalho, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/horario-trabalhos/{id}")
    public ResponseEntity<HorarioTrabalho> getHorarioTrabalho(@PathVariable Long id) {
        log.debug("REST request to get HorarioTrabalho : {}", id);
        Optional<HorarioTrabalho> horarioTrabalho = horarioTrabalhoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(horarioTrabalho);
    }

    /**
     * {@code DELETE  /horario-trabalhos/:id} : delete the "id" horarioTrabalho.
     *
     * @param id the id of the horarioTrabalho to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/horario-trabalhos/{id}")
    public ResponseEntity<Void> deleteHorarioTrabalho(@PathVariable Long id) {
        log.debug("REST request to delete HorarioTrabalho : {}", id);
        horarioTrabalhoRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
