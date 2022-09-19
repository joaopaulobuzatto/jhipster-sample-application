package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Feriado;
import com.mycompany.myapp.repository.FeriadoRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Feriado}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class FeriadoResource {

    private final Logger log = LoggerFactory.getLogger(FeriadoResource.class);

    private static final String ENTITY_NAME = "feriado";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FeriadoRepository feriadoRepository;

    public FeriadoResource(FeriadoRepository feriadoRepository) {
        this.feriadoRepository = feriadoRepository;
    }

    /**
     * {@code POST  /feriados} : Create a new feriado.
     *
     * @param feriado the feriado to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new feriado, or with status {@code 400 (Bad Request)} if the feriado has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/feriados")
    public ResponseEntity<Feriado> createFeriado(@Valid @RequestBody Feriado feriado) throws URISyntaxException {
        log.debug("REST request to save Feriado : {}", feriado);
        if (feriado.getId() != null) {
            throw new BadRequestAlertException("A new feriado cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Feriado result = feriadoRepository.save(feriado);
        return ResponseEntity
            .created(new URI("/api/feriados/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /feriados/:id} : Updates an existing feriado.
     *
     * @param id the id of the feriado to save.
     * @param feriado the feriado to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated feriado,
     * or with status {@code 400 (Bad Request)} if the feriado is not valid,
     * or with status {@code 500 (Internal Server Error)} if the feriado couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/feriados/{id}")
    public ResponseEntity<Feriado> updateFeriado(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Feriado feriado
    ) throws URISyntaxException {
        log.debug("REST request to update Feriado : {}, {}", id, feriado);
        if (feriado.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, feriado.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!feriadoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Feriado result = feriadoRepository.save(feriado);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, feriado.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /feriados/:id} : Partial updates given fields of an existing feriado, field will ignore if it is null
     *
     * @param id the id of the feriado to save.
     * @param feriado the feriado to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated feriado,
     * or with status {@code 400 (Bad Request)} if the feriado is not valid,
     * or with status {@code 404 (Not Found)} if the feriado is not found,
     * or with status {@code 500 (Internal Server Error)} if the feriado couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/feriados/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Feriado> partialUpdateFeriado(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Feriado feriado
    ) throws URISyntaxException {
        log.debug("REST request to partial update Feriado partially : {}, {}", id, feriado);
        if (feriado.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, feriado.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!feriadoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Feriado> result = feriadoRepository
            .findById(feriado.getId())
            .map(existingFeriado -> {
                if (feriado.getCodigo() != null) {
                    existingFeriado.setCodigo(feriado.getCodigo());
                }
                if (feriado.getDataCriacao() != null) {
                    existingFeriado.setDataCriacao(feriado.getDataCriacao());
                }
                if (feriado.getData() != null) {
                    existingFeriado.setData(feriado.getData());
                }
                if (feriado.getNome() != null) {
                    existingFeriado.setNome(feriado.getNome());
                }

                return existingFeriado;
            })
            .map(feriadoRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, feriado.getId().toString())
        );
    }

    /**
     * {@code GET  /feriados} : get all the feriados.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of feriados in body.
     */
    @GetMapping("/feriados")
    public List<Feriado> getAllFeriados() {
        log.debug("REST request to get all Feriados");
        return feriadoRepository.findAll();
    }

    /**
     * {@code GET  /feriados/:id} : get the "id" feriado.
     *
     * @param id the id of the feriado to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the feriado, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/feriados/{id}")
    public ResponseEntity<Feriado> getFeriado(@PathVariable Long id) {
        log.debug("REST request to get Feriado : {}", id);
        Optional<Feriado> feriado = feriadoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(feriado);
    }

    /**
     * {@code DELETE  /feriados/:id} : delete the "id" feriado.
     *
     * @param id the id of the feriado to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/feriados/{id}")
    public ResponseEntity<Void> deleteFeriado(@PathVariable Long id) {
        log.debug("REST request to delete Feriado : {}", id);
        feriadoRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
