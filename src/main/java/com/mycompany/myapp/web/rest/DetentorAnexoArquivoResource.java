package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.DetentorAnexoArquivo;
import com.mycompany.myapp.repository.DetentorAnexoArquivoRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.DetentorAnexoArquivo}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DetentorAnexoArquivoResource {

    private final Logger log = LoggerFactory.getLogger(DetentorAnexoArquivoResource.class);

    private static final String ENTITY_NAME = "detentorAnexoArquivo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DetentorAnexoArquivoRepository detentorAnexoArquivoRepository;

    public DetentorAnexoArquivoResource(DetentorAnexoArquivoRepository detentorAnexoArquivoRepository) {
        this.detentorAnexoArquivoRepository = detentorAnexoArquivoRepository;
    }

    /**
     * {@code POST  /detentor-anexo-arquivos} : Create a new detentorAnexoArquivo.
     *
     * @param detentorAnexoArquivo the detentorAnexoArquivo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new detentorAnexoArquivo, or with status {@code 400 (Bad Request)} if the detentorAnexoArquivo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/detentor-anexo-arquivos")
    public ResponseEntity<DetentorAnexoArquivo> createDetentorAnexoArquivo(@Valid @RequestBody DetentorAnexoArquivo detentorAnexoArquivo)
        throws URISyntaxException {
        log.debug("REST request to save DetentorAnexoArquivo : {}", detentorAnexoArquivo);
        if (detentorAnexoArquivo.getId() != null) {
            throw new BadRequestAlertException("A new detentorAnexoArquivo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DetentorAnexoArquivo result = detentorAnexoArquivoRepository.save(detentorAnexoArquivo);
        return ResponseEntity
            .created(new URI("/api/detentor-anexo-arquivos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /detentor-anexo-arquivos/:id} : Updates an existing detentorAnexoArquivo.
     *
     * @param id the id of the detentorAnexoArquivo to save.
     * @param detentorAnexoArquivo the detentorAnexoArquivo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated detentorAnexoArquivo,
     * or with status {@code 400 (Bad Request)} if the detentorAnexoArquivo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the detentorAnexoArquivo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/detentor-anexo-arquivos/{id}")
    public ResponseEntity<DetentorAnexoArquivo> updateDetentorAnexoArquivo(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody DetentorAnexoArquivo detentorAnexoArquivo
    ) throws URISyntaxException {
        log.debug("REST request to update DetentorAnexoArquivo : {}, {}", id, detentorAnexoArquivo);
        if (detentorAnexoArquivo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, detentorAnexoArquivo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!detentorAnexoArquivoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        DetentorAnexoArquivo result = detentorAnexoArquivoRepository.save(detentorAnexoArquivo);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, detentorAnexoArquivo.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /detentor-anexo-arquivos/:id} : Partial updates given fields of an existing detentorAnexoArquivo, field will ignore if it is null
     *
     * @param id the id of the detentorAnexoArquivo to save.
     * @param detentorAnexoArquivo the detentorAnexoArquivo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated detentorAnexoArquivo,
     * or with status {@code 400 (Bad Request)} if the detentorAnexoArquivo is not valid,
     * or with status {@code 404 (Not Found)} if the detentorAnexoArquivo is not found,
     * or with status {@code 500 (Internal Server Error)} if the detentorAnexoArquivo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/detentor-anexo-arquivos/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<DetentorAnexoArquivo> partialUpdateDetentorAnexoArquivo(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody DetentorAnexoArquivo detentorAnexoArquivo
    ) throws URISyntaxException {
        log.debug("REST request to partial update DetentorAnexoArquivo partially : {}, {}", id, detentorAnexoArquivo);
        if (detentorAnexoArquivo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, detentorAnexoArquivo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!detentorAnexoArquivoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<DetentorAnexoArquivo> result = detentorAnexoArquivoRepository
            .findById(detentorAnexoArquivo.getId())
            .map(existingDetentorAnexoArquivo -> {
                if (detentorAnexoArquivo.getDataCriacao() != null) {
                    existingDetentorAnexoArquivo.setDataCriacao(detentorAnexoArquivo.getDataCriacao());
                }

                return existingDetentorAnexoArquivo;
            })
            .map(detentorAnexoArquivoRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, detentorAnexoArquivo.getId().toString())
        );
    }

    /**
     * {@code GET  /detentor-anexo-arquivos} : get all the detentorAnexoArquivos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of detentorAnexoArquivos in body.
     */
    @GetMapping("/detentor-anexo-arquivos")
    public List<DetentorAnexoArquivo> getAllDetentorAnexoArquivos() {
        log.debug("REST request to get all DetentorAnexoArquivos");
        return detentorAnexoArquivoRepository.findAll();
    }

    /**
     * {@code GET  /detentor-anexo-arquivos/:id} : get the "id" detentorAnexoArquivo.
     *
     * @param id the id of the detentorAnexoArquivo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the detentorAnexoArquivo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/detentor-anexo-arquivos/{id}")
    public ResponseEntity<DetentorAnexoArquivo> getDetentorAnexoArquivo(@PathVariable Long id) {
        log.debug("REST request to get DetentorAnexoArquivo : {}", id);
        Optional<DetentorAnexoArquivo> detentorAnexoArquivo = detentorAnexoArquivoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(detentorAnexoArquivo);
    }

    /**
     * {@code DELETE  /detentor-anexo-arquivos/:id} : delete the "id" detentorAnexoArquivo.
     *
     * @param id the id of the detentorAnexoArquivo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/detentor-anexo-arquivos/{id}")
    public ResponseEntity<Void> deleteDetentorAnexoArquivo(@PathVariable Long id) {
        log.debug("REST request to delete DetentorAnexoArquivo : {}", id);
        detentorAnexoArquivoRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
