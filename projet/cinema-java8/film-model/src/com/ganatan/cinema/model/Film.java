package com.ganatan.cinema.model;

public class Film {
    private final String titre;
    private final int annee;

    public Film(String titre, int annee) {
        this.titre = titre;
        this.annee = annee;
    }

    public String getTitre() {
        return titre;
    }

    public int getAnnee() {
        return annee;
    }
}
