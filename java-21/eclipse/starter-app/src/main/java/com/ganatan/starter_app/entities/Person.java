package com.ganatan.starter_app.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "person")
public class Person {
   
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id;
   
   @Column(nullable = false)
   private String name;
   
   public Person() {}
   
   public Person(String name) {
       this.name = name;
   }
   
   public Long getId() { return id; }
   public String getName() { return name; }
   
   public void setId(Long id) { this.id = id; }
   public void setName(String name) { this.name = name; }
}