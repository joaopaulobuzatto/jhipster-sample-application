package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Operadora;
import com.mycompany.myapp.repository.OperadoraRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Operadora}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class OperadoraResource {

    private final Logger log = LoggerFactory.getLogger(OperadoraResource.class);

    private static final String ENTITY_NAME = "operadora";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OperadoraRepository operadoraRepository;

    public OperadoraResource(OperadoraRepository operadoraRepository) {
        this.operadoraRepository = operadoraRepository;
    }

    /**
     * {@code POST  /operadoras} : Create a new operadora.
     *
     * @param operadora the operadora to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new operadora, or with status {@code 400 (Bad Request)} if the operadora has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/operadoras")
    public ResponseEntity<Operadora> createOperadora(@Valid @RequestBody Operadora operadora) throws URISyntaxException {
        log.debug("REST request to save Operadora : {}", operadora);
        if (operadora.getId() != null) {
            throw new BadRequestAlertException("A new operadora cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Operadora result = operadoraRepository.save(operadora);
        return ResponseEntity
            .created(new URI("/api/operadoras/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /operadoras/:id} : Updates an existing operadora.
     *
     * @param id the id of the operadora to save.
     * @param operadora the operadora to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated operadora,
     * or with status {@code 400 (Bad Request)} if the operadora is not valid,
     * or with status {@code 500 (Internal Server Error)} if the operadora couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/operadoras/{id}")
    public ResponseEntity<Operadora> updateOperadora(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Operadora operadora
    ) throws URISyntaxException {
        log.debug("REST request to update Operadora : {}, {}", id, operadora);
        if (operadora.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, operadora.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!operadoraRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Operadora result = operadoraRepository.save(operadora);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, operadora.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /operadoras/:id} : Partial updates given fields of an existing operadora, field will ignore if it is null
     *
     * @param id the id of the operadora to save.
     * @param operadora the operadora to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated operadora,
     * or with status {@code 400 (Bad Request)} if the operadora is not valid,
     * or with status {@code 404 (Not Found)} if the operadora is not found,
     * or with status {@code 500 (Internal Server Error)} if the operadora couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/operadoras/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Operadora> partialUpdateOperadora(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Operadora operadora
    ) throws URISyntaxException {
        log.debug("REST request to partial update Operadora partially : {}, {}", id, operadora);
        if (operadora.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, operadora.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!operadoraRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Operadora> result = operadoraRepository
            .findById(operadora.getId())
            .map(existingOperadora -> {
                if (operadora.getCodigo() != null) {
                    existingOperadora.setCodigo(operadora.getCodigo());
                }
                if (operadora.getDataCriacao() != null) {
                    existingOperadora.setDataCriacao(operadora.getDataCriacao());
                }
                if (operadora.getDescricao() != null) {
                    existingOperadora.setDescricao(operadora.getDescricao());
                }
                if (operadora.getAtivo() != null) {
                    existingOperadora.setAtivo(operadora.getAtivo());
                }

                return existingOperadora;
            })
            .map(operadoraRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, operadora.getId().toString())
        );
    }

    /**
     * {@code GET  /operadoras} : get all the operadoras.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of operadoras in body.
     */
    @GetMapping("/operadoras")
    public List<Operadora> getAllOperadoras() {
        log.debug("REST request to get all Operadoras");
        return operadoraRepository.findAll();
    }

    /**
     * {@code GET  /operadoras/:id} : get the "id" operadora.
     *
     * @param id the id of the operadora to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the operadora, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/operadoras/{id}")
    public ResponseEntity<Operadora> getOperadora(@PathVariable Long id) {
        log.debug("REST request to get Operadora : {}", id);
        Optional<Operadora> operadora = operadoraRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(operadora);
    }

    /**
     * {@code DELETE  /operadoras/:id} : delete the "id" operadora.
     *
     * @param id the id of the operadora to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/operadoras/{id}")
    public ResponseEntity<Void> deleteOperadora(@PathVariable Long id) {
        log.debug("REST request to delete Operadora : {}", id);
        operadoraRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
