package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.ArrCep;
import com.mycompany.myapp.repository.ArrCepRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.ArrCep}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ArrCepResource {

    private final Logger log = LoggerFactory.getLogger(ArrCepResource.class);

    private static final String ENTITY_NAME = "arrCep";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ArrCepRepository arrCepRepository;

    public ArrCepResource(ArrCepRepository arrCepRepository) {
        this.arrCepRepository = arrCepRepository;
    }

    /**
     * {@code POST  /arr-ceps} : Create a new arrCep.
     *
     * @param arrCep the arrCep to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new arrCep, or with status {@code 400 (Bad Request)} if the arrCep has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/arr-ceps")
    public ResponseEntity<ArrCep> createArrCep(@Valid @RequestBody ArrCep arrCep) throws URISyntaxException {
        log.debug("REST request to save ArrCep : {}", arrCep);
        if (arrCep.getId() != null) {
            throw new BadRequestAlertException("A new arrCep cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ArrCep result = arrCepRepository.save(arrCep);
        return ResponseEntity
            .created(new URI("/api/arr-ceps/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /arr-ceps/:id} : Updates an existing arrCep.
     *
     * @param id the id of the arrCep to save.
     * @param arrCep the arrCep to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated arrCep,
     * or with status {@code 400 (Bad Request)} if the arrCep is not valid,
     * or with status {@code 500 (Internal Server Error)} if the arrCep couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/arr-ceps/{id}")
    public ResponseEntity<ArrCep> updateArrCep(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody ArrCep arrCep
    ) throws URISyntaxException {
        log.debug("REST request to update ArrCep : {}, {}", id, arrCep);
        if (arrCep.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, arrCep.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!arrCepRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ArrCep result = arrCepRepository.save(arrCep);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, arrCep.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /arr-ceps/:id} : Partial updates given fields of an existing arrCep, field will ignore if it is null
     *
     * @param id the id of the arrCep to save.
     * @param arrCep the arrCep to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated arrCep,
     * or with status {@code 400 (Bad Request)} if the arrCep is not valid,
     * or with status {@code 404 (Not Found)} if the arrCep is not found,
     * or with status {@code 500 (Internal Server Error)} if the arrCep couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/arr-ceps/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ArrCep> partialUpdateArrCep(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody ArrCep arrCep
    ) throws URISyntaxException {
        log.debug("REST request to partial update ArrCep partially : {}, {}", id, arrCep);
        if (arrCep.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, arrCep.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!arrCepRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ArrCep> result = arrCepRepository
            .findById(arrCep.getId())
            .map(existingArrCep -> {
                if (arrCep.getCepnum() != null) {
                    existingArrCep.setCepnum(arrCep.getCepnum());
                }
                if (arrCep.getCependtip() != null) {
                    existingArrCep.setCependtip(arrCep.getCependtip());
                }
                if (arrCep.getCepend() != null) {
                    existingArrCep.setCepend(arrCep.getCepend());
                }
                if (arrCep.getCependcompl() != null) {
                    existingArrCep.setCependcompl(arrCep.getCependcompl());
                }
                if (arrCep.getCepbai() != null) {
                    existingArrCep.setCepbai(arrCep.getCepbai());
                }
                if (arrCep.getCepcid() != null) {
                    existingArrCep.setCepcid(arrCep.getCepcid());
                }
                if (arrCep.getCepmuncod() != null) {
                    existingArrCep.setCepmuncod(arrCep.getCepmuncod());
                }
                if (arrCep.getCepmunnom() != null) {
                    existingArrCep.setCepmunnom(arrCep.getCepmunnom());
                }
                if (arrCep.getCepmunuf() != null) {
                    existingArrCep.setCepmunuf(arrCep.getCepmunuf());
                }

                return existingArrCep;
            })
            .map(arrCepRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, arrCep.getId().toString())
        );
    }

    /**
     * {@code GET  /arr-ceps} : get all the arrCeps.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of arrCeps in body.
     */
    @GetMapping("/arr-ceps")
    public List<ArrCep> getAllArrCeps() {
        log.debug("REST request to get all ArrCeps");
        return arrCepRepository.findAll();
    }

    /**
     * {@code GET  /arr-ceps/:id} : get the "id" arrCep.
     *
     * @param id the id of the arrCep to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the arrCep, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/arr-ceps/{id}")
    public ResponseEntity<ArrCep> getArrCep(@PathVariable Long id) {
        log.debug("REST request to get ArrCep : {}", id);
        Optional<ArrCep> arrCep = arrCepRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(arrCep);
    }

    /**
     * {@code DELETE  /arr-ceps/:id} : delete the "id" arrCep.
     *
     * @param id the id of the arrCep to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/arr-ceps/{id}")
    public ResponseEntity<Void> deleteArrCep(@PathVariable Long id) {
        log.debug("REST request to delete ArrCep : {}", id);
        arrCepRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
