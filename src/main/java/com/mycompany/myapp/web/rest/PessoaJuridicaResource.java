package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.PessoaJuridica;
import com.mycompany.myapp.repository.PessoaJuridicaRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.PessoaJuridica}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PessoaJuridicaResource {

    private final Logger log = LoggerFactory.getLogger(PessoaJuridicaResource.class);

    private static final String ENTITY_NAME = "pessoaJuridica";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PessoaJuridicaRepository pessoaJuridicaRepository;

    public PessoaJuridicaResource(PessoaJuridicaRepository pessoaJuridicaRepository) {
        this.pessoaJuridicaRepository = pessoaJuridicaRepository;
    }

    /**
     * {@code POST  /pessoa-juridicas} : Create a new pessoaJuridica.
     *
     * @param pessoaJuridica the pessoaJuridica to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new pessoaJuridica, or with status {@code 400 (Bad Request)} if the pessoaJuridica has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/pessoa-juridicas")
    public ResponseEntity<PessoaJuridica> createPessoaJuridica(@Valid @RequestBody PessoaJuridica pessoaJuridica)
        throws URISyntaxException {
        log.debug("REST request to save PessoaJuridica : {}", pessoaJuridica);
        if (pessoaJuridica.getId() != null) {
            throw new BadRequestAlertException("A new pessoaJuridica cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PessoaJuridica result = pessoaJuridicaRepository.save(pessoaJuridica);
        return ResponseEntity
            .created(new URI("/api/pessoa-juridicas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /pessoa-juridicas/:id} : Updates an existing pessoaJuridica.
     *
     * @param id the id of the pessoaJuridica to save.
     * @param pessoaJuridica the pessoaJuridica to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pessoaJuridica,
     * or with status {@code 400 (Bad Request)} if the pessoaJuridica is not valid,
     * or with status {@code 500 (Internal Server Error)} if the pessoaJuridica couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/pessoa-juridicas/{id}")
    public ResponseEntity<PessoaJuridica> updatePessoaJuridica(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody PessoaJuridica pessoaJuridica
    ) throws URISyntaxException {
        log.debug("REST request to update PessoaJuridica : {}, {}", id, pessoaJuridica);
        if (pessoaJuridica.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, pessoaJuridica.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!pessoaJuridicaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        PessoaJuridica result = pessoaJuridicaRepository.save(pessoaJuridica);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, pessoaJuridica.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /pessoa-juridicas/:id} : Partial updates given fields of an existing pessoaJuridica, field will ignore if it is null
     *
     * @param id the id of the pessoaJuridica to save.
     * @param pessoaJuridica the pessoaJuridica to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pessoaJuridica,
     * or with status {@code 400 (Bad Request)} if the pessoaJuridica is not valid,
     * or with status {@code 404 (Not Found)} if the pessoaJuridica is not found,
     * or with status {@code 500 (Internal Server Error)} if the pessoaJuridica couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/pessoa-juridicas/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<PessoaJuridica> partialUpdatePessoaJuridica(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody PessoaJuridica pessoaJuridica
    ) throws URISyntaxException {
        log.debug("REST request to partial update PessoaJuridica partially : {}, {}", id, pessoaJuridica);
        if (pessoaJuridica.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, pessoaJuridica.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!pessoaJuridicaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<PessoaJuridica> result = pessoaJuridicaRepository
            .findById(pessoaJuridica.getId())
            .map(existingPessoaJuridica -> {
                if (pessoaJuridica.getCnpj() != null) {
                    existingPessoaJuridica.setCnpj(pessoaJuridica.getCnpj());
                }
                if (pessoaJuridica.getRazaoSocial() != null) {
                    existingPessoaJuridica.setRazaoSocial(pessoaJuridica.getRazaoSocial());
                }
                if (pessoaJuridica.getNomeFantasia() != null) {
                    existingPessoaJuridica.setNomeFantasia(pessoaJuridica.getNomeFantasia());
                }
                if (pessoaJuridica.getCodigoCnae() != null) {
                    existingPessoaJuridica.setCodigoCnae(pessoaJuridica.getCodigoCnae());
                }
                if (pessoaJuridica.getDataAbertura() != null) {
                    existingPessoaJuridica.setDataAbertura(pessoaJuridica.getDataAbertura());
                }
                if (pessoaJuridica.getCodigoCnaePrincipal() != null) {
                    existingPessoaJuridica.setCodigoCnaePrincipal(pessoaJuridica.getCodigoCnaePrincipal());
                }
                if (pessoaJuridica.getCodigoNaturezaJuridica() != null) {
                    existingPessoaJuridica.setCodigoNaturezaJuridica(pessoaJuridica.getCodigoNaturezaJuridica());
                }
                if (pessoaJuridica.getQuantidadeFuncionarios() != null) {
                    existingPessoaJuridica.setQuantidadeFuncionarios(pessoaJuridica.getQuantidadeFuncionarios());
                }

                return existingPessoaJuridica;
            })
            .map(pessoaJuridicaRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, pessoaJuridica.getId().toString())
        );
    }

    /**
     * {@code GET  /pessoa-juridicas} : get all the pessoaJuridicas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of pessoaJuridicas in body.
     */
    @GetMapping("/pessoa-juridicas")
    public List<PessoaJuridica> getAllPessoaJuridicas() {
        log.debug("REST request to get all PessoaJuridicas");
        return pessoaJuridicaRepository.findAll();
    }

    /**
     * {@code GET  /pessoa-juridicas/:id} : get the "id" pessoaJuridica.
     *
     * @param id the id of the pessoaJuridica to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the pessoaJuridica, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/pessoa-juridicas/{id}")
    public ResponseEntity<PessoaJuridica> getPessoaJuridica(@PathVariable Long id) {
        log.debug("REST request to get PessoaJuridica : {}", id);
        Optional<PessoaJuridica> pessoaJuridica = pessoaJuridicaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(pessoaJuridica);
    }

    /**
     * {@code DELETE  /pessoa-juridicas/:id} : delete the "id" pessoaJuridica.
     *
     * @param id the id of the pessoaJuridica to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/pessoa-juridicas/{id}")
    public ResponseEntity<Void> deletePessoaJuridica(@PathVariable Long id) {
        log.debug("REST request to delete PessoaJuridica : {}", id);
        pessoaJuridicaRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
