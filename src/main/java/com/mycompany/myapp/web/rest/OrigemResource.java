package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Origem;
import com.mycompany.myapp.repository.OrigemRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Origem}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class OrigemResource {

    private final Logger log = LoggerFactory.getLogger(OrigemResource.class);

    private static final String ENTITY_NAME = "origem";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OrigemRepository origemRepository;

    public OrigemResource(OrigemRepository origemRepository) {
        this.origemRepository = origemRepository;
    }

    /**
     * {@code POST  /origems} : Create a new origem.
     *
     * @param origem the origem to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new origem, or with status {@code 400 (Bad Request)} if the origem has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/origems")
    public ResponseEntity<Origem> createOrigem(@Valid @RequestBody Origem origem) throws URISyntaxException {
        log.debug("REST request to save Origem : {}", origem);
        if (origem.getId() != null) {
            throw new BadRequestAlertException("A new origem cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Origem result = origemRepository.save(origem);
        return ResponseEntity
            .created(new URI("/api/origems/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /origems/:id} : Updates an existing origem.
     *
     * @param id the id of the origem to save.
     * @param origem the origem to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated origem,
     * or with status {@code 400 (Bad Request)} if the origem is not valid,
     * or with status {@code 500 (Internal Server Error)} if the origem couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/origems/{id}")
    public ResponseEntity<Origem> updateOrigem(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Origem origem
    ) throws URISyntaxException {
        log.debug("REST request to update Origem : {}, {}", id, origem);
        if (origem.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, origem.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!origemRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Origem result = origemRepository.save(origem);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, origem.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /origems/:id} : Partial updates given fields of an existing origem, field will ignore if it is null
     *
     * @param id the id of the origem to save.
     * @param origem the origem to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated origem,
     * or with status {@code 400 (Bad Request)} if the origem is not valid,
     * or with status {@code 404 (Not Found)} if the origem is not found,
     * or with status {@code 500 (Internal Server Error)} if the origem couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/origems/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Origem> partialUpdateOrigem(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Origem origem
    ) throws URISyntaxException {
        log.debug("REST request to partial update Origem partially : {}, {}", id, origem);
        if (origem.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, origem.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!origemRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Origem> result = origemRepository
            .findById(origem.getId())
            .map(existingOrigem -> {
                if (origem.getCodigo() != null) {
                    existingOrigem.setCodigo(origem.getCodigo());
                }
                if (origem.getDataCriacao() != null) {
                    existingOrigem.setDataCriacao(origem.getDataCriacao());
                }
                if (origem.getDescricao() != null) {
                    existingOrigem.setDescricao(origem.getDescricao());
                }
                if (origem.getTipo() != null) {
                    existingOrigem.setTipo(origem.getTipo());
                }

                return existingOrigem;
            })
            .map(origemRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, origem.getId().toString())
        );
    }

    /**
     * {@code GET  /origems} : get all the origems.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of origems in body.
     */
    @GetMapping("/origems")
    public List<Origem> getAllOrigems() {
        log.debug("REST request to get all Origems");
        return origemRepository.findAll();
    }

    /**
     * {@code GET  /origems/:id} : get the "id" origem.
     *
     * @param id the id of the origem to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the origem, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/origems/{id}")
    public ResponseEntity<Origem> getOrigem(@PathVariable Long id) {
        log.debug("REST request to get Origem : {}", id);
        Optional<Origem> origem = origemRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(origem);
    }

    /**
     * {@code DELETE  /origems/:id} : delete the "id" origem.
     *
     * @param id the id of the origem to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/origems/{id}")
    public ResponseEntity<Void> deleteOrigem(@PathVariable Long id) {
        log.debug("REST request to delete Origem : {}", id);
        origemRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
