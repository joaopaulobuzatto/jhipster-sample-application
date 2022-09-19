package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.IpLiberado;
import com.mycompany.myapp.repository.IpLiberadoRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.IpLiberado}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class IpLiberadoResource {

    private final Logger log = LoggerFactory.getLogger(IpLiberadoResource.class);

    private static final String ENTITY_NAME = "ipLiberado";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final IpLiberadoRepository ipLiberadoRepository;

    public IpLiberadoResource(IpLiberadoRepository ipLiberadoRepository) {
        this.ipLiberadoRepository = ipLiberadoRepository;
    }

    /**
     * {@code POST  /ip-liberados} : Create a new ipLiberado.
     *
     * @param ipLiberado the ipLiberado to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ipLiberado, or with status {@code 400 (Bad Request)} if the ipLiberado has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ip-liberados")
    public ResponseEntity<IpLiberado> createIpLiberado(@Valid @RequestBody IpLiberado ipLiberado) throws URISyntaxException {
        log.debug("REST request to save IpLiberado : {}", ipLiberado);
        if (ipLiberado.getId() != null) {
            throw new BadRequestAlertException("A new ipLiberado cannot already have an ID", ENTITY_NAME, "idexists");
        }
        IpLiberado result = ipLiberadoRepository.save(ipLiberado);
        return ResponseEntity
            .created(new URI("/api/ip-liberados/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ip-liberados/:id} : Updates an existing ipLiberado.
     *
     * @param id the id of the ipLiberado to save.
     * @param ipLiberado the ipLiberado to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ipLiberado,
     * or with status {@code 400 (Bad Request)} if the ipLiberado is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ipLiberado couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ip-liberados/{id}")
    public ResponseEntity<IpLiberado> updateIpLiberado(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody IpLiberado ipLiberado
    ) throws URISyntaxException {
        log.debug("REST request to update IpLiberado : {}, {}", id, ipLiberado);
        if (ipLiberado.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, ipLiberado.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ipLiberadoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        IpLiberado result = ipLiberadoRepository.save(ipLiberado);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, ipLiberado.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /ip-liberados/:id} : Partial updates given fields of an existing ipLiberado, field will ignore if it is null
     *
     * @param id the id of the ipLiberado to save.
     * @param ipLiberado the ipLiberado to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ipLiberado,
     * or with status {@code 400 (Bad Request)} if the ipLiberado is not valid,
     * or with status {@code 404 (Not Found)} if the ipLiberado is not found,
     * or with status {@code 500 (Internal Server Error)} if the ipLiberado couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/ip-liberados/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<IpLiberado> partialUpdateIpLiberado(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody IpLiberado ipLiberado
    ) throws URISyntaxException {
        log.debug("REST request to partial update IpLiberado partially : {}, {}", id, ipLiberado);
        if (ipLiberado.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, ipLiberado.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ipLiberadoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<IpLiberado> result = ipLiberadoRepository
            .findById(ipLiberado.getId())
            .map(existingIpLiberado -> {
                if (ipLiberado.getCodigo() != null) {
                    existingIpLiberado.setCodigo(ipLiberado.getCodigo());
                }
                if (ipLiberado.getDataCriacao() != null) {
                    existingIpLiberado.setDataCriacao(ipLiberado.getDataCriacao());
                }
                if (ipLiberado.getDescricao() != null) {
                    existingIpLiberado.setDescricao(ipLiberado.getDescricao());
                }
                if (ipLiberado.getIpLiberado() != null) {
                    existingIpLiberado.setIpLiberado(ipLiberado.getIpLiberado());
                }

                return existingIpLiberado;
            })
            .map(ipLiberadoRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, ipLiberado.getId().toString())
        );
    }

    /**
     * {@code GET  /ip-liberados} : get all the ipLiberados.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ipLiberados in body.
     */
    @GetMapping("/ip-liberados")
    public List<IpLiberado> getAllIpLiberados() {
        log.debug("REST request to get all IpLiberados");
        return ipLiberadoRepository.findAll();
    }

    /**
     * {@code GET  /ip-liberados/:id} : get the "id" ipLiberado.
     *
     * @param id the id of the ipLiberado to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ipLiberado, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ip-liberados/{id}")
    public ResponseEntity<IpLiberado> getIpLiberado(@PathVariable Long id) {
        log.debug("REST request to get IpLiberado : {}", id);
        Optional<IpLiberado> ipLiberado = ipLiberadoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ipLiberado);
    }

    /**
     * {@code DELETE  /ip-liberados/:id} : delete the "id" ipLiberado.
     *
     * @param id the id of the ipLiberado to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ip-liberados/{id}")
    public ResponseEntity<Void> deleteIpLiberado(@PathVariable Long id) {
        log.debug("REST request to delete IpLiberado : {}", id);
        ipLiberadoRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
