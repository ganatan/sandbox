package com.ganatan.model;

public class Person {
    private int id;
    private String name;
    private String city;

    public Person(int id, String name, String city) {
    	System.out.println("00000000001:Person");
        this.id = id;
        this.name = name;
        this.city = city;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getCity() {
        return city;
    }
}
