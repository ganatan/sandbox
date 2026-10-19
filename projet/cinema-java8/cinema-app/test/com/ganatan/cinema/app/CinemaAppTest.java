package com.ganatan.cinema.app;

import junit.framework.TestCase;
import com.ganatan.cinema.catalogue.Catalogue;
import com.ganatan.cinema.format.FormatFilm;

public class CinemaAppTest extends TestCase {
    public void testResultat() {
        assertEquals("Interstellar (2014)", new FormatFilm().afficher(new Catalogue().premierFilm()));
    }
}
