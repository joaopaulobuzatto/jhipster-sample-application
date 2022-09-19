package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.UsuarioIpLiberado;
import com.mycompany.myapp.repository.UsuarioIpLiberadoRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.UsuarioIpLiberado}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class UsuarioIpLiberadoResource {

    private final Logger log = LoggerFactory.getLogger(UsuarioIpLiberadoResource.class);

    private static final String ENTITY_NAME = "usuarioIpLiberado";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UsuarioIpLiberadoRepository usuarioIpLiberadoRepository;

    public UsuarioIpLiberadoResource(UsuarioIpLiberadoRepository usuarioIpLiberadoRepository) {
        this.usuarioIpLiberadoRepository = usuarioIpLiberadoRepository;
    }

    /**
     * {@code POST  /usuario-ip-liberados} : Create a new usuarioIpLiberado.
     *
     * @param usuarioIpLiberado the usuarioIpLiberado to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new usuarioIpLiberado, or with status {@code 400 (Bad Request)} if the usuarioIpLiberado has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/usuario-ip-liberados")
    public ResponseEntity<UsuarioIpLiberado> createUsuarioIpLiberado(@RequestBody UsuarioIpLiberado usuarioIpLiberado)
        throws URISyntaxException {
        log.debug("REST request to save UsuarioIpLiberado : {}", usuarioIpLiberado);
        if (usuarioIpLiberado.getId() != null) {
            throw new BadRequestAlertException("A new usuarioIpLiberado cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UsuarioIpLiberado result = usuarioIpLiberadoRepository.save(usuarioIpLiberado);
        return ResponseEntity
            .created(new URI("/api/usuario-ip-liberados/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /usuario-ip-liberados/:id} : Updates an existing usuarioIpLiberado.
     *
     * @param id the id of the usuarioIpLiberado to save.
     * @param usuarioIpLiberado the usuarioIpLiberado to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated usuarioIpLiberado,
     * or with status {@code 400 (Bad Request)} if the usuarioIpLiberado is not valid,
     * or with status {@code 500 (Internal Server Error)} if the usuarioIpLiberado couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/usuario-ip-liberados/{id}")
    public ResponseEntity<UsuarioIpLiberado> updateUsuarioIpLiberado(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody UsuarioIpLiberado usuarioIpLiberado
    ) throws URISyntaxException {
        log.debug("REST request to update UsuarioIpLiberado : {}, {}", id, usuarioIpLiberado);
        if (usuarioIpLiberado.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, usuarioIpLiberado.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!usuarioIpLiberadoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        UsuarioIpLiberado result = usuarioIpLiberadoRepository.save(usuarioIpLiberado);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, usuarioIpLiberado.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /usuario-ip-liberados/:id} : Partial updates given fields of an existing usuarioIpLiberado, field will ignore if it is null
     *
     * @param id the id of the usuarioIpLiberado to save.
     * @param usuarioIpLiberado the usuarioIpLiberado to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated usuarioIpLiberado,
     * or with status {@code 400 (Bad Request)} if the usuarioIpLiberado is not valid,
     * or with status {@code 404 (Not Found)} if the usuarioIpLiberado is not found,
     * or with status {@code 500 (Internal Server Error)} if the usuarioIpLiberado couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/usuario-ip-liberados/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<UsuarioIpLiberado> partialUpdateUsuarioIpLiberado(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody UsuarioIpLiberado usuarioIpLiberado
    ) throws URISyntaxException {
        log.debug("REST request to partial update UsuarioIpLiberado partially : {}, {}", id, usuarioIpLiberado);
        if (usuarioIpLiberado.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, usuarioIpLiberado.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!usuarioIpLiberadoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<UsuarioIpLiberado> result = usuarioIpLiberadoRepository
            .findById(usuarioIpLiberado.getId())
            .map(existingUsuarioIpLiberado -> {
                return existingUsuarioIpLiberado;
            })
            .map(usuarioIpLiberadoRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, usuarioIpLiberado.getId().toString())
        );
    }

    /**
     * {@code GET  /usuario-ip-liberados} : get all the usuarioIpLiberados.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of usuarioIpLiberados in body.
     */
    @GetMapping("/usuario-ip-liberados")
    public List<UsuarioIpLiberado> getAllUsuarioIpLiberados() {
        log.debug("REST request to get all UsuarioIpLiberados");
        return usuarioIpLiberadoRepository.findAll();
    }

    /**
     * {@code GET  /usuario-ip-liberados/:id} : get the "id" usuarioIpLiberado.
     *
     * @param id the id of the usuarioIpLiberado to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the usuarioIpLiberado, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/usuario-ip-liberados/{id}")
    public ResponseEntity<UsuarioIpLiberado> getUsuarioIpLiberado(@PathVariable Long id) {
        log.debug("REST request to get UsuarioIpLiberado : {}", id);
        Optional<UsuarioIpLiberado> usuarioIpLiberado = usuarioIpLiberadoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(usuarioIpLiberado);
    }

    /**
     * {@code DELETE  /usuario-ip-liberados/:id} : delete the "id" usuarioIpLiberado.
     *
     * @param id the id of the usuarioIpLiberado to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/usuario-ip-liberados/{id}")
    public ResponseEntity<Void> deleteUsuarioIpLiberado(@PathVariable Long id) {
        log.debug("REST request to delete UsuarioIpLiberado : {}", id);
        usuarioIpLiberadoRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
