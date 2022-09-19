package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Cor;
import com.mycompany.myapp.repository.CorRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Cor}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CorResource {

    private final Logger log = LoggerFactory.getLogger(CorResource.class);

    private static final String ENTITY_NAME = "cor";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CorRepository corRepository;

    public CorResource(CorRepository corRepository) {
        this.corRepository = corRepository;
    }

    /**
     * {@code POST  /cors} : Create a new cor.
     *
     * @param cor the cor to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cor, or with status {@code 400 (Bad Request)} if the cor has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cors")
    public ResponseEntity<Cor> createCor(@Valid @RequestBody Cor cor) throws URISyntaxException {
        log.debug("REST request to save Cor : {}", cor);
        if (cor.getId() != null) {
            throw new BadRequestAlertException("A new cor cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Cor result = corRepository.save(cor);
        return ResponseEntity
            .created(new URI("/api/cors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cors/:id} : Updates an existing cor.
     *
     * @param id the id of the cor to save.
     * @param cor the cor to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cor,
     * or with status {@code 400 (Bad Request)} if the cor is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cor couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cors/{id}")
    public ResponseEntity<Cor> updateCor(@PathVariable(value = "id", required = false) final Long id, @Valid @RequestBody Cor cor)
        throws URISyntaxException {
        log.debug("REST request to update Cor : {}, {}", id, cor);
        if (cor.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cor.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!corRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Cor result = corRepository.save(cor);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, cor.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /cors/:id} : Partial updates given fields of an existing cor, field will ignore if it is null
     *
     * @param id the id of the cor to save.
     * @param cor the cor to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cor,
     * or with status {@code 400 (Bad Request)} if the cor is not valid,
     * or with status {@code 404 (Not Found)} if the cor is not found,
     * or with status {@code 500 (Internal Server Error)} if the cor couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/cors/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Cor> partialUpdateCor(@PathVariable(value = "id", required = false) final Long id, @NotNull @RequestBody Cor cor)
        throws URISyntaxException {
        log.debug("REST request to partial update Cor partially : {}, {}", id, cor);
        if (cor.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cor.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!corRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Cor> result = corRepository
            .findById(cor.getId())
            .map(existingCor -> {
                if (cor.getDescricao() != null) {
                    existingCor.setDescricao(cor.getDescricao());
                }

                return existingCor;
            })
            .map(corRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, cor.getId().toString())
        );
    }

    /**
     * {@code GET  /cors} : get all the cors.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cors in body.
     */
    @GetMapping("/cors")
    public List<Cor> getAllCors() {
        log.debug("REST request to get all Cors");
        return corRepository.findAll();
    }

    /**
     * {@code GET  /cors/:id} : get the "id" cor.
     *
     * @param id the id of the cor to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cor, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cors/{id}")
    public ResponseEntity<Cor> getCor(@PathVariable Long id) {
        log.debug("REST request to get Cor : {}", id);
        Optional<Cor> cor = corRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cor);
    }

    /**
     * {@code DELETE  /cors/:id} : delete the "id" cor.
     *
     * @param id the id of the cor to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cors/{id}")
    public ResponseEntity<Void> deleteCor(@PathVariable Long id) {
        log.debug("REST request to delete Cor : {}", id);
        corRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
