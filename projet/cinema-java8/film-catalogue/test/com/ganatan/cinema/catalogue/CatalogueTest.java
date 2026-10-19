package com.ganatan.cinema.catalogue;

import junit.framework.TestCase;
import com.ganatan.cinema.catalogue.Catalogue;

public class CatalogueTest extends TestCase {
    public void testResultat() {
        assertEquals("Interstellar", new Catalogue().premierFilm().getTitre());
    }
}
