package com.mycompany.myapp.web.rest;

import static com.mycompany.myapp.web.rest.TestUtil.sameNumber;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Aparelho;
import com.mycompany.myapp.domain.enumeration.ClassificacaoAparelho;
import com.mycompany.myapp.repository.AparelhoRepository;
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
 * Integration tests for the {@link AparelhoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class AparelhoResourceIT {

    private static final String DEFAULT_CODIGO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATA_CRIACAO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA_CRIACAO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final ClassificacaoAparelho DEFAULT_CLASSIFICACAO_APARELHO = ClassificacaoAparelho.CHIP_MOVEL;
    private static final ClassificacaoAparelho UPDATED_CLASSIFICACAO_APARELHO = ClassificacaoAparelho.APARELHO_MOVEL;

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    private static final String DEFAULT_NOME_TECNICO = "AAAAAAAAAA";
    private static final String UPDATED_NOME_TECNICO = "BBBBBBBBBB";

    private static final String DEFAULT_MATERIAL = "AAAAAAAAAA";
    private static final String UPDATED_MATERIAL = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_VALOR = new BigDecimal(1);
    private static final BigDecimal UPDATED_VALOR = new BigDecimal(2);

    private static final Boolean DEFAULT_ATIVO = false;
    private static final Boolean UPDATED_ATIVO = true;

    private static final String ENTITY_API_URL = "/api/aparelhos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private AparelhoRepository aparelhoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAparelhoMockMvc;

    private Aparelho aparelho;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Aparelho createEntity(EntityManager em) {
        Aparelho aparelho = new Aparelho()
            .codigo(DEFAULT_CODIGO)
            .dataCriacao(DEFAULT_DATA_CRIACAO)
            .classificacaoAparelho(DEFAULT_CLASSIFICACAO_APARELHO)
            .descricao(DEFAULT_DESCRICAO)
            .nomeTecnico(DEFAULT_NOME_TECNICO)
            .material(DEFAULT_MATERIAL)
            .valor(DEFAULT_VALOR)
            .ativo(DEFAULT_ATIVO);
        return aparelho;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Aparelho createUpdatedEntity(EntityManager em) {
        Aparelho aparelho = new Aparelho()
            .codigo(UPDATED_CODIGO)
            .dataCriacao(UPDATED_DATA_CRIACAO)
            .classificacaoAparelho(UPDATED_CLASSIFICACAO_APARELHO)
            .descricao(UPDATED_DESCRICAO)
            .nomeTecnico(UPDATED_NOME_TECNICO)
            .material(UPDATED_MATERIAL)
            .valor(UPDATED_VALOR)
            .ativo(UPDATED_ATIVO);
        return aparelho;
    }

    @BeforeEach
    public void initTest() {
        aparelho = createEntity(em);
    }

    @Test
    @Transactional
    void createAparelho() throws Exception {
        int databaseSizeBeforeCreate = aparelhoRepository.findAll().size();
        // Create the Aparelho
        restAparelhoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(aparelho)))
            .andExpect(status().isCreated());

        // Validate the Aparelho in the database
        List<Aparelho> aparelhoList = aparelhoRepository.findAll();
        assertThat(aparelhoList).hasSize(databaseSizeBeforeCreate + 1);
        Aparelho testAparelho = aparelhoList.get(aparelhoList.size() - 1);
        assertThat(testAparelho.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testAparelho.getDataCriacao()).isEqualTo(DEFAULT_DATA_CRIACAO);
        assertThat(testAparelho.getClassificacaoAparelho()).isEqualTo(DEFAULT_CLASSIFICACAO_APARELHO);
        assertThat(testAparelho.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
        assertThat(testAparelho.getNomeTecnico()).isEqualTo(DEFAULT_NOME_TECNICO);
        assertThat(testAparelho.getMaterial()).isEqualTo(DEFAULT_MATERIAL);
        assertThat(testAparelho.getValor()).isEqualByComparingTo(DEFAULT_VALOR);
        assertThat(testAparelho.getAtivo()).isEqualTo(DEFAULT_ATIVO);
    }

    @Test
    @Transactional
    void createAparelhoWithExistingId() throws Exception {
        // Create the Aparelho with an existing ID
        aparelho.setId(1L);

        int databaseSizeBeforeCreate = aparelhoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restAparelhoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(aparelho)))
            .andExpect(status().isBadRequest());

        // Validate the Aparelho in the database
        List<Aparelho> aparelhoList = aparelhoRepository.findAll();
        assertThat(aparelhoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkDataCriacaoIsRequired() throws Exception {
        int databaseSizeBeforeTest = aparelhoRepository.findAll().size();
        // set the field null
        aparelho.setDataCriacao(null);

        // Create the Aparelho, which fails.

        restAparelhoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(aparelho)))
            .andExpect(status().isBadRequest());

        List<Aparelho> aparelhoList = aparelhoRepository.findAll();
        assertThat(aparelhoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkDescricaoIsRequired() throws Exception {
        int databaseSizeBeforeTest = aparelhoRepository.findAll().size();
        // set the field null
        aparelho.setDescricao(null);

        // Create the Aparelho, which fails.

        restAparelhoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(aparelho)))
            .andExpect(status().isBadRequest());

        List<Aparelho> aparelhoList = aparelhoRepository.findAll();
        assertThat(aparelhoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkNomeTecnicoIsRequired() throws Exception {
        int databaseSizeBeforeTest = aparelhoRepository.findAll().size();
        // set the field null
        aparelho.setNomeTecnico(null);

        // Create the Aparelho, which fails.

        restAparelhoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(aparelho)))
            .andExpect(status().isBadRequest());

        List<Aparelho> aparelhoList = aparelhoRepository.findAll();
        assertThat(aparelhoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllAparelhos() throws Exception {
        // Initialize the database
        aparelhoRepository.saveAndFlush(aparelho);

        // Get all the aparelhoList
        restAparelhoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(aparelho.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO)))
            .andExpect(jsonPath("$.[*].dataCriacao").value(hasItem(DEFAULT_DATA_CRIACAO.toString())))
            .andExpect(jsonPath("$.[*].classificacaoAparelho").value(hasItem(DEFAULT_CLASSIFICACAO_APARELHO.toString())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)))
            .andExpect(jsonPath("$.[*].nomeTecnico").value(hasItem(DEFAULT_NOME_TECNICO)))
            .andExpect(jsonPath("$.[*].material").value(hasItem(DEFAULT_MATERIAL)))
            .andExpect(jsonPath("$.[*].valor").value(hasItem(sameNumber(DEFAULT_VALOR))))
            .andExpect(jsonPath("$.[*].ativo").value(hasItem(DEFAULT_ATIVO.booleanValue())));
    }

    @Test
    @Transactional
    void getAparelho() throws Exception {
        // Initialize the database
        aparelhoRepository.saveAndFlush(aparelho);

        // Get the aparelho
        restAparelhoMockMvc
            .perform(get(ENTITY_API_URL_ID, aparelho.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(aparelho.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO))
            .andExpect(jsonPath("$.dataCriacao").value(DEFAULT_DATA_CRIACAO.toString()))
            .andExpect(jsonPath("$.classificacaoAparelho").value(DEFAULT_CLASSIFICACAO_APARELHO.toString()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO))
            .andExpect(jsonPath("$.nomeTecnico").value(DEFAULT_NOME_TECNICO))
            .andExpect(jsonPath("$.material").value(DEFAULT_MATERIAL))
            .andExpect(jsonPath("$.valor").value(sameNumber(DEFAULT_VALOR)))
            .andExpect(jsonPath("$.ativo").value(DEFAULT_ATIVO.booleanValue()));
    }

    @Test
    @Transactional
    void getNonExistingAparelho() throws Exception {
        // Get the aparelho
        restAparelhoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingAparelho() throws Exception {
        // Initialize the database
        aparelhoRepository.saveAndFlush(aparelho);

        int databaseSizeBeforeUpdate = aparelhoRepository.findAll().size();

        // Update the aparelho
        Aparelho updatedAparelho = aparelhoRepository.findById(aparelho.getId()).get();
        // Disconnect from session so that the updates on updatedAparelho are not directly saved in db
        em.detach(updatedAparelho);
        updatedAparelho
            .codigo(UPDATED_CODIGO)
            .dataCriacao(UPDATED_DATA_CRIACAO)
            .classificacaoAparelho(UPDATED_CLASSIFICACAO_APARELHO)
            .descricao(UPDATED_DESCRICAO)
            .nomeTecnico(UPDATED_NOME_TECNICO)
            .material(UPDATED_MATERIAL)
            .valor(UPDATED_VALOR)
            .ativo(UPDATED_ATIVO);

        restAparelhoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedAparelho.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedAparelho))
            )
            .andExpect(status().isOk());

        // Validate the Aparelho in the database
        List<Aparelho> aparelhoList = aparelhoRepository.findAll();
        assertThat(aparelhoList).hasSize(databaseSizeBeforeUpdate);
        Aparelho testAparelho = aparelhoList.get(aparelhoList.size() - 1);
        assertThat(testAparelho.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testAparelho.getDataCriacao()).isEqualTo(UPDATED_DATA_CRIACAO);
        assertThat(testAparelho.getClassificacaoAparelho()).isEqualTo(UPDATED_CLASSIFICACAO_APARELHO);
        assertThat(testAparelho.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testAparelho.getNomeTecnico()).isEqualTo(UPDATED_NOME_TECNICO);
        assertThat(testAparelho.getMaterial()).isEqualTo(UPDATED_MATERIAL);
        assertThat(testAparelho.getValor()).isEqualByComparingTo(UPDATED_VALOR);
        assertThat(testAparelho.getAtivo()).isEqualTo(UPDATED_ATIVO);
    }

    @Test
    @Transactional
    void putNonExistingAparelho() throws Exception {
        int databaseSizeBeforeUpdate = aparelhoRepository.findAll().size();
        aparelho.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAparelhoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, aparelho.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(aparelho))
            )
            .andExpect(status().isBadRequest());

        // Validate the Aparelho in the database
        List<Aparelho> aparelhoList = aparelhoRepository.findAll();
        assertThat(aparelhoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchAparelho() throws Exception {
        int databaseSizeBeforeUpdate = aparelhoRepository.findAll().size();
        aparelho.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAparelhoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(aparelho))
            )
            .andExpect(status().isBadRequest());

        // Validate the Aparelho in the database
        List<Aparelho> aparelhoList = aparelhoRepository.findAll();
        assertThat(aparelhoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamAparelho() throws Exception {
        int databaseSizeBeforeUpdate = aparelhoRepository.findAll().size();
        aparelho.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAparelhoMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(aparelho)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Aparelho in the database
        List<Aparelho> aparelhoList = aparelhoRepository.findAll();
        assertThat(aparelhoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateAparelhoWithPatch() throws Exception {
        // Initialize the database
        aparelhoRepository.saveAndFlush(aparelho);

        int databaseSizeBeforeUpdate = aparelhoRepository.findAll().size();

        // Update the aparelho using partial update
        Aparelho partialUpdatedAparelho = new Aparelho();
        partialUpdatedAparelho.setId(aparelho.getId());

        partialUpdatedAparelho.dataCriacao(UPDATED_DATA_CRIACAO).ativo(UPDATED_ATIVO);

        restAparelhoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAparelho.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedAparelho))
            )
            .andExpect(status().isOk());

        // Validate the Aparelho in the database
        List<Aparelho> aparelhoList = aparelhoRepository.findAll();
        assertThat(aparelhoList).hasSize(databaseSizeBeforeUpdate);
        Aparelho testAparelho = aparelhoList.get(aparelhoList.size() - 1);
        assertThat(testAparelho.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testAparelho.getDataCriacao()).isEqualTo(UPDATED_DATA_CRIACAO);
        assertThat(testAparelho.getClassificacaoAparelho()).isEqualTo(DEFAULT_CLASSIFICACAO_APARELHO);
        assertThat(testAparelho.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
        assertThat(testAparelho.getNomeTecnico()).isEqualTo(DEFAULT_NOME_TECNICO);
        assertThat(testAparelho.getMaterial()).isEqualTo(DEFAULT_MATERIAL);
        assertThat(testAparelho.getValor()).isEqualByComparingTo(DEFAULT_VALOR);
        assertThat(testAparelho.getAtivo()).isEqualTo(UPDATED_ATIVO);
    }

    @Test
    @Transactional
    void fullUpdateAparelhoWithPatch() throws Exception {
        // Initialize the database
        aparelhoRepository.saveAndFlush(aparelho);

        int databaseSizeBeforeUpdate = aparelhoRepository.findAll().size();

        // Update the aparelho using partial update
        Aparelho partialUpdatedAparelho = new Aparelho();
        partialUpdatedAparelho.setId(aparelho.getId());

        partialUpdatedAparelho
            .codigo(UPDATED_CODIGO)
            .dataCriacao(UPDATED_DATA_CRIACAO)
            .classificacaoAparelho(UPDATED_CLASSIFICACAO_APARELHO)
            .descricao(UPDATED_DESCRICAO)
            .nomeTecnico(UPDATED_NOME_TECNICO)
            .material(UPDATED_MATERIAL)
            .valor(UPDATED_VALOR)
            .ativo(UPDATED_ATIVO);

        restAparelhoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAparelho.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedAparelho))
            )
            .andExpect(status().isOk());

        // Validate the Aparelho in the database
        List<Aparelho> aparelhoList = aparelhoRepository.findAll();
        assertThat(aparelhoList).hasSize(databaseSizeBeforeUpdate);
        Aparelho testAparelho = aparelhoList.get(aparelhoList.size() - 1);
        assertThat(testAparelho.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testAparelho.getDataCriacao()).isEqualTo(UPDATED_DATA_CRIACAO);
        assertThat(testAparelho.getClassificacaoAparelho()).isEqualTo(UPDATED_CLASSIFICACAO_APARELHO);
        assertThat(testAparelho.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testAparelho.getNomeTecnico()).isEqualTo(UPDATED_NOME_TECNICO);
        assertThat(testAparelho.getMaterial()).isEqualTo(UPDATED_MATERIAL);
        assertThat(testAparelho.getValor()).isEqualByComparingTo(UPDATED_VALOR);
        assertThat(testAparelho.getAtivo()).isEqualTo(UPDATED_ATIVO);
    }

    @Test
    @Transactional
    void patchNonExistingAparelho() throws Exception {
        int databaseSizeBeforeUpdate = aparelhoRepository.findAll().size();
        aparelho.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAparelhoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, aparelho.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(aparelho))
            )
            .andExpect(status().isBadRequest());

        // Validate the Aparelho in the database
        List<Aparelho> aparelhoList = aparelhoRepository.findAll();
        assertThat(aparelhoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchAparelho() throws Exception {
        int databaseSizeBeforeUpdate = aparelhoRepository.findAll().size();
        aparelho.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAparelhoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(aparelho))
            )
            .andExpect(status().isBadRequest());

        // Validate the Aparelho in the database
        List<Aparelho> aparelhoList = aparelhoRepository.findAll();
        assertThat(aparelhoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamAparelho() throws Exception {
        int databaseSizeBeforeUpdate = aparelhoRepository.findAll().size();
        aparelho.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAparelhoMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(aparelho)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Aparelho in the database
        List<Aparelho> aparelhoList = aparelhoRepository.findAll();
        assertThat(aparelhoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteAparelho() throws Exception {
        // Initialize the database
        aparelhoRepository.saveAndFlush(aparelho);

        int databaseSizeBeforeDelete = aparelhoRepository.findAll().size();

        // Delete the aparelho
        restAparelhoMockMvc
            .perform(delete(ENTITY_API_URL_ID, aparelho.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Aparelho> aparelhoList = aparelhoRepository.findAll();
        assertThat(aparelhoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
