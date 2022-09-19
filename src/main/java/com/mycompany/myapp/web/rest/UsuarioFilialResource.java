package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.UsuarioFilial;
import com.mycompany.myapp.repository.UsuarioFilialRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.UsuarioFilial}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class UsuarioFilialResource {

    private final Logger log = LoggerFactory.getLogger(UsuarioFilialResource.class);

    private static final String ENTITY_NAME = "usuarioFilial";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UsuarioFilialRepository usuarioFilialRepository;

    public UsuarioFilialResource(UsuarioFilialRepository usuarioFilialRepository) {
        this.usuarioFilialRepository = usuarioFilialRepository;
    }

    /**
     * {@code POST  /usuario-filials} : Create a new usuarioFilial.
     *
     * @param usuarioFilial the usuarioFilial to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new usuarioFilial, or with status {@code 400 (Bad Request)} if the usuarioFilial has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/usuario-filials")
    public ResponseEntity<UsuarioFilial> createUsuarioFilial(@RequestBody UsuarioFilial usuarioFilial) throws URISyntaxException {
        log.debug("REST request to save UsuarioFilial : {}", usuarioFilial);
        if (usuarioFilial.getId() != null) {
            throw new BadRequestAlertException("A new usuarioFilial cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UsuarioFilial result = usuarioFilialRepository.save(usuarioFilial);
        return ResponseEntity
            .created(new URI("/api/usuario-filials/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /usuario-filials/:id} : Updates an existing usuarioFilial.
     *
     * @param id the id of the usuarioFilial to save.
     * @param usuarioFilial the usuarioFilial to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated usuarioFilial,
     * or with status {@code 400 (Bad Request)} if the usuarioFilial is not valid,
     * or with status {@code 500 (Internal Server Error)} if the usuarioFilial couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/usuario-filials/{id}")
    public ResponseEntity<UsuarioFilial> updateUsuarioFilial(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody UsuarioFilial usuarioFilial
    ) throws URISyntaxException {
        log.debug("REST request to update UsuarioFilial : {}, {}", id, usuarioFilial);
        if (usuarioFilial.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, usuarioFilial.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!usuarioFilialRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        UsuarioFilial result = usuarioFilialRepository.save(usuarioFilial);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, usuarioFilial.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /usuario-filials/:id} : Partial updates given fields of an existing usuarioFilial, field will ignore if it is null
     *
     * @param id the id of the usuarioFilial to save.
     * @param usuarioFilial the usuarioFilial to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated usuarioFilial,
     * or with status {@code 400 (Bad Request)} if the usuarioFilial is not valid,
     * or with status {@code 404 (Not Found)} if the usuarioFilial is not found,
     * or with status {@code 500 (Internal Server Error)} if the usuarioFilial couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/usuario-filials/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<UsuarioFilial> partialUpdateUsuarioFilial(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody UsuarioFilial usuarioFilial
    ) throws URISyntaxException {
        log.debug("REST request to partial update UsuarioFilial partially : {}, {}", id, usuarioFilial);
        if (usuarioFilial.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, usuarioFilial.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!usuarioFilialRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<UsuarioFilial> result = usuarioFilialRepository
            .findById(usuarioFilial.getId())
            .map(existingUsuarioFilial -> {
                return existingUsuarioFilial;
            })
            .map(usuarioFilialRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, usuarioFilial.getId().toString())
        );
    }

    /**
     * {@code GET  /usuario-filials} : get all the usuarioFilials.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of usuarioFilials in body.
     */
    @GetMapping("/usuario-filials")
    public List<UsuarioFilial> getAllUsuarioFilials() {
        log.debug("REST request to get all UsuarioFilials");
        return usuarioFilialRepository.findAll();
    }

    /**
     * {@code GET  /usuario-filials/:id} : get the "id" usuarioFilial.
     *
     * @param id the id of the usuarioFilial to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the usuarioFilial, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/usuario-filials/{id}")
    public ResponseEntity<UsuarioFilial> getUsuarioFilial(@PathVariable Long id) {
        log.debug("REST request to get UsuarioFilial : {}", id);
        Optional<UsuarioFilial> usuarioFilial = usuarioFilialRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(usuarioFilial);
    }

    /**
     * {@code DELETE  /usuario-filials/:id} : delete the "id" usuarioFilial.
     *
     * @param id the id of the usuarioFilial to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/usuario-filials/{id}")
    public ResponseEntity<Void> deleteUsuarioFilial(@PathVariable Long id) {
        log.debug("REST request to delete UsuarioFilial : {}", id);
        usuarioFilialRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
