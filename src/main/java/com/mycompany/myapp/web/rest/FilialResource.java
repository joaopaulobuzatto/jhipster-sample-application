package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Filial;
import com.mycompany.myapp.repository.FilialRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Filial}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class FilialResource {

    private final Logger log = LoggerFactory.getLogger(FilialResource.class);

    private static final String ENTITY_NAME = "filial";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FilialRepository filialRepository;

    public FilialResource(FilialRepository filialRepository) {
        this.filialRepository = filialRepository;
    }

    /**
     * {@code POST  /filials} : Create a new filial.
     *
     * @param filial the filial to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new filial, or with status {@code 400 (Bad Request)} if the filial has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/filials")
    public ResponseEntity<Filial> createFilial(@RequestBody Filial filial) throws URISyntaxException {
        log.debug("REST request to save Filial : {}", filial);
        if (filial.getId() != null) {
            throw new BadRequestAlertException("A new filial cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Filial result = filialRepository.save(filial);
        return ResponseEntity
            .created(new URI("/api/filials/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /filials/:id} : Updates an existing filial.
     *
     * @param id the id of the filial to save.
     * @param filial the filial to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated filial,
     * or with status {@code 400 (Bad Request)} if the filial is not valid,
     * or with status {@code 500 (Internal Server Error)} if the filial couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/filials/{id}")
    public ResponseEntity<Filial> updateFilial(@PathVariable(value = "id", required = false) final Long id, @RequestBody Filial filial)
        throws URISyntaxException {
        log.debug("REST request to update Filial : {}, {}", id, filial);
        if (filial.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, filial.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!filialRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Filial result = filialRepository.save(filial);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, filial.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /filials/:id} : Partial updates given fields of an existing filial, field will ignore if it is null
     *
     * @param id the id of the filial to save.
     * @param filial the filial to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated filial,
     * or with status {@code 400 (Bad Request)} if the filial is not valid,
     * or with status {@code 404 (Not Found)} if the filial is not found,
     * or with status {@code 500 (Internal Server Error)} if the filial couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/filials/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Filial> partialUpdateFilial(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Filial filial
    ) throws URISyntaxException {
        log.debug("REST request to partial update Filial partially : {}, {}", id, filial);
        if (filial.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, filial.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!filialRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Filial> result = filialRepository
            .findById(filial.getId())
            .map(existingFilial -> {
                if (filial.getDataCriacao() != null) {
                    existingFilial.setDataCriacao(filial.getDataCriacao());
                }

                return existingFilial;
            })
            .map(filialRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, filial.getId().toString())
        );
    }

    /**
     * {@code GET  /filials} : get all the filials.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of filials in body.
     */
    @GetMapping("/filials")
    public List<Filial> getAllFilials() {
        log.debug("REST request to get all Filials");
        return filialRepository.findAll();
    }

    /**
     * {@code GET  /filials/:id} : get the "id" filial.
     *
     * @param id the id of the filial to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the filial, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/filials/{id}")
    public ResponseEntity<Filial> getFilial(@PathVariable Long id) {
        log.debug("REST request to get Filial : {}", id);
        Optional<Filial> filial = filialRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(filial);
    }

    /**
     * {@code DELETE  /filials/:id} : delete the "id" filial.
     *
     * @param id the id of the filial to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/filials/{id}")
    public ResponseEntity<Void> deleteFilial(@PathVariable Long id) {
        log.debug("REST request to delete Filial : {}", id);
        filialRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
