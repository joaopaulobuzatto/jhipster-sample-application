package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Licenca;
import com.mycompany.myapp.repository.LicencaRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Licenca}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class LicencaResource {

    private final Logger log = LoggerFactory.getLogger(LicencaResource.class);

    private static final String ENTITY_NAME = "licenca";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LicencaRepository licencaRepository;

    public LicencaResource(LicencaRepository licencaRepository) {
        this.licencaRepository = licencaRepository;
    }

    /**
     * {@code POST  /licencas} : Create a new licenca.
     *
     * @param licenca the licenca to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new licenca, or with status {@code 400 (Bad Request)} if the licenca has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/licencas")
    public ResponseEntity<Licenca> createLicenca(@Valid @RequestBody Licenca licenca) throws URISyntaxException {
        log.debug("REST request to save Licenca : {}", licenca);
        if (licenca.getId() != null) {
            throw new BadRequestAlertException("A new licenca cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Licenca result = licencaRepository.save(licenca);
        return ResponseEntity
            .created(new URI("/api/licencas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /licencas/:id} : Updates an existing licenca.
     *
     * @param id the id of the licenca to save.
     * @param licenca the licenca to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated licenca,
     * or with status {@code 400 (Bad Request)} if the licenca is not valid,
     * or with status {@code 500 (Internal Server Error)} if the licenca couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/licencas/{id}")
    public ResponseEntity<Licenca> updateLicenca(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Licenca licenca
    ) throws URISyntaxException {
        log.debug("REST request to update Licenca : {}, {}", id, licenca);
        if (licenca.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, licenca.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!licencaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Licenca result = licencaRepository.save(licenca);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, licenca.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /licencas/:id} : Partial updates given fields of an existing licenca, field will ignore if it is null
     *
     * @param id the id of the licenca to save.
     * @param licenca the licenca to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated licenca,
     * or with status {@code 400 (Bad Request)} if the licenca is not valid,
     * or with status {@code 404 (Not Found)} if the licenca is not found,
     * or with status {@code 500 (Internal Server Error)} if the licenca couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/licencas/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Licenca> partialUpdateLicenca(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Licenca licenca
    ) throws URISyntaxException {
        log.debug("REST request to partial update Licenca partially : {}, {}", id, licenca);
        if (licenca.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, licenca.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!licencaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Licenca> result = licencaRepository
            .findById(licenca.getId())
            .map(existingLicenca -> {
                if (licenca.getCodigo() != null) {
                    existingLicenca.setCodigo(licenca.getCodigo());
                }
                if (licenca.getDataCriacao() != null) {
                    existingLicenca.setDataCriacao(licenca.getDataCriacao());
                }
                if (licenca.getDataInicioUtilizacao() != null) {
                    existingLicenca.setDataInicioUtilizacao(licenca.getDataInicioUtilizacao());
                }
                if (licenca.getDataInicioFaturamento() != null) {
                    existingLicenca.setDataInicioFaturamento(licenca.getDataInicioFaturamento());
                }
                if (licenca.getDataPrimeiroVencimentoBoleto() != null) {
                    existingLicenca.setDataPrimeiroVencimentoBoleto(licenca.getDataPrimeiroVencimentoBoleto());
                }
                if (licenca.getDiaVencimentoBoleto() != null) {
                    existingLicenca.setDiaVencimentoBoleto(licenca.getDiaVencimentoBoleto());
                }
                if (licenca.getProdutosContratados() != null) {
                    existingLicenca.setProdutosContratados(licenca.getProdutosContratados());
                }
                if (licenca.getValoresNegociados() != null) {
                    existingLicenca.setValoresNegociados(licenca.getValoresNegociados());
                }
                if (licenca.getContratacaoBloqueioIps() != null) {
                    existingLicenca.setContratacaoBloqueioIps(licenca.getContratacaoBloqueioIps());
                }
                if (licenca.getContratacaoEmailProposta() != null) {
                    existingLicenca.setContratacaoEmailProposta(licenca.getContratacaoEmailProposta());
                }
                if (licenca.getCriarPedido() != null) {
                    existingLicenca.setCriarPedido(licenca.getCriarPedido());
                }
                if (licenca.getCriarNegociacoes() != null) {
                    existingLicenca.setCriarNegociacoes(licenca.getCriarNegociacoes());
                }
                if (licenca.getSincronizarDadosCadastroCliente() != null) {
                    existingLicenca.setSincronizarDadosCadastroCliente(licenca.getSincronizarDadosCadastroCliente());
                }
                if (licenca.getSincronizarDadosCarteiraCliente() != null) {
                    existingLicenca.setSincronizarDadosCarteiraCliente(licenca.getSincronizarDadosCarteiraCliente());
                }
                if (licenca.getBloqueioAcesso() != null) {
                    existingLicenca.setBloqueioAcesso(licenca.getBloqueioAcesso());
                }
                if (licenca.getDataBloqueioAcesso() != null) {
                    existingLicenca.setDataBloqueioAcesso(licenca.getDataBloqueioAcesso());
                }
                if (licenca.getMotivoBloqueioAcesso() != null) {
                    existingLicenca.setMotivoBloqueioAcesso(licenca.getMotivoBloqueioAcesso());
                }
                if (licenca.getMensagemBloqueioAcesso() != null) {
                    existingLicenca.setMensagemBloqueioAcesso(licenca.getMensagemBloqueioAcesso());
                }

                return existingLicenca;
            })
            .map(licencaRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, licenca.getId().toString())
        );
    }

    /**
     * {@code GET  /licencas} : get all the licencas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of licencas in body.
     */
    @GetMapping("/licencas")
    public List<Licenca> getAllLicencas() {
        log.debug("REST request to get all Licencas");
        return licencaRepository.findAll();
    }

    /**
     * {@code GET  /licencas/:id} : get the "id" licenca.
     *
     * @param id the id of the licenca to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the licenca, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/licencas/{id}")
    public ResponseEntity<Licenca> getLicenca(@PathVariable Long id) {
        log.debug("REST request to get Licenca : {}", id);
        Optional<Licenca> licenca = licencaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(licenca);
    }

    /**
     * {@code DELETE  /licencas/:id} : delete the "id" licenca.
     *
     * @param id the id of the licenca to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/licencas/{id}")
    public ResponseEntity<Void> deleteLicenca(@PathVariable Long id) {
        log.debug("REST request to delete Licenca : {}", id);
        licencaRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
