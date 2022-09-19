package com.mycompany.myapp.web.rest;

import static com.mycompany.myapp.web.rest.TestUtil.sameNumber;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Oferta;
import com.mycompany.myapp.repository.OfertaRepository;
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
 * Integration tests for the {@link OfertaResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class OfertaResourceIT {

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

    private static final String ENTITY_API_URL = "/api/ofertas";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private OfertaRepository ofertaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restOfertaMockMvc;

    private Oferta oferta;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Oferta createEntity(EntityManager em) {
        Oferta oferta = new Oferta()
            .codigo(DEFAULT_CODIGO)
            .dataCriacao(DEFAULT_DATA_CRIACAO)
            .descricao(DEFAULT_DESCRICAO)
            .ativo(DEFAULT_ATIVO)
            .valor(DEFAULT_VALOR);
        return oferta;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Oferta createUpdatedEntity(EntityManager em) {
        Oferta oferta = new Oferta()
            .codigo(UPDATED_CODIGO)
            .dataCriacao(UPDATED_DATA_CRIACAO)
            .descricao(UPDATED_DESCRICAO)
            .ativo(UPDATED_ATIVO)
            .valor(UPDATED_VALOR);
        return oferta;
    }

    @BeforeEach
    public void initTest() {
        oferta = createEntity(em);
    }

    @Test
    @Transactional
    void createOferta() throws Exception {
        int databaseSizeBeforeCreate = ofertaRepository.findAll().size();
        // Create the Oferta
        restOfertaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(oferta)))
            .andExpect(status().isCreated());

        // Validate the Oferta in the database
        List<Oferta> ofertaList = ofertaRepository.findAll();
        assertThat(ofertaList).hasSize(databaseSizeBeforeCreate + 1);
        Oferta testOferta = ofertaList.get(ofertaList.size() - 1);
        assertThat(testOferta.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testOferta.getDataCriacao()).isEqualTo(DEFAULT_DATA_CRIACAO);
        assertThat(testOferta.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
        assertThat(testOferta.getAtivo()).isEqualTo(DEFAULT_ATIVO);
        assertThat(testOferta.getValor()).isEqualByComparingTo(DEFAULT_VALOR);
    }

    @Test
    @Transactional
    void createOfertaWithExistingId() throws Exception {
        // Create the Oferta with an existing ID
        oferta.setId(1L);

        int databaseSizeBeforeCreate = ofertaRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restOfertaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(oferta)))
            .andExpect(status().isBadRequest());

        // Validate the Oferta in the database
        List<Oferta> ofertaList = ofertaRepository.findAll();
        assertThat(ofertaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkDataCriacaoIsRequired() throws Exception {
        int databaseSizeBeforeTest = ofertaRepository.findAll().size();
        // set the field null
        oferta.setDataCriacao(null);

        // Create the Oferta, which fails.

        restOfertaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(oferta)))
            .andExpect(status().isBadRequest());

        List<Oferta> ofertaList = ofertaRepository.findAll();
        assertThat(ofertaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkAtivoIsRequired() throws Exception {
        int databaseSizeBeforeTest = ofertaRepository.findAll().size();
        // set the field null
        oferta.setAtivo(null);

        // Create the Oferta, which fails.

        restOfertaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(oferta)))
            .andExpect(status().isBadRequest());

        List<Oferta> ofertaList = ofertaRepository.findAll();
        assertThat(ofertaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkValorIsRequired() throws Exception {
        int databaseSizeBeforeTest = ofertaRepository.findAll().size();
        // set the field null
        oferta.setValor(null);

        // Create the Oferta, which fails.

        restOfertaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(oferta)))
            .andExpect(status().isBadRequest());

        List<Oferta> ofertaList = ofertaRepository.findAll();
        assertThat(ofertaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllOfertas() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get all the ofertaList
        restOfertaMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(oferta.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO.intValue())))
            .andExpect(jsonPath("$.[*].dataCriacao").value(hasItem(DEFAULT_DATA_CRIACAO.toString())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)))
            .andExpect(jsonPath("$.[*].ativo").value(hasItem(DEFAULT_ATIVO.booleanValue())))
            .andExpect(jsonPath("$.[*].valor").value(hasItem(sameNumber(DEFAULT_VALOR))));
    }

    @Test
    @Transactional
    void getOferta() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        // Get the oferta
        restOfertaMockMvc
            .perform(get(ENTITY_API_URL_ID, oferta.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(oferta.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO.intValue()))
            .andExpect(jsonPath("$.dataCriacao").value(DEFAULT_DATA_CRIACAO.toString()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO))
            .andExpect(jsonPath("$.ativo").value(DEFAULT_ATIVO.booleanValue()))
            .andExpect(jsonPath("$.valor").value(sameNumber(DEFAULT_VALOR)));
    }

    @Test
    @Transactional
    void getNonExistingOferta() throws Exception {
        // Get the oferta
        restOfertaMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingOferta() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        int databaseSizeBeforeUpdate = ofertaRepository.findAll().size();

        // Update the oferta
        Oferta updatedOferta = ofertaRepository.findById(oferta.getId()).get();
        // Disconnect from session so that the updates on updatedOferta are not directly saved in db
        em.detach(updatedOferta);
        updatedOferta
            .codigo(UPDATED_CODIGO)
            .dataCriacao(UPDATED_DATA_CRIACAO)
            .descricao(UPDATED_DESCRICAO)
            .ativo(UPDATED_ATIVO)
            .valor(UPDATED_VALOR);

        restOfertaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedOferta.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedOferta))
            )
            .andExpect(status().isOk());

        // Validate the Oferta in the database
        List<Oferta> ofertaList = ofertaRepository.findAll();
        assertThat(ofertaList).hasSize(databaseSizeBeforeUpdate);
        Oferta testOferta = ofertaList.get(ofertaList.size() - 1);
        assertThat(testOferta.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testOferta.getDataCriacao()).isEqualTo(UPDATED_DATA_CRIACAO);
        assertThat(testOferta.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testOferta.getAtivo()).isEqualTo(UPDATED_ATIVO);
        assertThat(testOferta.getValor()).isEqualByComparingTo(UPDATED_VALOR);
    }

    @Test
    @Transactional
    void putNonExistingOferta() throws Exception {
        int databaseSizeBeforeUpdate = ofertaRepository.findAll().size();
        oferta.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOfertaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, oferta.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(oferta))
            )
            .andExpect(status().isBadRequest());

        // Validate the Oferta in the database
        List<Oferta> ofertaList = ofertaRepository.findAll();
        assertThat(ofertaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchOferta() throws Exception {
        int databaseSizeBeforeUpdate = ofertaRepository.findAll().size();
        oferta.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOfertaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(oferta))
            )
            .andExpect(status().isBadRequest());

        // Validate the Oferta in the database
        List<Oferta> ofertaList = ofertaRepository.findAll();
        assertThat(ofertaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamOferta() throws Exception {
        int databaseSizeBeforeUpdate = ofertaRepository.findAll().size();
        oferta.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOfertaMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(oferta)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Oferta in the database
        List<Oferta> ofertaList = ofertaRepository.findAll();
        assertThat(ofertaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateOfertaWithPatch() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        int databaseSizeBeforeUpdate = ofertaRepository.findAll().size();

        // Update the oferta using partial update
        Oferta partialUpdatedOferta = new Oferta();
        partialUpdatedOferta.setId(oferta.getId());

        partialUpdatedOferta.codigo(UPDATED_CODIGO).descricao(UPDATED_DESCRICAO).valor(UPDATED_VALOR);

        restOfertaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedOferta.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedOferta))
            )
            .andExpect(status().isOk());

        // Validate the Oferta in the database
        List<Oferta> ofertaList = ofertaRepository.findAll();
        assertThat(ofertaList).hasSize(databaseSizeBeforeUpdate);
        Oferta testOferta = ofertaList.get(ofertaList.size() - 1);
        assertThat(testOferta.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testOferta.getDataCriacao()).isEqualTo(DEFAULT_DATA_CRIACAO);
        assertThat(testOferta.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testOferta.getAtivo()).isEqualTo(DEFAULT_ATIVO);
        assertThat(testOferta.getValor()).isEqualByComparingTo(UPDATED_VALOR);
    }

    @Test
    @Transactional
    void fullUpdateOfertaWithPatch() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        int databaseSizeBeforeUpdate = ofertaRepository.findAll().size();

        // Update the oferta using partial update
        Oferta partialUpdatedOferta = new Oferta();
        partialUpdatedOferta.setId(oferta.getId());

        partialUpdatedOferta
            .codigo(UPDATED_CODIGO)
            .dataCriacao(UPDATED_DATA_CRIACAO)
            .descricao(UPDATED_DESCRICAO)
            .ativo(UPDATED_ATIVO)
            .valor(UPDATED_VALOR);

        restOfertaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedOferta.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedOferta))
            )
            .andExpect(status().isOk());

        // Validate the Oferta in the database
        List<Oferta> ofertaList = ofertaRepository.findAll();
        assertThat(ofertaList).hasSize(databaseSizeBeforeUpdate);
        Oferta testOferta = ofertaList.get(ofertaList.size() - 1);
        assertThat(testOferta.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testOferta.getDataCriacao()).isEqualTo(UPDATED_DATA_CRIACAO);
        assertThat(testOferta.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testOferta.getAtivo()).isEqualTo(UPDATED_ATIVO);
        assertThat(testOferta.getValor()).isEqualByComparingTo(UPDATED_VALOR);
    }

    @Test
    @Transactional
    void patchNonExistingOferta() throws Exception {
        int databaseSizeBeforeUpdate = ofertaRepository.findAll().size();
        oferta.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOfertaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, oferta.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(oferta))
            )
            .andExpect(status().isBadRequest());

        // Validate the Oferta in the database
        List<Oferta> ofertaList = ofertaRepository.findAll();
        assertThat(ofertaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchOferta() throws Exception {
        int databaseSizeBeforeUpdate = ofertaRepository.findAll().size();
        oferta.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOfertaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(oferta))
            )
            .andExpect(status().isBadRequest());

        // Validate the Oferta in the database
        List<Oferta> ofertaList = ofertaRepository.findAll();
        assertThat(ofertaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamOferta() throws Exception {
        int databaseSizeBeforeUpdate = ofertaRepository.findAll().size();
        oferta.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restOfertaMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(oferta)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Oferta in the database
        List<Oferta> ofertaList = ofertaRepository.findAll();
        assertThat(ofertaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteOferta() throws Exception {
        // Initialize the database
        ofertaRepository.saveAndFlush(oferta);

        int databaseSizeBeforeDelete = ofertaRepository.findAll().size();

        // Delete the oferta
        restOfertaMockMvc
            .perform(delete(ENTITY_API_URL_ID, oferta.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Oferta> ofertaList = ofertaRepository.findAll();
        assertThat(ofertaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
