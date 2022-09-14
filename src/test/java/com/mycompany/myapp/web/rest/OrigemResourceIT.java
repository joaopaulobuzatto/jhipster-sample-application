package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Origem;
import com.mycompany.myapp.domain.enumeration.TipoOrigem;
import com.mycompany.myapp.repository.OrigemRepository;
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
 * Integration tests for the {@link OrigemResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class OrigemResourceIT {

    private static final Long DEFAULT_CODIGO = 1L;
    private static final Long UPDATED_CODIGO = 2L;

    private static final Instant DEFAULT_DATA_CRIACAO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA_CRIACAO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    private static final TipoOrigem DEFAULT_TIPO = TipoOrigem.CLIENTE;
    private static final TipoOrigem UPDATED_TIPO = TipoOrigem.LEAD;

    private static final String ENTITY_API_URL = "/api/origems";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private OrigemRepository origemRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restOrigemMockMvc;

    private Origem origem;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Origem createEntity(EntityManager em) {
        Origem origem = new Origem()
            .codigo(DEFAULT_CODIGO)
            .dataCriacao(DEFAULT_DATA_CRIACAO)
            .descricao(DEFAULT_DESCRICAO)
            .tipo(DEFAULT_TIPO);
        return origem;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Origem createUpdatedEntity(EntityManager em) {
        Origem origem = new Origem()
            .codigo(UPDATED_CODIGO)
            .dataCriacao(UPDATED_DATA_CRIACAO)
            .descricao(UPDATED_DESCRICAO)
            .tipo(UPDATED_TIPO);
        return origem;
    }

    @BeforeEach
    public void initTest() {
        origem = createEntity(em);
    }

    @Test
    @Transactional
    void createOrigem() throws Exception {
        int databaseSizeBeforeCreate = origemRepository.findAll().size();
        // Create the Origem
        restOrigemMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(origem)))
            .andExpect(status().isCreated());

        // Validate the Origem in the database
        List<Origem> origemList = origemRepository.findAll();
        assertThat(origemList).hasSize(databaseSizeBeforeCreate + 1);
        Origem testOrigem = origemList.get(origemList.size() - 1);
        assertThat(testOrigem.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testOrigem.getDataCriacao()).isEqualTo(DEFAULT_DATA_CRIACAO);
        assertThat(testOrigem.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
        assertThat(testOrigem.getTipo()).isEqualTo(DEFAULT_TIPO);
    }

    @Test
    @Transactional
    void createOrigemWithExistingId() throws Exception {
        // Create the Origem with an existing ID
        origem.setId(1L);

        int databaseSizeBeforeCreate = origemRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrigemMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(origem)))
            .andExpect(status().isBadRequest());

        // Validate the Origem in the database
        List<Origem> origemList = origemRepository.findAll();
        assertThat(origemList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkDataCriacaoIsRequired() throws Exception {
        int databaseSizeBeforeTest = origemRepository.findAll().size();
        // set the field null
        origem.setDataCriacao(null);

        // Create the Origem, which fails.

        restOrigemMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(origem)))
            .andExpect(status().isBadRequest());

        List<Origem> origemList = origemRepository.findAll();
        assertThat(origemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkDescricaoIsRequired() throws Exception {
        int databaseSizeBeforeTest = origemRepository.findAll().size();
        // set the field null
        origem.setDescricao(null);

        // Create the Origem, which fails.

        restOrigemMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(origem)))
            .andExpect(status().isBadRequest());

        List<Origem> origemList = origemRepository.findAll();
        assertThat(origemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkTipoIsRequired() throws Exception {
        int databaseSizeBeforeTest = origemRepository.findAll().size();
        // set the field null
        origem.setTipo(null);

        // Create the Origem, which fails.

        restOrigemMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(origem)))
            .andExpect(status().isBadRequest());

        List<Origem> origemList = origemRepository.findAll();
        assertThat(origemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllOrigems() throws Exception {
        // Initialize the database
        origemRepository.saveAndFlush(origem);

        // Get all the origemList
        restOrigemMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(origem.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO.intValue())))
            .andExpect(jsonPath("$.[*].dataCriacao").value(hasItem(DEFAULT_DATA_CRIACAO.toString())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO.toString())));
    }

    @Test
    @Transactional
    void getOrigem() throws Exception {
        // Initialize the database
        origemRepository.saveAndFlush(origem);

        // Get the origem
        restOrigemMockMvc
            .perform(get(ENTITY_API_URL_ID, origem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(origem.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO.intValue()))
            .andExpect(jsonPath("$.dataCriacao").value(DEFAULT_DATA_CRIACAO.toString()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO.toString()));
    }

    @Test
    @Transactional
    void getNonExistingOrigem() throws Exception {
        // Get the origem
        restOrigemMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingOrigem() throws Exception {
        // Initialize the database
        origemRepository.saveAndFlush(origem);

        int databaseSizeBeforeUpdate = origemRepository.findAll().size();

        // Update the origem
        Origem updatedOrigem = origemRepository.findById(origem.getId()).get();
        // Disconnect from session so that the updates on updatedOrigem are not directly saved in db
        em.detach(updatedOrigem);
        updatedOrigem.codigo(UPDATED_CODIGO).dataCriacao(UPDATED_DATA_CRIACAO).descricao(UPDATED_DESCRICAO).tipo(UPDATED_TIPO);

        restOrigemMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedOrigem.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedOrigem))
            )
            .andExpect(status().isOk());

        // Validate the Origem in the database
        List<Origem> origemList = origemRepository.findAll();
        assertThat(origemList).hasSize(databaseSizeBeforeUpdate);
        Origem testOrigem = origemList.get(origemList.size() - 1);
        assertThat(testOrigem.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testOrigem.getDataCriacao()).isEqualTo(UPDATED_DATA_CRIACAO);
        assertThat(testOrigem.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testOrigem.getTipo()).isEqualTo(UPDATED_TIPO);
    }

    @Test
    @Transactional
    void putNonExistingOrigem() throws Exception {
        int databaseSizeBeforeUpdate = origemRepository.findAll().size();
        origem.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOrigemMockMvc
            .perform(
                put(ENTITY_API_URL_ID, origem.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(origem))
            )
            .andExpect(status().isBadRequest());

        // Validate the Origem in the database
        List<Origem> origemList = origemRepository.findAll();
        assertThat(origemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchOrigem() throws Exception {
        int databaseSizeBeforeUpdate = origemRepository.findAll().size();
        origem.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOrigemMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(origem))
            )
            .andExpect(status().isBadRequest());

        // Validate the Origem in the database
        List<Origem> origemList = origemRepository.findAll();
        assertThat(origemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamOrigem() throws Exception {
        int databaseSizeBeforeUpdate = origemRepository.findAll().size();
        origem.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOrigemMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(origem)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Origem in the database
        List<Origem> origemList = origemRepository.findAll();
        assertThat(origemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateOrigemWithPatch() throws Exception {
        // Initialize the database
        origemRepository.saveAndFlush(origem);

        int databaseSizeBeforeUpdate = origemRepository.findAll().size();

        // Update the origem using partial update
        Origem partialUpdatedOrigem = new Origem();
        partialUpdatedOrigem.setId(origem.getId());

        partialUpdatedOrigem.dataCriacao(UPDATED_DATA_CRIACAO).tipo(UPDATED_TIPO);

        restOrigemMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedOrigem.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedOrigem))
            )
            .andExpect(status().isOk());

        // Validate the Origem in the database
        List<Origem> origemList = origemRepository.findAll();
        assertThat(origemList).hasSize(databaseSizeBeforeUpdate);
        Origem testOrigem = origemList.get(origemList.size() - 1);
        assertThat(testOrigem.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testOrigem.getDataCriacao()).isEqualTo(UPDATED_DATA_CRIACAO);
        assertThat(testOrigem.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
        assertThat(testOrigem.getTipo()).isEqualTo(UPDATED_TIPO);
    }

    @Test
    @Transactional
    void fullUpdateOrigemWithPatch() throws Exception {
        // Initialize the database
        origemRepository.saveAndFlush(origem);

        int databaseSizeBeforeUpdate = origemRepository.findAll().size();

        // Update the origem using partial update
        Origem partialUpdatedOrigem = new Origem();
        partialUpdatedOrigem.setId(origem.getId());

        partialUpdatedOrigem.codigo(UPDATED_CODIGO).dataCriacao(UPDATED_DATA_CRIACAO).descricao(UPDATED_DESCRICAO).tipo(UPDATED_TIPO);

        restOrigemMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedOrigem.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedOrigem))
            )
            .andExpect(status().isOk());

        // Validate the Origem in the database
        List<Origem> origemList = origemRepository.findAll();
        assertThat(origemList).hasSize(databaseSizeBeforeUpdate);
        Origem testOrigem = origemList.get(origemList.size() - 1);
        assertThat(testOrigem.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testOrigem.getDataCriacao()).isEqualTo(UPDATED_DATA_CRIACAO);
        assertThat(testOrigem.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testOrigem.getTipo()).isEqualTo(UPDATED_TIPO);
    }

    @Test
    @Transactional
    void patchNonExistingOrigem() throws Exception {
        int databaseSizeBeforeUpdate = origemRepository.findAll().size();
        origem.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOrigemMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, origem.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(origem))
            )
            .andExpect(status().isBadRequest());

        // Validate the Origem in the database
        List<Origem> origemList = origemRepository.findAll();
        assertThat(origemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchOrigem() throws Exception {
        int databaseSizeBeforeUpdate = origemRepository.findAll().size();
        origem.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOrigemMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(origem))
            )
            .andExpect(status().isBadRequest());

        // Validate the Origem in the database
        List<Origem> origemList = origemRepository.findAll();
        assertThat(origemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamOrigem() throws Exception {
        int databaseSizeBeforeUpdate = origemRepository.findAll().size();
        origem.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOrigemMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(origem)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Origem in the database
        List<Origem> origemList = origemRepository.findAll();
        assertThat(origemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteOrigem() throws Exception {
        // Initialize the database
        origemRepository.saveAndFlush(origem);

        int databaseSizeBeforeDelete = origemRepository.findAll().size();

        // Delete the origem
        restOrigemMockMvc
            .perform(delete(ENTITY_API_URL_ID, origem.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Origem> origemList = origemRepository.findAll();
        assertThat(origemList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
