package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TipoDeDocumentoAnexavelTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoDeDocumentoAnexavel.class);
        TipoDeDocumentoAnexavel tipoDeDocumentoAnexavel1 = new TipoDeDocumentoAnexavel();
        tipoDeDocumentoAnexavel1.setId(1L);
        TipoDeDocumentoAnexavel tipoDeDocumentoAnexavel2 = new TipoDeDocumentoAnexavel();
        tipoDeDocumentoAnexavel2.setId(tipoDeDocumentoAnexavel1.getId());
        assertThat(tipoDeDocumentoAnexavel1).isEqualTo(tipoDeDocumentoAnexavel2);
        tipoDeDocumentoAnexavel2.setId(2L);
        assertThat(tipoDeDocumentoAnexavel1).isNotEqualTo(tipoDeDocumentoAnexavel2);
        tipoDeDocumentoAnexavel1.setId(null);
        assertThat(tipoDeDocumentoAnexavel1).isNotEqualTo(tipoDeDocumentoAnexavel2);
    }
}
