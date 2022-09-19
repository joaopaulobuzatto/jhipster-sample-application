package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.AnexoArquivo;
import com.mycompany.myapp.repository.AnexoArquivoRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.AnexoArquivo}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AnexoArquivoResource {

    private final Logger log = LoggerFactory.getLogger(AnexoArquivoResource.class);

    private static final String ENTITY_NAME = "anexoArquivo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AnexoArquivoRepository anexoArquivoRepository;

    public AnexoArquivoResource(AnexoArquivoRepository anexoArquivoRepository) {
        this.anexoArquivoRepository = anexoArquivoRepository;
    }

    /**
     * {@code POST  /anexo-arquivos} : Create a new anexoArquivo.
     *
     * @param anexoArquivo the anexoArquivo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new anexoArquivo, or with status {@code 400 (Bad Request)} if the anexoArquivo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/anexo-arquivos")
    public ResponseEntity<AnexoArquivo> createAnexoArquivo(@Valid @RequestBody AnexoArquivo anexoArquivo) throws URISyntaxException {
        log.debug("REST request to save AnexoArquivo : {}", anexoArquivo);
        if (anexoArquivo.getId() != null) {
            throw new BadRequestAlertException("A new anexoArquivo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AnexoArquivo result = anexoArquivoRepository.save(anexoArquivo);
        return ResponseEntity
            .created(new URI("/api/anexo-arquivos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /anexo-arquivos/:id} : Updates an existing anexoArquivo.
     *
     * @param id the id of the anexoArquivo to save.
     * @param anexoArquivo the anexoArquivo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated anexoArquivo,
     * or with status {@code 400 (Bad Request)} if the anexoArquivo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the anexoArquivo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/anexo-arquivos/{id}")
    public ResponseEntity<AnexoArquivo> updateAnexoArquivo(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody AnexoArquivo anexoArquivo
    ) throws URISyntaxException {
        log.debug("REST request to update AnexoArquivo : {}, {}", id, anexoArquivo);
        if (anexoArquivo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, anexoArquivo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!anexoArquivoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        AnexoArquivo result = anexoArquivoRepository.save(anexoArquivo);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, anexoArquivo.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /anexo-arquivos/:id} : Partial updates given fields of an existing anexoArquivo, field will ignore if it is null
     *
     * @param id the id of the anexoArquivo to save.
     * @param anexoArquivo the anexoArquivo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated anexoArquivo,
     * or with status {@code 400 (Bad Request)} if the anexoArquivo is not valid,
     * or with status {@code 404 (Not Found)} if the anexoArquivo is not found,
     * or with status {@code 500 (Internal Server Error)} if the anexoArquivo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/anexo-arquivos/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<AnexoArquivo> partialUpdateAnexoArquivo(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody AnexoArquivo anexoArquivo
    ) throws URISyntaxException {
        log.debug("REST request to partial update AnexoArquivo partially : {}, {}", id, anexoArquivo);
        if (anexoArquivo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, anexoArquivo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!anexoArquivoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<AnexoArquivo> result = anexoArquivoRepository
            .findById(anexoArquivo.getId())
            .map(existingAnexoArquivo -> {
                if (anexoArquivo.getCodigo() != null) {
                    existingAnexoArquivo.setCodigo(anexoArquivo.getCodigo());
                }
                if (anexoArquivo.getDataCriacao() != null) {
                    existingAnexoArquivo.setDataCriacao(anexoArquivo.getDataCriacao());
                }
                if (anexoArquivo.getDescricao() != null) {
                    existingAnexoArquivo.setDescricao(anexoArquivo.getDescricao());
                }
                if (anexoArquivo.getNomeNuvem() != null) {
                    existingAnexoArquivo.setNomeNuvem(anexoArquivo.getNomeNuvem());
                }
                if (anexoArquivo.getNomeOriginal() != null) {
                    existingAnexoArquivo.setNomeOriginal(anexoArquivo.getNomeOriginal());
                }
                if (anexoArquivo.getTipoOrigemAnexoArquivo() != null) {
                    existingAnexoArquivo.setTipoOrigemAnexoArquivo(anexoArquivo.getTipoOrigemAnexoArquivo());
                }

                return existingAnexoArquivo;
            })
            .map(anexoArquivoRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, anexoArquivo.getId().toString())
        );
    }

    /**
     * {@code GET  /anexo-arquivos} : get all the anexoArquivos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of anexoArquivos in body.
     */
    @GetMapping("/anexo-arquivos")
    public List<AnexoArquivo> getAllAnexoArquivos() {
        log.debug("REST request to get all AnexoArquivos");
        return anexoArquivoRepository.findAll();
    }

    /**
     * {@code GET  /anexo-arquivos/:id} : get the "id" anexoArquivo.
     *
     * @param id the id of the anexoArquivo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the anexoArquivo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/anexo-arquivos/{id}")
    public ResponseEntity<AnexoArquivo> getAnexoArquivo(@PathVariable Long id) {
        log.debug("REST request to get AnexoArquivo : {}", id);
        Optional<AnexoArquivo> anexoArquivo = anexoArquivoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(anexoArquivo);
    }

    /**
     * {@code DELETE  /anexo-arquivos/:id} : delete the "id" anexoArquivo.
     *
     * @param id the id of the anexoArquivo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/anexo-arquivos/{id}")
    public ResponseEntity<Void> deleteAnexoArquivo(@PathVariable Long id) {
        log.debug("REST request to delete AnexoArquivo : {}", id);
        anexoArquivoRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
