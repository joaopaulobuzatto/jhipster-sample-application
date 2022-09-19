package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.OfertaServico;
import com.mycompany.myapp.repository.OfertaServicoRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.OfertaServico}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class OfertaServicoResource {

    private final Logger log = LoggerFactory.getLogger(OfertaServicoResource.class);

    private static final String ENTITY_NAME = "ofertaServico";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OfertaServicoRepository ofertaServicoRepository;

    public OfertaServicoResource(OfertaServicoRepository ofertaServicoRepository) {
        this.ofertaServicoRepository = ofertaServicoRepository;
    }

    /**
     * {@code POST  /oferta-servicos} : Create a new ofertaServico.
     *
     * @param ofertaServico the ofertaServico to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ofertaServico, or with status {@code 400 (Bad Request)} if the ofertaServico has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/oferta-servicos")
    public ResponseEntity<OfertaServico> createOfertaServico(@RequestBody OfertaServico ofertaServico) throws URISyntaxException {
        log.debug("REST request to save OfertaServico : {}", ofertaServico);
        if (ofertaServico.getId() != null) {
            throw new BadRequestAlertException("A new ofertaServico cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OfertaServico result = ofertaServicoRepository.save(ofertaServico);
        return ResponseEntity
            .created(new URI("/api/oferta-servicos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /oferta-servicos/:id} : Updates an existing ofertaServico.
     *
     * @param id the id of the ofertaServico to save.
     * @param ofertaServico the ofertaServico to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ofertaServico,
     * or with status {@code 400 (Bad Request)} if the ofertaServico is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ofertaServico couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/oferta-servicos/{id}")
    public ResponseEntity<OfertaServico> updateOfertaServico(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody OfertaServico ofertaServico
    ) throws URISyntaxException {
        log.debug("REST request to update OfertaServico : {}, {}", id, ofertaServico);
        if (ofertaServico.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, ofertaServico.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ofertaServicoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        OfertaServico result = ofertaServicoRepository.save(ofertaServico);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, ofertaServico.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /oferta-servicos/:id} : Partial updates given fields of an existing ofertaServico, field will ignore if it is null
     *
     * @param id the id of the ofertaServico to save.
     * @param ofertaServico the ofertaServico to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ofertaServico,
     * or with status {@code 400 (Bad Request)} if the ofertaServico is not valid,
     * or with status {@code 404 (Not Found)} if the ofertaServico is not found,
     * or with status {@code 500 (Internal Server Error)} if the ofertaServico couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/oferta-servicos/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<OfertaServico> partialUpdateOfertaServico(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody OfertaServico ofertaServico
    ) throws URISyntaxException {
        log.debug("REST request to partial update OfertaServico partially : {}, {}", id, ofertaServico);
        if (ofertaServico.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, ofertaServico.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ofertaServicoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<OfertaServico> result = ofertaServicoRepository
            .findById(ofertaServico.getId())
            .map(existingOfertaServico -> {
                return existingOfertaServico;
            })
            .map(ofertaServicoRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, ofertaServico.getId().toString())
        );
    }

    /**
     * {@code GET  /oferta-servicos} : get all the ofertaServicos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ofertaServicos in body.
     */
    @GetMapping("/oferta-servicos")
    public List<OfertaServico> getAllOfertaServicos() {
        log.debug("REST request to get all OfertaServicos");
        return ofertaServicoRepository.findAll();
    }

    /**
     * {@code GET  /oferta-servicos/:id} : get the "id" ofertaServico.
     *
     * @param id the id of the ofertaServico to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ofertaServico, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/oferta-servicos/{id}")
    public ResponseEntity<OfertaServico> getOfertaServico(@PathVariable Long id) {
        log.debug("REST request to get OfertaServico : {}", id);
        Optional<OfertaServico> ofertaServico = ofertaServicoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ofertaServico);
    }

    /**
     * {@code DELETE  /oferta-servicos/:id} : delete the "id" ofertaServico.
     *
     * @param id the id of the ofertaServico to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/oferta-servicos/{id}")
    public ResponseEntity<Void> deleteOfertaServico(@PathVariable Long id) {
        log.debug("REST request to delete OfertaServico : {}", id);
        ofertaServicoRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
