package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.PessoaFisica;
import com.mycompany.myapp.repository.PessoaFisicaRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.PessoaFisica}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PessoaFisicaResource {

    private final Logger log = LoggerFactory.getLogger(PessoaFisicaResource.class);

    private static final String ENTITY_NAME = "pessoaFisica";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PessoaFisicaRepository pessoaFisicaRepository;

    public PessoaFisicaResource(PessoaFisicaRepository pessoaFisicaRepository) {
        this.pessoaFisicaRepository = pessoaFisicaRepository;
    }

    /**
     * {@code POST  /pessoa-fisicas} : Create a new pessoaFisica.
     *
     * @param pessoaFisica the pessoaFisica to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new pessoaFisica, or with status {@code 400 (Bad Request)} if the pessoaFisica has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/pessoa-fisicas")
    public ResponseEntity<PessoaFisica> createPessoaFisica(@Valid @RequestBody PessoaFisica pessoaFisica) throws URISyntaxException {
        log.debug("REST request to save PessoaFisica : {}", pessoaFisica);
        if (pessoaFisica.getId() != null) {
            throw new BadRequestAlertException("A new pessoaFisica cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PessoaFisica result = pessoaFisicaRepository.save(pessoaFisica);
        return ResponseEntity
            .created(new URI("/api/pessoa-fisicas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /pessoa-fisicas/:id} : Updates an existing pessoaFisica.
     *
     * @param id the id of the pessoaFisica to save.
     * @param pessoaFisica the pessoaFisica to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pessoaFisica,
     * or with status {@code 400 (Bad Request)} if the pessoaFisica is not valid,
     * or with status {@code 500 (Internal Server Error)} if the pessoaFisica couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/pessoa-fisicas/{id}")
    public ResponseEntity<PessoaFisica> updatePessoaFisica(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody PessoaFisica pessoaFisica
    ) throws URISyntaxException {
        log.debug("REST request to update PessoaFisica : {}, {}", id, pessoaFisica);
        if (pessoaFisica.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, pessoaFisica.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!pessoaFisicaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        PessoaFisica result = pessoaFisicaRepository.save(pessoaFisica);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, pessoaFisica.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /pessoa-fisicas/:id} : Partial updates given fields of an existing pessoaFisica, field will ignore if it is null
     *
     * @param id the id of the pessoaFisica to save.
     * @param pessoaFisica the pessoaFisica to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pessoaFisica,
     * or with status {@code 400 (Bad Request)} if the pessoaFisica is not valid,
     * or with status {@code 404 (Not Found)} if the pessoaFisica is not found,
     * or with status {@code 500 (Internal Server Error)} if the pessoaFisica couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/pessoa-fisicas/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<PessoaFisica> partialUpdatePessoaFisica(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody PessoaFisica pessoaFisica
    ) throws URISyntaxException {
        log.debug("REST request to partial update PessoaFisica partially : {}, {}", id, pessoaFisica);
        if (pessoaFisica.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, pessoaFisica.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!pessoaFisicaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<PessoaFisica> result = pessoaFisicaRepository
            .findById(pessoaFisica.getId())
            .map(existingPessoaFisica -> {
                if (pessoaFisica.getNomeCompleto() != null) {
                    existingPessoaFisica.setNomeCompleto(pessoaFisica.getNomeCompleto());
                }
                if (pessoaFisica.getCpf() != null) {
                    existingPessoaFisica.setCpf(pessoaFisica.getCpf());
                }
                if (pessoaFisica.getRg() != null) {
                    existingPessoaFisica.setRg(pessoaFisica.getRg());
                }
                if (pessoaFisica.getDataNascimento() != null) {
                    existingPessoaFisica.setDataNascimento(pessoaFisica.getDataNascimento());
                }

                return existingPessoaFisica;
            })
            .map(pessoaFisicaRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, pessoaFisica.getId().toString())
        );
    }

    /**
     * {@code GET  /pessoa-fisicas} : get all the pessoaFisicas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of pessoaFisicas in body.
     */
    @GetMapping("/pessoa-fisicas")
    public List<PessoaFisica> getAllPessoaFisicas() {
        log.debug("REST request to get all PessoaFisicas");
        return pessoaFisicaRepository.findAll();
    }

    /**
     * {@code GET  /pessoa-fisicas/:id} : get the "id" pessoaFisica.
     *
     * @param id the id of the pessoaFisica to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the pessoaFisica, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/pessoa-fisicas/{id}")
    public ResponseEntity<PessoaFisica> getPessoaFisica(@PathVariable Long id) {
        log.debug("REST request to get PessoaFisica : {}", id);
        Optional<PessoaFisica> pessoaFisica = pessoaFisicaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(pessoaFisica);
    }

    /**
     * {@code DELETE  /pessoa-fisicas/:id} : delete the "id" pessoaFisica.
     *
     * @param id the id of the pessoaFisica to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/pessoa-fisicas/{id}")
    public ResponseEntity<Void> deletePessoaFisica(@PathVariable Long id) {
        log.debug("REST request to delete PessoaFisica : {}", id);
        pessoaFisicaRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
