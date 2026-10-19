package com.ganatan.cinema.app;

import com.ganatan.cinema.catalogue.Catalogue;
import com.ganatan.cinema.format.FormatFilm;
import com.ganatan.cinema.model.Film;

public class Main {
    public static void main(String[] args) {
        Film film = new Catalogue().premierFilm();
        System.out.println(new FormatFilm().afficher(film));
    }
}
