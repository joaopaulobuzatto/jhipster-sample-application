package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.UsuarioGrupoPermissoes;
import com.mycompany.myapp.repository.UsuarioGrupoPermissoesRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.UsuarioGrupoPermissoes}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class UsuarioGrupoPermissoesResource {

    private final Logger log = LoggerFactory.getLogger(UsuarioGrupoPermissoesResource.class);

    private static final String ENTITY_NAME = "usuarioGrupoPermissoes";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UsuarioGrupoPermissoesRepository usuarioGrupoPermissoesRepository;

    public UsuarioGrupoPermissoesResource(UsuarioGrupoPermissoesRepository usuarioGrupoPermissoesRepository) {
        this.usuarioGrupoPermissoesRepository = usuarioGrupoPermissoesRepository;
    }

    /**
     * {@code POST  /usuario-grupo-permissoes} : Create a new usuarioGrupoPermissoes.
     *
     * @param usuarioGrupoPermissoes the usuarioGrupoPermissoes to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new usuarioGrupoPermissoes, or with status {@code 400 (Bad Request)} if the usuarioGrupoPermissoes has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/usuario-grupo-permissoes")
    public ResponseEntity<UsuarioGrupoPermissoes> createUsuarioGrupoPermissoes(@RequestBody UsuarioGrupoPermissoes usuarioGrupoPermissoes)
        throws URISyntaxException {
        log.debug("REST request to save UsuarioGrupoPermissoes : {}", usuarioGrupoPermissoes);
        if (usuarioGrupoPermissoes.getId() != null) {
            throw new BadRequestAlertException("A new usuarioGrupoPermissoes cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UsuarioGrupoPermissoes result = usuarioGrupoPermissoesRepository.save(usuarioGrupoPermissoes);
        return ResponseEntity
            .created(new URI("/api/usuario-grupo-permissoes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /usuario-grupo-permissoes/:id} : Updates an existing usuarioGrupoPermissoes.
     *
     * @param id the id of the usuarioGrupoPermissoes to save.
     * @param usuarioGrupoPermissoes the usuarioGrupoPermissoes to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated usuarioGrupoPermissoes,
     * or with status {@code 400 (Bad Request)} if the usuarioGrupoPermissoes is not valid,
     * or with status {@code 500 (Internal Server Error)} if the usuarioGrupoPermissoes couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/usuario-grupo-permissoes/{id}")
    public ResponseEntity<UsuarioGrupoPermissoes> updateUsuarioGrupoPermissoes(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody UsuarioGrupoPermissoes usuarioGrupoPermissoes
    ) throws URISyntaxException {
        log.debug("REST request to update UsuarioGrupoPermissoes : {}, {}", id, usuarioGrupoPermissoes);
        if (usuarioGrupoPermissoes.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, usuarioGrupoPermissoes.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!usuarioGrupoPermissoesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        UsuarioGrupoPermissoes result = usuarioGrupoPermissoesRepository.save(usuarioGrupoPermissoes);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, usuarioGrupoPermissoes.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /usuario-grupo-permissoes/:id} : Partial updates given fields of an existing usuarioGrupoPermissoes, field will ignore if it is null
     *
     * @param id the id of the usuarioGrupoPermissoes to save.
     * @param usuarioGrupoPermissoes the usuarioGrupoPermissoes to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated usuarioGrupoPermissoes,
     * or with status {@code 400 (Bad Request)} if the usuarioGrupoPermissoes is not valid,
     * or with status {@code 404 (Not Found)} if the usuarioGrupoPermissoes is not found,
     * or with status {@code 500 (Internal Server Error)} if the usuarioGrupoPermissoes couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/usuario-grupo-permissoes/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<UsuarioGrupoPermissoes> partialUpdateUsuarioGrupoPermissoes(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody UsuarioGrupoPermissoes usuarioGrupoPermissoes
    ) throws URISyntaxException {
        log.debug("REST request to partial update UsuarioGrupoPermissoes partially : {}, {}", id, usuarioGrupoPermissoes);
        if (usuarioGrupoPermissoes.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, usuarioGrupoPermissoes.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!usuarioGrupoPermissoesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<UsuarioGrupoPermissoes> result = usuarioGrupoPermissoesRepository
            .findById(usuarioGrupoPermissoes.getId())
            .map(existingUsuarioGrupoPermissoes -> {
                return existingUsuarioGrupoPermissoes;
            })
            .map(usuarioGrupoPermissoesRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, usuarioGrupoPermissoes.getId().toString())
        );
    }

    /**
     * {@code GET  /usuario-grupo-permissoes} : get all the usuarioGrupoPermissoes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of usuarioGrupoPermissoes in body.
     */
    @GetMapping("/usuario-grupo-permissoes")
    public List<UsuarioGrupoPermissoes> getAllUsuarioGrupoPermissoes() {
        log.debug("REST request to get all UsuarioGrupoPermissoes");
        return usuarioGrupoPermissoesRepository.findAll();
    }

    /**
     * {@code GET  /usuario-grupo-permissoes/:id} : get the "id" usuarioGrupoPermissoes.
     *
     * @param id the id of the usuarioGrupoPermissoes to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the usuarioGrupoPermissoes, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/usuario-grupo-permissoes/{id}")
    public ResponseEntity<UsuarioGrupoPermissoes> getUsuarioGrupoPermissoes(@PathVariable Long id) {
        log.debug("REST request to get UsuarioGrupoPermissoes : {}", id);
        Optional<UsuarioGrupoPermissoes> usuarioGrupoPermissoes = usuarioGrupoPermissoesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(usuarioGrupoPermissoes);
    }

    /**
     * {@code DELETE  /usuario-grupo-permissoes/:id} : delete the "id" usuarioGrupoPermissoes.
     *
     * @param id the id of the usuarioGrupoPermissoes to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/usuario-grupo-permissoes/{id}")
    public ResponseEntity<Void> deleteUsuarioGrupoPermissoes(@PathVariable Long id) {
        log.debug("REST request to delete UsuarioGrupoPermissoes : {}", id);
        usuarioGrupoPermissoesRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
