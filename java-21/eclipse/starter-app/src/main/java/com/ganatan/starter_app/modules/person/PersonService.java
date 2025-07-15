package com.ganatan.starter_app.modules.person;

import org.springframework.stereotype.Service;

import java.util.List;
import org.springframework.aop.framework.AopProxyUtils;

@Service
public class PersonService {

	private final PersonRepositoryInterface repository;

	public PersonService(PersonRepositoryInterface repository) {
		System.out.println("[ganatan] PersonService Constructor:");
		System.out.println(
				"[ganatan] Repository injecté : " + AopProxyUtils.ultimateTargetClass(repository).getSimpleName());
		this.repository = repository;
	}

	public List<Person> getItems() {
		System.out.println("[ganatan] PersonService getItems:");
		return repository.findAll();
	}
}
