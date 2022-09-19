package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Oferta;
import com.mycompany.myapp.repository.OfertaRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Oferta}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class OfertaResource {

    private final Logger log = LoggerFactory.getLogger(OfertaResource.class);

    private static final String ENTITY_NAME = "oferta";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OfertaRepository ofertaRepository;

    public OfertaResource(OfertaRepository ofertaRepository) {
        this.ofertaRepository = ofertaRepository;
    }

    /**
     * {@code POST  /ofertas} : Create a new oferta.
     *
     * @param oferta the oferta to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new oferta, or with status {@code 400 (Bad Request)} if the oferta has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ofertas")
    public ResponseEntity<Oferta> createOferta(@Valid @RequestBody Oferta oferta) throws URISyntaxException {
        log.debug("REST request to save Oferta : {}", oferta);
        if (oferta.getId() != null) {
            throw new BadRequestAlertException("A new oferta cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Oferta result = ofertaRepository.save(oferta);
        return ResponseEntity
            .created(new URI("/api/ofertas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ofertas/:id} : Updates an existing oferta.
     *
     * @param id the id of the oferta to save.
     * @param oferta the oferta to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated oferta,
     * or with status {@code 400 (Bad Request)} if the oferta is not valid,
     * or with status {@code 500 (Internal Server Error)} if the oferta couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ofertas/{id}")
    public ResponseEntity<Oferta> updateOferta(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Oferta oferta
    ) throws URISyntaxException {
        log.debug("REST request to update Oferta : {}, {}", id, oferta);
        if (oferta.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, oferta.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ofertaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Oferta result = ofertaRepository.save(oferta);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, oferta.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /ofertas/:id} : Partial updates given fields of an existing oferta, field will ignore if it is null
     *
     * @param id the id of the oferta to save.
     * @param oferta the oferta to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated oferta,
     * or with status {@code 400 (Bad Request)} if the oferta is not valid,
     * or with status {@code 404 (Not Found)} if the oferta is not found,
     * or with status {@code 500 (Internal Server Error)} if the oferta couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/ofertas/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Oferta> partialUpdateOferta(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Oferta oferta
    ) throws URISyntaxException {
        log.debug("REST request to partial update Oferta partially : {}, {}", id, oferta);
        if (oferta.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, oferta.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ofertaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Oferta> result = ofertaRepository
            .findById(oferta.getId())
            .map(existingOferta -> {
                if (oferta.getCodigo() != null) {
                    existingOferta.setCodigo(oferta.getCodigo());
                }
                if (oferta.getDataCriacao() != null) {
                    existingOferta.setDataCriacao(oferta.getDataCriacao());
                }
                if (oferta.getDescricao() != null) {
                    existingOferta.setDescricao(oferta.getDescricao());
                }
                if (oferta.getAtivo() != null) {
                    existingOferta.setAtivo(oferta.getAtivo());
                }
                if (oferta.getValor() != null) {
                    existingOferta.setValor(oferta.getValor());
                }

                return existingOferta;
            })
            .map(ofertaRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, oferta.getId().toString())
        );
    }

    /**
     * {@code GET  /ofertas} : get all the ofertas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ofertas in body.
     */
    @GetMapping("/ofertas")
    public List<Oferta> getAllOfertas() {
        log.debug("REST request to get all Ofertas");
        return ofertaRepository.findAll();
    }

    /**
     * {@code GET  /ofertas/:id} : get the "id" oferta.
     *
     * @param id the id of the oferta to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the oferta, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ofertas/{id}")
    public ResponseEntity<Oferta> getOferta(@PathVariable Long id) {
        log.debug("REST request to get Oferta : {}", id);
        Optional<Oferta> oferta = ofertaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(oferta);
    }

    /**
     * {@code DELETE  /ofertas/:id} : delete the "id" oferta.
     *
     * @param id the id of the oferta to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ofertas/{id}")
    public ResponseEntity<Void> deleteOferta(@PathVariable Long id) {
        log.debug("REST request to delete Oferta : {}", id);
        ofertaRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
