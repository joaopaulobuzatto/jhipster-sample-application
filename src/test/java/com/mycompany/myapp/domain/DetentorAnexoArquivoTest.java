package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DetentorAnexoArquivoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DetentorAnexoArquivo.class);
        DetentorAnexoArquivo detentorAnexoArquivo1 = new DetentorAnexoArquivo();
        detentorAnexoArquivo1.setId(1L);
        DetentorAnexoArquivo detentorAnexoArquivo2 = new DetentorAnexoArquivo();
        detentorAnexoArquivo2.setId(detentorAnexoArquivo1.getId());
        assertThat(detentorAnexoArquivo1).isEqualTo(detentorAnexoArquivo2);
        detentorAnexoArquivo2.setId(2L);
        assertThat(detentorAnexoArquivo1).isNotEqualTo(detentorAnexoArquivo2);
        detentorAnexoArquivo1.setId(null);
        assertThat(detentorAnexoArquivo1).isNotEqualTo(detentorAnexoArquivo2);
    }
}
