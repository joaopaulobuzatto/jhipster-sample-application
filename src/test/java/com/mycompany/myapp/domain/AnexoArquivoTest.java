package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class AnexoArquivoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AnexoArquivo.class);
        AnexoArquivo anexoArquivo1 = new AnexoArquivo();
        anexoArquivo1.setId(1L);
        AnexoArquivo anexoArquivo2 = new AnexoArquivo();
        anexoArquivo2.setId(anexoArquivo1.getId());
        assertThat(anexoArquivo1).isEqualTo(anexoArquivo2);
        anexoArquivo2.setId(2L);
        assertThat(anexoArquivo1).isNotEqualTo(anexoArquivo2);
        anexoArquivo1.setId(null);
        assertThat(anexoArquivo1).isNotEqualTo(anexoArquivo2);
    }
}
