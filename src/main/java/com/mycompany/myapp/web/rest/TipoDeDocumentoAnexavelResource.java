package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.TipoDeDocumentoAnexavel;
import com.mycompany.myapp.repository.TipoDeDocumentoAnexavelRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.TipoDeDocumentoAnexavel}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TipoDeDocumentoAnexavelResource {

    private final Logger log = LoggerFactory.getLogger(TipoDeDocumentoAnexavelResource.class);

    private static final String ENTITY_NAME = "tipoDeDocumentoAnexavel";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TipoDeDocumentoAnexavelRepository tipoDeDocumentoAnexavelRepository;

    public TipoDeDocumentoAnexavelResource(TipoDeDocumentoAnexavelRepository tipoDeDocumentoAnexavelRepository) {
        this.tipoDeDocumentoAnexavelRepository = tipoDeDocumentoAnexavelRepository;
    }

    /**
     * {@code POST  /tipo-de-documento-anexavels} : Create a new tipoDeDocumentoAnexavel.
     *
     * @param tipoDeDocumentoAnexavel the tipoDeDocumentoAnexavel to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoDeDocumentoAnexavel, or with status {@code 400 (Bad Request)} if the tipoDeDocumentoAnexavel has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tipo-de-documento-anexavels")
    public ResponseEntity<TipoDeDocumentoAnexavel> createTipoDeDocumentoAnexavel(
        @Valid @RequestBody TipoDeDocumentoAnexavel tipoDeDocumentoAnexavel
    ) throws URISyntaxException {
        log.debug("REST request to save TipoDeDocumentoAnexavel : {}", tipoDeDocumentoAnexavel);
        if (tipoDeDocumentoAnexavel.getId() != null) {
            throw new BadRequestAlertException("A new tipoDeDocumentoAnexavel cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoDeDocumentoAnexavel result = tipoDeDocumentoAnexavelRepository.save(tipoDeDocumentoAnexavel);
        return ResponseEntity
            .created(new URI("/api/tipo-de-documento-anexavels/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tipo-de-documento-anexavels/:id} : Updates an existing tipoDeDocumentoAnexavel.
     *
     * @param id the id of the tipoDeDocumentoAnexavel to save.
     * @param tipoDeDocumentoAnexavel the tipoDeDocumentoAnexavel to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoDeDocumentoAnexavel,
     * or with status {@code 400 (Bad Request)} if the tipoDeDocumentoAnexavel is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoDeDocumentoAnexavel couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tipo-de-documento-anexavels/{id}")
    public ResponseEntity<TipoDeDocumentoAnexavel> updateTipoDeDocumentoAnexavel(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody TipoDeDocumentoAnexavel tipoDeDocumentoAnexavel
    ) throws URISyntaxException {
        log.debug("REST request to update TipoDeDocumentoAnexavel : {}, {}", id, tipoDeDocumentoAnexavel);
        if (tipoDeDocumentoAnexavel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tipoDeDocumentoAnexavel.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tipoDeDocumentoAnexavelRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        TipoDeDocumentoAnexavel result = tipoDeDocumentoAnexavelRepository.save(tipoDeDocumentoAnexavel);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, tipoDeDocumentoAnexavel.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /tipo-de-documento-anexavels/:id} : Partial updates given fields of an existing tipoDeDocumentoAnexavel, field will ignore if it is null
     *
     * @param id the id of the tipoDeDocumentoAnexavel to save.
     * @param tipoDeDocumentoAnexavel the tipoDeDocumentoAnexavel to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoDeDocumentoAnexavel,
     * or with status {@code 400 (Bad Request)} if the tipoDeDocumentoAnexavel is not valid,
     * or with status {@code 404 (Not Found)} if the tipoDeDocumentoAnexavel is not found,
     * or with status {@code 500 (Internal Server Error)} if the tipoDeDocumentoAnexavel couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/tipo-de-documento-anexavels/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<TipoDeDocumentoAnexavel> partialUpdateTipoDeDocumentoAnexavel(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody TipoDeDocumentoAnexavel tipoDeDocumentoAnexavel
    ) throws URISyntaxException {
        log.debug("REST request to partial update TipoDeDocumentoAnexavel partially : {}, {}", id, tipoDeDocumentoAnexavel);
        if (tipoDeDocumentoAnexavel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tipoDeDocumentoAnexavel.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tipoDeDocumentoAnexavelRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<TipoDeDocumentoAnexavel> result = tipoDeDocumentoAnexavelRepository
            .findById(tipoDeDocumentoAnexavel.getId())
            .map(existingTipoDeDocumentoAnexavel -> {
                if (tipoDeDocumentoAnexavel.getCodigo() != null) {
                    existingTipoDeDocumentoAnexavel.setCodigo(tipoDeDocumentoAnexavel.getCodigo());
                }
                if (tipoDeDocumentoAnexavel.getDataCriacao() != null) {
                    existingTipoDeDocumentoAnexavel.setDataCriacao(tipoDeDocumentoAnexavel.getDataCriacao());
                }
                if (tipoDeDocumentoAnexavel.getDescricao() != null) {
                    existingTipoDeDocumentoAnexavel.setDescricao(tipoDeDocumentoAnexavel.getDescricao());
                }

                return existingTipoDeDocumentoAnexavel;
            })
            .map(tipoDeDocumentoAnexavelRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, tipoDeDocumentoAnexavel.getId().toString())
        );
    }

    /**
     * {@code GET  /tipo-de-documento-anexavels} : get all the tipoDeDocumentoAnexavels.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoDeDocumentoAnexavels in body.
     */
    @GetMapping("/tipo-de-documento-anexavels")
    public List<TipoDeDocumentoAnexavel> getAllTipoDeDocumentoAnexavels() {
        log.debug("REST request to get all TipoDeDocumentoAnexavels");
        return tipoDeDocumentoAnexavelRepository.findAll();
    }

    /**
     * {@code GET  /tipo-de-documento-anexavels/:id} : get the "id" tipoDeDocumentoAnexavel.
     *
     * @param id the id of the tipoDeDocumentoAnexavel to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoDeDocumentoAnexavel, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tipo-de-documento-anexavels/{id}")
    public ResponseEntity<TipoDeDocumentoAnexavel> getTipoDeDocumentoAnexavel(@PathVariable Long id) {
        log.debug("REST request to get TipoDeDocumentoAnexavel : {}", id);
        Optional<TipoDeDocumentoAnexavel> tipoDeDocumentoAnexavel = tipoDeDocumentoAnexavelRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tipoDeDocumentoAnexavel);
    }

    /**
     * {@code DELETE  /tipo-de-documento-anexavels/:id} : delete the "id" tipoDeDocumentoAnexavel.
     *
     * @param id the id of the tipoDeDocumentoAnexavel to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tipo-de-documento-anexavels/{id}")
    public ResponseEntity<Void> deleteTipoDeDocumentoAnexavel(@PathVariable Long id) {
        log.debug("REST request to delete TipoDeDocumentoAnexavel : {}", id);
        tipoDeDocumentoAnexavelRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
