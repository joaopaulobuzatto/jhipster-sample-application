package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.GrupoPermissoes;
import com.mycompany.myapp.repository.GrupoPermissoesRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.GrupoPermissoes}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class GrupoPermissoesResource {

    private final Logger log = LoggerFactory.getLogger(GrupoPermissoesResource.class);

    private static final String ENTITY_NAME = "grupoPermissoes";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final GrupoPermissoesRepository grupoPermissoesRepository;

    public GrupoPermissoesResource(GrupoPermissoesRepository grupoPermissoesRepository) {
        this.grupoPermissoesRepository = grupoPermissoesRepository;
    }

    /**
     * {@code POST  /grupo-permissoes} : Create a new grupoPermissoes.
     *
     * @param grupoPermissoes the grupoPermissoes to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new grupoPermissoes, or with status {@code 400 (Bad Request)} if the grupoPermissoes has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/grupo-permissoes")
    public ResponseEntity<GrupoPermissoes> createGrupoPermissoes(@Valid @RequestBody GrupoPermissoes grupoPermissoes)
        throws URISyntaxException {
        log.debug("REST request to save GrupoPermissoes : {}", grupoPermissoes);
        if (grupoPermissoes.getId() != null) {
            throw new BadRequestAlertException("A new grupoPermissoes cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GrupoPermissoes result = grupoPermissoesRepository.save(grupoPermissoes);
        return ResponseEntity
            .created(new URI("/api/grupo-permissoes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /grupo-permissoes/:id} : Updates an existing grupoPermissoes.
     *
     * @param id the id of the grupoPermissoes to save.
     * @param grupoPermissoes the grupoPermissoes to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated grupoPermissoes,
     * or with status {@code 400 (Bad Request)} if the grupoPermissoes is not valid,
     * or with status {@code 500 (Internal Server Error)} if the grupoPermissoes couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/grupo-permissoes/{id}")
    public ResponseEntity<GrupoPermissoes> updateGrupoPermissoes(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody GrupoPermissoes grupoPermissoes
    ) throws URISyntaxException {
        log.debug("REST request to update GrupoPermissoes : {}, {}", id, grupoPermissoes);
        if (grupoPermissoes.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, grupoPermissoes.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!grupoPermissoesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        GrupoPermissoes result = grupoPermissoesRepository.save(grupoPermissoes);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, grupoPermissoes.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /grupo-permissoes/:id} : Partial updates given fields of an existing grupoPermissoes, field will ignore if it is null
     *
     * @param id the id of the grupoPermissoes to save.
     * @param grupoPermissoes the grupoPermissoes to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated grupoPermissoes,
     * or with status {@code 400 (Bad Request)} if the grupoPermissoes is not valid,
     * or with status {@code 404 (Not Found)} if the grupoPermissoes is not found,
     * or with status {@code 500 (Internal Server Error)} if the grupoPermissoes couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/grupo-permissoes/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<GrupoPermissoes> partialUpdateGrupoPermissoes(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody GrupoPermissoes grupoPermissoes
    ) throws URISyntaxException {
        log.debug("REST request to partial update GrupoPermissoes partially : {}, {}", id, grupoPermissoes);
        if (grupoPermissoes.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, grupoPermissoes.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!grupoPermissoesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<GrupoPermissoes> result = grupoPermissoesRepository
            .findById(grupoPermissoes.getId())
            .map(existingGrupoPermissoes -> {
                if (grupoPermissoes.getCodigo() != null) {
                    existingGrupoPermissoes.setCodigo(grupoPermissoes.getCodigo());
                }
                if (grupoPermissoes.getDataCriacao() != null) {
                    existingGrupoPermissoes.setDataCriacao(grupoPermissoes.getDataCriacao());
                }
                if (grupoPermissoes.getDescricao() != null) {
                    existingGrupoPermissoes.setDescricao(grupoPermissoes.getDescricao());
                }

                return existingGrupoPermissoes;
            })
            .map(grupoPermissoesRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, grupoPermissoes.getId().toString())
        );
    }

    /**
     * {@code GET  /grupo-permissoes} : get all the grupoPermissoes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of grupoPermissoes in body.
     */
    @GetMapping("/grupo-permissoes")
    public List<GrupoPermissoes> getAllGrupoPermissoes() {
        log.debug("REST request to get all GrupoPermissoes");
        return grupoPermissoesRepository.findAll();
    }

    /**
     * {@code GET  /grupo-permissoes/:id} : get the "id" grupoPermissoes.
     *
     * @param id the id of the grupoPermissoes to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the grupoPermissoes, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/grupo-permissoes/{id}")
    public ResponseEntity<GrupoPermissoes> getGrupoPermissoes(@PathVariable Long id) {
        log.debug("REST request to get GrupoPermissoes : {}", id);
        Optional<GrupoPermissoes> grupoPermissoes = grupoPermissoesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(grupoPermissoes);
    }

    /**
     * {@code DELETE  /grupo-permissoes/:id} : delete the "id" grupoPermissoes.
     *
     * @param id the id of the grupoPermissoes to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/grupo-permissoes/{id}")
    public ResponseEntity<Void> deleteGrupoPermissoes(@PathVariable Long id) {
        log.debug("REST request to delete GrupoPermissoes : {}", id);
        grupoPermissoesRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
