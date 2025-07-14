package com.ganatan.starter_app.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Person {

    @Id
    private Long id;
    private String name;
    private String city;

    public Person() {}

    public Person(Long id, String name, String city) {
        this.id = id;
        this.name = name;
        this.city = city;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getCity() { return city; }
}



//package com.ganatan.starter_app.entities;
//
//import jakarta.persistence.Entity;
//import jakarta.persistence.Id;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//
//@Entity
//public class Person {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//    private String name;
//
//    public Long getId() {
//        return id;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//}
