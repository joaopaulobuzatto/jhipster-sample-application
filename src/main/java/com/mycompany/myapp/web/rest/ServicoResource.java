package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Servico;
import com.mycompany.myapp.repository.ServicoRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Servico}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ServicoResource {

    private final Logger log = LoggerFactory.getLogger(ServicoResource.class);

    private static final String ENTITY_NAME = "servico";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ServicoRepository servicoRepository;

    public ServicoResource(ServicoRepository servicoRepository) {
        this.servicoRepository = servicoRepository;
    }

    /**
     * {@code POST  /servicos} : Create a new servico.
     *
     * @param servico the servico to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new servico, or with status {@code 400 (Bad Request)} if the servico has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/servicos")
    public ResponseEntity<Servico> createServico(@Valid @RequestBody Servico servico) throws URISyntaxException {
        log.debug("REST request to save Servico : {}", servico);
        if (servico.getId() != null) {
            throw new BadRequestAlertException("A new servico cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Servico result = servicoRepository.save(servico);
        return ResponseEntity
            .created(new URI("/api/servicos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /servicos/:id} : Updates an existing servico.
     *
     * @param id the id of the servico to save.
     * @param servico the servico to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated servico,
     * or with status {@code 400 (Bad Request)} if the servico is not valid,
     * or with status {@code 500 (Internal Server Error)} if the servico couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/servicos/{id}")
    public ResponseEntity<Servico> updateServico(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Servico servico
    ) throws URISyntaxException {
        log.debug("REST request to update Servico : {}, {}", id, servico);
        if (servico.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, servico.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!servicoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Servico result = servicoRepository.save(servico);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, servico.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /servicos/:id} : Partial updates given fields of an existing servico, field will ignore if it is null
     *
     * @param id the id of the servico to save.
     * @param servico the servico to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated servico,
     * or with status {@code 400 (Bad Request)} if the servico is not valid,
     * or with status {@code 404 (Not Found)} if the servico is not found,
     * or with status {@code 500 (Internal Server Error)} if the servico couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/servicos/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Servico> partialUpdateServico(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Servico servico
    ) throws URISyntaxException {
        log.debug("REST request to partial update Servico partially : {}, {}", id, servico);
        if (servico.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, servico.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!servicoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Servico> result = servicoRepository
            .findById(servico.getId())
            .map(existingServico -> {
                if (servico.getCodigo() != null) {
                    existingServico.setCodigo(servico.getCodigo());
                }
                if (servico.getDataCriacao() != null) {
                    existingServico.setDataCriacao(servico.getDataCriacao());
                }
                if (servico.getDescricao() != null) {
                    existingServico.setDescricao(servico.getDescricao());
                }
                if (servico.getAtivo() != null) {
                    existingServico.setAtivo(servico.getAtivo());
                }
                if (servico.getValor() != null) {
                    existingServico.setValor(servico.getValor());
                }

                return existingServico;
            })
            .map(servicoRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, servico.getId().toString())
        );
    }

    /**
     * {@code GET  /servicos} : get all the servicos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of servicos in body.
     */
    @GetMapping("/servicos")
    public List<Servico> getAllServicos() {
        log.debug("REST request to get all Servicos");
        return servicoRepository.findAll();
    }

    /**
     * {@code GET  /servicos/:id} : get the "id" servico.
     *
     * @param id the id of the servico to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the servico, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/servicos/{id}")
    public ResponseEntity<Servico> getServico(@PathVariable Long id) {
        log.debug("REST request to get Servico : {}", id);
        Optional<Servico> servico = servicoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(servico);
    }

    /**
     * {@code DELETE  /servicos/:id} : delete the "id" servico.
     *
     * @param id the id of the servico to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/servicos/{id}")
    public ResponseEntity<Void> deleteServico(@PathVariable Long id) {
        log.debug("REST request to delete Servico : {}", id);
        servicoRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
