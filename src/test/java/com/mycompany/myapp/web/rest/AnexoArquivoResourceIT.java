package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.AnexoArquivo;
import com.mycompany.myapp.domain.enumeration.TipoOrigemAnexoArquivo;
import com.mycompany.myapp.repository.AnexoArquivoRepository;
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
 * Integration tests for the {@link AnexoArquivoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class AnexoArquivoResourceIT {

    private static final Long DEFAULT_CODIGO = 1L;
    private static final Long UPDATED_CODIGO = 2L;

    private static final Instant DEFAULT_DATA_CRIACAO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA_CRIACAO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    private static final String DEFAULT_NOME_NUVEM = "AAAAAAAAAA";
    private static final String UPDATED_NOME_NUVEM = "BBBBBBBBBB";

    private static final String DEFAULT_NOME_ORIGINAL = "AAAAAAAAAA";
    private static final String UPDATED_NOME_ORIGINAL = "BBBBBBBBBB";

    private static final TipoOrigemAnexoArquivo DEFAULT_TIPO_ORIGEM_ANEXO_ARQUIVO = TipoOrigemAnexoArquivo.CONFIGURACAO_SISTEMA;
    private static final TipoOrigemAnexoArquivo UPDATED_TIPO_ORIGEM_ANEXO_ARQUIVO = TipoOrigemAnexoArquivo.PROCESSO_IMPORTACAO_CLIENTES;

    private static final String ENTITY_API_URL = "/api/anexo-arquivos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private AnexoArquivoRepository anexoArquivoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAnexoArquivoMockMvc;

    private AnexoArquivo anexoArquivo;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AnexoArquivo createEntity(EntityManager em) {
        AnexoArquivo anexoArquivo = new AnexoArquivo()
            .codigo(DEFAULT_CODIGO)
            .dataCriacao(DEFAULT_DATA_CRIACAO)
            .descricao(DEFAULT_DESCRICAO)
            .nomeNuvem(DEFAULT_NOME_NUVEM)
            .nomeOriginal(DEFAULT_NOME_ORIGINAL)
            .tipoOrigemAnexoArquivo(DEFAULT_TIPO_ORIGEM_ANEXO_ARQUIVO);
        return anexoArquivo;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AnexoArquivo createUpdatedEntity(EntityManager em) {
        AnexoArquivo anexoArquivo = new AnexoArquivo()
            .codigo(UPDATED_CODIGO)
            .dataCriacao(UPDATED_DATA_CRIACAO)
            .descricao(UPDATED_DESCRICAO)
            .nomeNuvem(UPDATED_NOME_NUVEM)
            .nomeOriginal(UPDATED_NOME_ORIGINAL)
            .tipoOrigemAnexoArquivo(UPDATED_TIPO_ORIGEM_ANEXO_ARQUIVO);
        return anexoArquivo;
    }

    @BeforeEach
    public void initTest() {
        anexoArquivo = createEntity(em);
    }

    @Test
    @Transactional
    void createAnexoArquivo() throws Exception {
        int databaseSizeBeforeCreate = anexoArquivoRepository.findAll().size();
        // Create the AnexoArquivo
        restAnexoArquivoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(anexoArquivo)))
            .andExpect(status().isCreated());

        // Validate the AnexoArquivo in the database
        List<AnexoArquivo> anexoArquivoList = anexoArquivoRepository.findAll();
        assertThat(anexoArquivoList).hasSize(databaseSizeBeforeCreate + 1);
        AnexoArquivo testAnexoArquivo = anexoArquivoList.get(anexoArquivoList.size() - 1);
        assertThat(testAnexoArquivo.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testAnexoArquivo.getDataCriacao()).isEqualTo(DEFAULT_DATA_CRIACAO);
        assertThat(testAnexoArquivo.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
        assertThat(testAnexoArquivo.getNomeNuvem()).isEqualTo(DEFAULT_NOME_NUVEM);
        assertThat(testAnexoArquivo.getNomeOriginal()).isEqualTo(DEFAULT_NOME_ORIGINAL);
        assertThat(testAnexoArquivo.getTipoOrigemAnexoArquivo()).isEqualTo(DEFAULT_TIPO_ORIGEM_ANEXO_ARQUIVO);
    }

    @Test
    @Transactional
    void createAnexoArquivoWithExistingId() throws Exception {
        // Create the AnexoArquivo with an existing ID
        anexoArquivo.setId(1L);

        int databaseSizeBeforeCreate = anexoArquivoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restAnexoArquivoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(anexoArquivo)))
            .andExpect(status().isBadRequest());

        // Validate the AnexoArquivo in the database
        List<AnexoArquivo> anexoArquivoList = anexoArquivoRepository.findAll();
        assertThat(anexoArquivoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkDataCriacaoIsRequired() throws Exception {
        int databaseSizeBeforeTest = anexoArquivoRepository.findAll().size();
        // set the field null
        anexoArquivo.setDataCriacao(null);

        // Create the AnexoArquivo, which fails.

        restAnexoArquivoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(anexoArquivo)))
            .andExpect(status().isBadRequest());

        List<AnexoArquivo> anexoArquivoList = anexoArquivoRepository.findAll();
        assertThat(anexoArquivoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkNomeNuvemIsRequired() throws Exception {
        int databaseSizeBeforeTest = anexoArquivoRepository.findAll().size();
        // set the field null
        anexoArquivo.setNomeNuvem(null);

        // Create the AnexoArquivo, which fails.

        restAnexoArquivoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(anexoArquivo)))
            .andExpect(status().isBadRequest());

        List<AnexoArquivo> anexoArquivoList = anexoArquivoRepository.findAll();
        assertThat(anexoArquivoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllAnexoArquivos() throws Exception {
        // Initialize the database
        anexoArquivoRepository.saveAndFlush(anexoArquivo);

        // Get all the anexoArquivoList
        restAnexoArquivoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(anexoArquivo.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO.intValue())))
            .andExpect(jsonPath("$.[*].dataCriacao").value(hasItem(DEFAULT_DATA_CRIACAO.toString())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)))
            .andExpect(jsonPath("$.[*].nomeNuvem").value(hasItem(DEFAULT_NOME_NUVEM)))
            .andExpect(jsonPath("$.[*].nomeOriginal").value(hasItem(DEFAULT_NOME_ORIGINAL)))
            .andExpect(jsonPath("$.[*].tipoOrigemAnexoArquivo").value(hasItem(DEFAULT_TIPO_ORIGEM_ANEXO_ARQUIVO.toString())));
    }

    @Test
    @Transactional
    void getAnexoArquivo() throws Exception {
        // Initialize the database
        anexoArquivoRepository.saveAndFlush(anexoArquivo);

        // Get the anexoArquivo
        restAnexoArquivoMockMvc
            .perform(get(ENTITY_API_URL_ID, anexoArquivo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(anexoArquivo.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO.intValue()))
            .andExpect(jsonPath("$.dataCriacao").value(DEFAULT_DATA_CRIACAO.toString()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO))
            .andExpect(jsonPath("$.nomeNuvem").value(DEFAULT_NOME_NUVEM))
            .andExpect(jsonPath("$.nomeOriginal").value(DEFAULT_NOME_ORIGINAL))
            .andExpect(jsonPath("$.tipoOrigemAnexoArquivo").value(DEFAULT_TIPO_ORIGEM_ANEXO_ARQUIVO.toString()));
    }

    @Test
    @Transactional
    void getNonExistingAnexoArquivo() throws Exception {
        // Get the anexoArquivo
        restAnexoArquivoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingAnexoArquivo() throws Exception {
        // Initialize the database
        anexoArquivoRepository.saveAndFlush(anexoArquivo);

        int databaseSizeBeforeUpdate = anexoArquivoRepository.findAll().size();

        // Update the anexoArquivo
        AnexoArquivo updatedAnexoArquivo = anexoArquivoRepository.findById(anexoArquivo.getId()).get();
        // Disconnect from session so that the updates on updatedAnexoArquivo are not directly saved in db
        em.detach(updatedAnexoArquivo);
        updatedAnexoArquivo
            .codigo(UPDATED_CODIGO)
            .dataCriacao(UPDATED_DATA_CRIACAO)
            .descricao(UPDATED_DESCRICAO)
            .nomeNuvem(UPDATED_NOME_NUVEM)
            .nomeOriginal(UPDATED_NOME_ORIGINAL)
            .tipoOrigemAnexoArquivo(UPDATED_TIPO_ORIGEM_ANEXO_ARQUIVO);

        restAnexoArquivoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedAnexoArquivo.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedAnexoArquivo))
            )
            .andExpect(status().isOk());

        // Validate the AnexoArquivo in the database
        List<AnexoArquivo> anexoArquivoList = anexoArquivoRepository.findAll();
        assertThat(anexoArquivoList).hasSize(databaseSizeBeforeUpdate);
        AnexoArquivo testAnexoArquivo = anexoArquivoList.get(anexoArquivoList.size() - 1);
        assertThat(testAnexoArquivo.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testAnexoArquivo.getDataCriacao()).isEqualTo(UPDATED_DATA_CRIACAO);
        assertThat(testAnexoArquivo.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testAnexoArquivo.getNomeNuvem()).isEqualTo(UPDATED_NOME_NUVEM);
        assertThat(testAnexoArquivo.getNomeOriginal()).isEqualTo(UPDATED_NOME_ORIGINAL);
        assertThat(testAnexoArquivo.getTipoOrigemAnexoArquivo()).isEqualTo(UPDATED_TIPO_ORIGEM_ANEXO_ARQUIVO);
    }

    @Test
    @Transactional
    void putNonExistingAnexoArquivo() throws Exception {
        int databaseSizeBeforeUpdate = anexoArquivoRepository.findAll().size();
        anexoArquivo.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAnexoArquivoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, anexoArquivo.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(anexoArquivo))
            )
            .andExpect(status().isBadRequest());

        // Validate the AnexoArquivo in the database
        List<AnexoArquivo> anexoArquivoList = anexoArquivoRepository.findAll();
        assertThat(anexoArquivoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchAnexoArquivo() throws Exception {
        int databaseSizeBeforeUpdate = anexoArquivoRepository.findAll().size();
        anexoArquivo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAnexoArquivoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(anexoArquivo))
            )
            .andExpect(status().isBadRequest());

        // Validate the AnexoArquivo in the database
        List<AnexoArquivo> anexoArquivoList = anexoArquivoRepository.findAll();
        assertThat(anexoArquivoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamAnexoArquivo() throws Exception {
        int databaseSizeBeforeUpdate = anexoArquivoRepository.findAll().size();
        anexoArquivo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAnexoArquivoMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(anexoArquivo)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the AnexoArquivo in the database
        List<AnexoArquivo> anexoArquivoList = anexoArquivoRepository.findAll();
        assertThat(anexoArquivoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateAnexoArquivoWithPatch() throws Exception {
        // Initialize the database
        anexoArquivoRepository.saveAndFlush(anexoArquivo);

        int databaseSizeBeforeUpdate = anexoArquivoRepository.findAll().size();

        // Update the anexoArquivo using partial update
        AnexoArquivo partialUpdatedAnexoArquivo = new AnexoArquivo();
        partialUpdatedAnexoArquivo.setId(anexoArquivo.getId());

        partialUpdatedAnexoArquivo
            .codigo(UPDATED_CODIGO)
            .descricao(UPDATED_DESCRICAO)
            .nomeNuvem(UPDATED_NOME_NUVEM)
            .nomeOriginal(UPDATED_NOME_ORIGINAL);

        restAnexoArquivoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAnexoArquivo.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedAnexoArquivo))
            )
            .andExpect(status().isOk());

        // Validate the AnexoArquivo in the database
        List<AnexoArquivo> anexoArquivoList = anexoArquivoRepository.findAll();
        assertThat(anexoArquivoList).hasSize(databaseSizeBeforeUpdate);
        AnexoArquivo testAnexoArquivo = anexoArquivoList.get(anexoArquivoList.size() - 1);
        assertThat(testAnexoArquivo.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testAnexoArquivo.getDataCriacao()).isEqualTo(DEFAULT_DATA_CRIACAO);
        assertThat(testAnexoArquivo.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testAnexoArquivo.getNomeNuvem()).isEqualTo(UPDATED_NOME_NUVEM);
        assertThat(testAnexoArquivo.getNomeOriginal()).isEqualTo(UPDATED_NOME_ORIGINAL);
        assertThat(testAnexoArquivo.getTipoOrigemAnexoArquivo()).isEqualTo(DEFAULT_TIPO_ORIGEM_ANEXO_ARQUIVO);
    }

    @Test
    @Transactional
    void fullUpdateAnexoArquivoWithPatch() throws Exception {
        // Initialize the database
        anexoArquivoRepository.saveAndFlush(anexoArquivo);

        int databaseSizeBeforeUpdate = anexoArquivoRepository.findAll().size();

        // Update the anexoArquivo using partial update
        AnexoArquivo partialUpdatedAnexoArquivo = new AnexoArquivo();
        partialUpdatedAnexoArquivo.setId(anexoArquivo.getId());

        partialUpdatedAnexoArquivo
            .codigo(UPDATED_CODIGO)
            .dataCriacao(UPDATED_DATA_CRIACAO)
            .descricao(UPDATED_DESCRICAO)
            .nomeNuvem(UPDATED_NOME_NUVEM)
            .nomeOriginal(UPDATED_NOME_ORIGINAL)
            .tipoOrigemAnexoArquivo(UPDATED_TIPO_ORIGEM_ANEXO_ARQUIVO);

        restAnexoArquivoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAnexoArquivo.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedAnexoArquivo))
            )
            .andExpect(status().isOk());

        // Validate the AnexoArquivo in the database
        List<AnexoArquivo> anexoArquivoList = anexoArquivoRepository.findAll();
        assertThat(anexoArquivoList).hasSize(databaseSizeBeforeUpdate);
        AnexoArquivo testAnexoArquivo = anexoArquivoList.get(anexoArquivoList.size() - 1);
        assertThat(testAnexoArquivo.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testAnexoArquivo.getDataCriacao()).isEqualTo(UPDATED_DATA_CRIACAO);
        assertThat(testAnexoArquivo.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testAnexoArquivo.getNomeNuvem()).isEqualTo(UPDATED_NOME_NUVEM);
        assertThat(testAnexoArquivo.getNomeOriginal()).isEqualTo(UPDATED_NOME_ORIGINAL);
        assertThat(testAnexoArquivo.getTipoOrigemAnexoArquivo()).isEqualTo(UPDATED_TIPO_ORIGEM_ANEXO_ARQUIVO);
    }

    @Test
    @Transactional
    void patchNonExistingAnexoArquivo() throws Exception {
        int databaseSizeBeforeUpdate = anexoArquivoRepository.findAll().size();
        anexoArquivo.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAnexoArquivoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, anexoArquivo.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(anexoArquivo))
            )
            .andExpect(status().isBadRequest());

        // Validate the AnexoArquivo in the database
        List<AnexoArquivo> anexoArquivoList = anexoArquivoRepository.findAll();
        assertThat(anexoArquivoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchAnexoArquivo() throws Exception {
        int databaseSizeBeforeUpdate = anexoArquivoRepository.findAll().size();
        anexoArquivo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAnexoArquivoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(anexoArquivo))
            )
            .andExpect(status().isBadRequest());

        // Validate the AnexoArquivo in the database
        List<AnexoArquivo> anexoArquivoList = anexoArquivoRepository.findAll();
        assertThat(anexoArquivoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamAnexoArquivo() throws Exception {
        int databaseSizeBeforeUpdate = anexoArquivoRepository.findAll().size();
        anexoArquivo.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAnexoArquivoMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(anexoArquivo))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the AnexoArquivo in the database
        List<AnexoArquivo> anexoArquivoList = anexoArquivoRepository.findAll();
        assertThat(anexoArquivoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteAnexoArquivo() throws Exception {
        // Initialize the database
        anexoArquivoRepository.saveAndFlush(anexoArquivo);

        int databaseSizeBeforeDelete = anexoArquivoRepository.findAll().size();

        // Delete the anexoArquivo
        restAnexoArquivoMockMvc
            .perform(delete(ENTITY_API_URL_ID, anexoArquivo.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AnexoArquivo> anexoArquivoList = anexoArquivoRepository.findAll();
        assertThat(anexoArquivoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
