package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.GrupoPermissoes;
import com.mycompany.myapp.repository.GrupoPermissoesRepository;
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
 * Integration tests for the {@link GrupoPermissoesResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class GrupoPermissoesResourceIT {

    private static final Long DEFAULT_CODIGO = 1L;
    private static final Long UPDATED_CODIGO = 2L;

    private static final Instant DEFAULT_DATA_CRIACAO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA_CRIACAO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/grupo-permissoes";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private GrupoPermissoesRepository grupoPermissoesRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restGrupoPermissoesMockMvc;

    private GrupoPermissoes grupoPermissoes;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GrupoPermissoes createEntity(EntityManager em) {
        GrupoPermissoes grupoPermissoes = new GrupoPermissoes()
            .codigo(DEFAULT_CODIGO)
            .dataCriacao(DEFAULT_DATA_CRIACAO)
            .descricao(DEFAULT_DESCRICAO);
        return grupoPermissoes;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GrupoPermissoes createUpdatedEntity(EntityManager em) {
        GrupoPermissoes grupoPermissoes = new GrupoPermissoes()
            .codigo(UPDATED_CODIGO)
            .dataCriacao(UPDATED_DATA_CRIACAO)
            .descricao(UPDATED_DESCRICAO);
        return grupoPermissoes;
    }

    @BeforeEach
    public void initTest() {
        grupoPermissoes = createEntity(em);
    }

    @Test
    @Transactional
    void createGrupoPermissoes() throws Exception {
        int databaseSizeBeforeCreate = grupoPermissoesRepository.findAll().size();
        // Create the GrupoPermissoes
        restGrupoPermissoesMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(grupoPermissoes))
            )
            .andExpect(status().isCreated());

        // Validate the GrupoPermissoes in the database
        List<GrupoPermissoes> grupoPermissoesList = grupoPermissoesRepository.findAll();
        assertThat(grupoPermissoesList).hasSize(databaseSizeBeforeCreate + 1);
        GrupoPermissoes testGrupoPermissoes = grupoPermissoesList.get(grupoPermissoesList.size() - 1);
        assertThat(testGrupoPermissoes.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testGrupoPermissoes.getDataCriacao()).isEqualTo(DEFAULT_DATA_CRIACAO);
        assertThat(testGrupoPermissoes.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
    }

    @Test
    @Transactional
    void createGrupoPermissoesWithExistingId() throws Exception {
        // Create the GrupoPermissoes with an existing ID
        grupoPermissoes.setId(1L);

        int databaseSizeBeforeCreate = grupoPermissoesRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restGrupoPermissoesMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(grupoPermissoes))
            )
            .andExpect(status().isBadRequest());

        // Validate the GrupoPermissoes in the database
        List<GrupoPermissoes> grupoPermissoesList = grupoPermissoesRepository.findAll();
        assertThat(grupoPermissoesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkDataCriacaoIsRequired() throws Exception {
        int databaseSizeBeforeTest = grupoPermissoesRepository.findAll().size();
        // set the field null
        grupoPermissoes.setDataCriacao(null);

        // Create the GrupoPermissoes, which fails.

        restGrupoPermissoesMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(grupoPermissoes))
            )
            .andExpect(status().isBadRequest());

        List<GrupoPermissoes> grupoPermissoesList = grupoPermissoesRepository.findAll();
        assertThat(grupoPermissoesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkDescricaoIsRequired() throws Exception {
        int databaseSizeBeforeTest = grupoPermissoesRepository.findAll().size();
        // set the field null
        grupoPermissoes.setDescricao(null);

        // Create the GrupoPermissoes, which fails.

        restGrupoPermissoesMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(grupoPermissoes))
            )
            .andExpect(status().isBadRequest());

        List<GrupoPermissoes> grupoPermissoesList = grupoPermissoesRepository.findAll();
        assertThat(grupoPermissoesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllGrupoPermissoes() throws Exception {
        // Initialize the database
        grupoPermissoesRepository.saveAndFlush(grupoPermissoes);

        // Get all the grupoPermissoesList
        restGrupoPermissoesMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(grupoPermissoes.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO.intValue())))
            .andExpect(jsonPath("$.[*].dataCriacao").value(hasItem(DEFAULT_DATA_CRIACAO.toString())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)));
    }

    @Test
    @Transactional
    void getGrupoPermissoes() throws Exception {
        // Initialize the database
        grupoPermissoesRepository.saveAndFlush(grupoPermissoes);

        // Get the grupoPermissoes
        restGrupoPermissoesMockMvc
            .perform(get(ENTITY_API_URL_ID, grupoPermissoes.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(grupoPermissoes.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO.intValue()))
            .andExpect(jsonPath("$.dataCriacao").value(DEFAULT_DATA_CRIACAO.toString()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO));
    }

    @Test
    @Transactional
    void getNonExistingGrupoPermissoes() throws Exception {
        // Get the grupoPermissoes
        restGrupoPermissoesMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingGrupoPermissoes() throws Exception {
        // Initialize the database
        grupoPermissoesRepository.saveAndFlush(grupoPermissoes);

        int databaseSizeBeforeUpdate = grupoPermissoesRepository.findAll().size();

        // Update the grupoPermissoes
        GrupoPermissoes updatedGrupoPermissoes = grupoPermissoesRepository.findById(grupoPermissoes.getId()).get();
        // Disconnect from session so that the updates on updatedGrupoPermissoes are not directly saved in db
        em.detach(updatedGrupoPermissoes);
        updatedGrupoPermissoes.codigo(UPDATED_CODIGO).dataCriacao(UPDATED_DATA_CRIACAO).descricao(UPDATED_DESCRICAO);

        restGrupoPermissoesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedGrupoPermissoes.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedGrupoPermissoes))
            )
            .andExpect(status().isOk());

        // Validate the GrupoPermissoes in the database
        List<GrupoPermissoes> grupoPermissoesList = grupoPermissoesRepository.findAll();
        assertThat(grupoPermissoesList).hasSize(databaseSizeBeforeUpdate);
        GrupoPermissoes testGrupoPermissoes = grupoPermissoesList.get(grupoPermissoesList.size() - 1);
        assertThat(testGrupoPermissoes.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testGrupoPermissoes.getDataCriacao()).isEqualTo(UPDATED_DATA_CRIACAO);
        assertThat(testGrupoPermissoes.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
    }

    @Test
    @Transactional
    void putNonExistingGrupoPermissoes() throws Exception {
        int databaseSizeBeforeUpdate = grupoPermissoesRepository.findAll().size();
        grupoPermissoes.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGrupoPermissoesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, grupoPermissoes.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(grupoPermissoes))
            )
            .andExpect(status().isBadRequest());

        // Validate the GrupoPermissoes in the database
        List<GrupoPermissoes> grupoPermissoesList = grupoPermissoesRepository.findAll();
        assertThat(grupoPermissoesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchGrupoPermissoes() throws Exception {
        int databaseSizeBeforeUpdate = grupoPermissoesRepository.findAll().size();
        grupoPermissoes.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restGrupoPermissoesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(grupoPermissoes))
            )
            .andExpect(status().isBadRequest());

        // Validate the GrupoPermissoes in the database
        List<GrupoPermissoes> grupoPermissoesList = grupoPermissoesRepository.findAll();
        assertThat(grupoPermissoesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamGrupoPermissoes() throws Exception {
        int databaseSizeBeforeUpdate = grupoPermissoesRepository.findAll().size();
        grupoPermissoes.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restGrupoPermissoesMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(grupoPermissoes))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the GrupoPermissoes in the database
        List<GrupoPermissoes> grupoPermissoesList = grupoPermissoesRepository.findAll();
        assertThat(grupoPermissoesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateGrupoPermissoesWithPatch() throws Exception {
        // Initialize the database
        grupoPermissoesRepository.saveAndFlush(grupoPermissoes);

        int databaseSizeBeforeUpdate = grupoPermissoesRepository.findAll().size();

        // Update the grupoPermissoes using partial update
        GrupoPermissoes partialUpdatedGrupoPermissoes = new GrupoPermissoes();
        partialUpdatedGrupoPermissoes.setId(grupoPermissoes.getId());

        partialUpdatedGrupoPermissoes.codigo(UPDATED_CODIGO);

        restGrupoPermissoesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedGrupoPermissoes.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedGrupoPermissoes))
            )
            .andExpect(status().isOk());

        // Validate the GrupoPermissoes in the database
        List<GrupoPermissoes> grupoPermissoesList = grupoPermissoesRepository.findAll();
        assertThat(grupoPermissoesList).hasSize(databaseSizeBeforeUpdate);
        GrupoPermissoes testGrupoPermissoes = grupoPermissoesList.get(grupoPermissoesList.size() - 1);
        assertThat(testGrupoPermissoes.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testGrupoPermissoes.getDataCriacao()).isEqualTo(DEFAULT_DATA_CRIACAO);
        assertThat(testGrupoPermissoes.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
    }

    @Test
    @Transactional
    void fullUpdateGrupoPermissoesWithPatch() throws Exception {
        // Initialize the database
        grupoPermissoesRepository.saveAndFlush(grupoPermissoes);

        int databaseSizeBeforeUpdate = grupoPermissoesRepository.findAll().size();

        // Update the grupoPermissoes using partial update
        GrupoPermissoes partialUpdatedGrupoPermissoes = new GrupoPermissoes();
        partialUpdatedGrupoPermissoes.setId(grupoPermissoes.getId());

        partialUpdatedGrupoPermissoes.codigo(UPDATED_CODIGO).dataCriacao(UPDATED_DATA_CRIACAO).descricao(UPDATED_DESCRICAO);

        restGrupoPermissoesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedGrupoPermissoes.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedGrupoPermissoes))
            )
            .andExpect(status().isOk());

        // Validate the GrupoPermissoes in the database
        List<GrupoPermissoes> grupoPermissoesList = grupoPermissoesRepository.findAll();
        assertThat(grupoPermissoesList).hasSize(databaseSizeBeforeUpdate);
        GrupoPermissoes testGrupoPermissoes = grupoPermissoesList.get(grupoPermissoesList.size() - 1);
        assertThat(testGrupoPermissoes.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testGrupoPermissoes.getDataCriacao()).isEqualTo(UPDATED_DATA_CRIACAO);
        assertThat(testGrupoPermissoes.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
    }

    @Test
    @Transactional
    void patchNonExistingGrupoPermissoes() throws Exception {
        int databaseSizeBeforeUpdate = grupoPermissoesRepository.findAll().size();
        grupoPermissoes.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGrupoPermissoesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, grupoPermissoes.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(grupoPermissoes))
            )
            .andExpect(status().isBadRequest());

        // Validate the GrupoPermissoes in the database
        List<GrupoPermissoes> grupoPermissoesList = grupoPermissoesRepository.findAll();
        assertThat(grupoPermissoesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchGrupoPermissoes() throws Exception {
        int databaseSizeBeforeUpdate = grupoPermissoesRepository.findAll().size();
        grupoPermissoes.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restGrupoPermissoesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(grupoPermissoes))
            )
            .andExpect(status().isBadRequest());

        // Validate the GrupoPermissoes in the database
        List<GrupoPermissoes> grupoPermissoesList = grupoPermissoesRepository.findAll();
        assertThat(grupoPermissoesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamGrupoPermissoes() throws Exception {
        int databaseSizeBeforeUpdate = grupoPermissoesRepository.findAll().size();
        grupoPermissoes.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restGrupoPermissoesMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(grupoPermissoes))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the GrupoPermissoes in the database
        List<GrupoPermissoes> grupoPermissoesList = grupoPermissoesRepository.findAll();
        assertThat(grupoPermissoesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteGrupoPermissoes() throws Exception {
        // Initialize the database
        grupoPermissoesRepository.saveAndFlush(grupoPermissoes);

        int databaseSizeBeforeDelete = grupoPermissoesRepository.findAll().size();

        // Delete the grupoPermissoes
        restGrupoPermissoesMockMvc
            .perform(delete(ENTITY_API_URL_ID, grupoPermissoes.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<GrupoPermissoes> grupoPermissoesList = grupoPermissoesRepository.findAll();
        assertThat(grupoPermissoesList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
