package com.mycompany.myapp.web.rest;

import static com.mycompany.myapp.web.rest.TestUtil.sameNumber;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Servico;
import com.mycompany.myapp.repository.ServicoRepository;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link ServicoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ServicoResourceIT {

    private static final Long DEFAULT_CODIGO = 1L;
    private static final Long UPDATED_CODIGO = 2L;

    private static final Instant DEFAULT_DATA_CRIACAO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA_CRIACAO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ATIVO = false;
    private static final Boolean UPDATED_ATIVO = true;

    private static final BigDecimal DEFAULT_VALOR = new BigDecimal(1);
    private static final BigDecimal UPDATED_VALOR = new BigDecimal(2);

    private static final String ENTITY_API_URL = "/api/servicos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ServicoRepository servicoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restServicoMockMvc;

    private Servico servico;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Servico createEntity(EntityManager em) {
        Servico servico = new Servico()
            .codigo(DEFAULT_CODIGO)
            .dataCriacao(DEFAULT_DATA_CRIACAO)
            .descricao(DEFAULT_DESCRICAO)
            .ativo(DEFAULT_ATIVO)
            .valor(DEFAULT_VALOR);
        return servico;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Servico createUpdatedEntity(EntityManager em) {
        Servico servico = new Servico()
            .codigo(UPDATED_CODIGO)
            .dataCriacao(UPDATED_DATA_CRIACAO)
            .descricao(UPDATED_DESCRICAO)
            .ativo(UPDATED_ATIVO)
            .valor(UPDATED_VALOR);
        return servico;
    }

    @BeforeEach
    public void initTest() {
        servico = createEntity(em);
    }

    @Test
    @Transactional
    void createServico() throws Exception {
        int databaseSizeBeforeCreate = servicoRepository.findAll().size();
        // Create the Servico
        restServicoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(servico)))
            .andExpect(status().isCreated());

        // Validate the Servico in the database
        List<Servico> servicoList = servicoRepository.findAll();
        assertThat(servicoList).hasSize(databaseSizeBeforeCreate + 1);
        Servico testServico = servicoList.get(servicoList.size() - 1);
        assertThat(testServico.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testServico.getDataCriacao()).isEqualTo(DEFAULT_DATA_CRIACAO);
        assertThat(testServico.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
        assertThat(testServico.getAtivo()).isEqualTo(DEFAULT_ATIVO);
        assertThat(testServico.getValor()).isEqualByComparingTo(DEFAULT_VALOR);
    }

    @Test
    @Transactional
    void createServicoWithExistingId() throws Exception {
        // Create the Servico with an existing ID
        servico.setId(1L);

        int databaseSizeBeforeCreate = servicoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restServicoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(servico)))
            .andExpect(status().isBadRequest());

        // Validate the Servico in the database
        List<Servico> servicoList = servicoRepository.findAll();
        assertThat(servicoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkDataCriacaoIsRequired() throws Exception {
        int databaseSizeBeforeTest = servicoRepository.findAll().size();
        // set the field null
        servico.setDataCriacao(null);

        // Create the Servico, which fails.

        restServicoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(servico)))
            .andExpect(status().isBadRequest());

        List<Servico> servicoList = servicoRepository.findAll();
        assertThat(servicoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkAtivoIsRequired() throws Exception {
        int databaseSizeBeforeTest = servicoRepository.findAll().size();
        // set the field null
        servico.setAtivo(null);

        // Create the Servico, which fails.

        restServicoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(servico)))
            .andExpect(status().isBadRequest());

        List<Servico> servicoList = servicoRepository.findAll();
        assertThat(servicoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkValorIsRequired() throws Exception {
        int databaseSizeBeforeTest = servicoRepository.findAll().size();
        // set the field null
        servico.setValor(null);

        // Create the Servico, which fails.

        restServicoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(servico)))
            .andExpect(status().isBadRequest());

        List<Servico> servicoList = servicoRepository.findAll();
        assertThat(servicoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllServicos() throws Exception {
        // Initialize the database
        servicoRepository.saveAndFlush(servico);

        // Get all the servicoList
        restServicoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(servico.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO.intValue())))
            .andExpect(jsonPath("$.[*].dataCriacao").value(hasItem(DEFAULT_DATA_CRIACAO.toString())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)))
            .andExpect(jsonPath("$.[*].ativo").value(hasItem(DEFAULT_ATIVO.booleanValue())))
            .andExpect(jsonPath("$.[*].valor").value(hasItem(sameNumber(DEFAULT_VALOR))));
    }

    @Test
    @Transactional
    void getServico() throws Exception {
        // Initialize the database
        servicoRepository.saveAndFlush(servico);

        // Get the servico
        restServicoMockMvc
            .perform(get(ENTITY_API_URL_ID, servico.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(servico.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO.intValue()))
            .andExpect(jsonPath("$.dataCriacao").value(DEFAULT_DATA_CRIACAO.toString()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO))
            .andExpect(jsonPath("$.ativo").value(DEFAULT_ATIVO.booleanValue()))
            .andExpect(jsonPath("$.valor").value(sameNumber(DEFAULT_VALOR)));
    }

    @Test
    @Transactional
    void getNonExistingServico() throws Exception {
        // Get the servico
        restServicoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingServico() throws Exception {
        // Initialize the database
        servicoRepository.saveAndFlush(servico);

        int databaseSizeBeforeUpdate = servicoRepository.findAll().size();

        // Update the servico
        Servico updatedServico = servicoRepository.findById(servico.getId()).get();
        // Disconnect from session so that the updates on updatedServico are not directly saved in db
        em.detach(updatedServico);
        updatedServico
            .codigo(UPDATED_CODIGO)
            .dataCriacao(UPDATED_DATA_CRIACAO)
            .descricao(UPDATED_DESCRICAO)
            .ativo(UPDATED_ATIVO)
            .valor(UPDATED_VALOR);

        restServicoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedServico.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedServico))
            )
            .andExpect(status().isOk());

        // Validate the Servico in the database
        List<Servico> servicoList = servicoRepository.findAll();
        assertThat(servicoList).hasSize(databaseSizeBeforeUpdate);
        Servico testServico = servicoList.get(servicoList.size() - 1);
        assertThat(testServico.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testServico.getDataCriacao()).isEqualTo(UPDATED_DATA_CRIACAO);
        assertThat(testServico.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testServico.getAtivo()).isEqualTo(UPDATED_ATIVO);
        assertThat(testServico.getValor()).isEqualByComparingTo(UPDATED_VALOR);
    }

    @Test
    @Transactional
    void putNonExistingServico() throws Exception {
        int databaseSizeBeforeUpdate = servicoRepository.findAll().size();
        servico.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restServicoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, servico.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(servico))
            )
            .andExpect(status().isBadRequest());

        // Validate the Servico in the database
        List<Servico> servicoList = servicoRepository.findAll();
        assertThat(servicoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchServico() throws Exception {
        int databaseSizeBeforeUpdate = servicoRepository.findAll().size();
        servico.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restServicoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(servico))
            )
            .andExpect(status().isBadRequest());

        // Validate the Servico in the database
        List<Servico> servicoList = servicoRepository.findAll();
        assertThat(servicoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamServico() throws Exception {
        int databaseSizeBeforeUpdate = servicoRepository.findAll().size();
        servico.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restServicoMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(servico)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Servico in the database
        List<Servico> servicoList = servicoRepository.findAll();
        assertThat(servicoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateServicoWithPatch() throws Exception {
        // Initialize the database
        servicoRepository.saveAndFlush(servico);

        int databaseSizeBeforeUpdate = servicoRepository.findAll().size();

        // Update the servico using partial update
        Servico partialUpdatedServico = new Servico();
        partialUpdatedServico.setId(servico.getId());

        partialUpdatedServico.dataCriacao(UPDATED_DATA_CRIACAO).descricao(UPDATED_DESCRICAO).ativo(UPDATED_ATIVO).valor(UPDATED_VALOR);

        restServicoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedServico.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedServico))
            )
            .andExpect(status().isOk());

        // Validate the Servico in the database
        List<Servico> servicoList = servicoRepository.findAll();
        assertThat(servicoList).hasSize(databaseSizeBeforeUpdate);
        Servico testServico = servicoList.get(servicoList.size() - 1);
        assertThat(testServico.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testServico.getDataCriacao()).isEqualTo(UPDATED_DATA_CRIACAO);
        assertThat(testServico.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testServico.getAtivo()).isEqualTo(UPDATED_ATIVO);
        assertThat(testServico.getValor()).isEqualByComparingTo(UPDATED_VALOR);
    }

    @Test
    @Transactional
    void fullUpdateServicoWithPatch() throws Exception {
        // Initialize the database
        servicoRepository.saveAndFlush(servico);

        int databaseSizeBeforeUpdate = servicoRepository.findAll().size();

        // Update the servico using partial update
        Servico partialUpdatedServico = new Servico();
        partialUpdatedServico.setId(servico.getId());

        partialUpdatedServico
            .codigo(UPDATED_CODIGO)
            .dataCriacao(UPDATED_DATA_CRIACAO)
            .descricao(UPDATED_DESCRICAO)
            .ativo(UPDATED_ATIVO)
            .valor(UPDATED_VALOR);

        restServicoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedServico.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedServico))
            )
            .andExpect(status().isOk());

        // Validate the Servico in the database
        List<Servico> servicoList = servicoRepository.findAll();
        assertThat(servicoList).hasSize(databaseSizeBeforeUpdate);
        Servico testServico = servicoList.get(servicoList.size() - 1);
        assertThat(testServico.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testServico.getDataCriacao()).isEqualTo(UPDATED_DATA_CRIACAO);
        assertThat(testServico.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testServico.getAtivo()).isEqualTo(UPDATED_ATIVO);
        assertThat(testServico.getValor()).isEqualByComparingTo(UPDATED_VALOR);
    }

    @Test
    @Transactional
    void patchNonExistingServico() throws Exception {
        int databaseSizeBeforeUpdate = servicoRepository.findAll().size();
        servico.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restServicoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, servico.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(servico))
            )
            .andExpect(status().isBadRequest());

        // Validate the Servico in the database
        List<Servico> servicoList = servicoRepository.findAll();
        assertThat(servicoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchServico() throws Exception {
        int databaseSizeBeforeUpdate = servicoRepository.findAll().size();
        servico.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restServicoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(servico))
            )
            .andExpect(status().isBadRequest());

        // Validate the Servico in the database
        List<Servico> servicoList = servicoRepository.findAll();
        assertThat(servicoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamServico() throws Exception {
        int databaseSizeBeforeUpdate = servicoRepository.findAll().size();
        servico.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restServicoMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(servico)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Servico in the database
        List<Servico> servicoList = servicoRepository.findAll();
        assertThat(servicoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteServico() throws Exception {
        // Initialize the database
        servicoRepository.saveAndFlush(servico);

        int databaseSizeBeforeDelete = servicoRepository.findAll().size();

        // Delete the servico
        restServicoMockMvc
            .perform(delete(ENTITY_API_URL_ID, servico.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Servico> servicoList = servicoRepository.findAll();
        assertThat(servicoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
