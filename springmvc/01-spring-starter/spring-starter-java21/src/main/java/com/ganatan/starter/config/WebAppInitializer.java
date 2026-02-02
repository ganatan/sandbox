package com.ganatan.starter.config;

import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

public class WebAppInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {

  protected Class<?>[] getRootConfigClasses() { return null; }

  protected Class<?>[] getServletConfigClasses() { return new Class<?>[]{AppConfig.class}; }

  protected String[] getServletMappings() { return new String[]{"/"}; }
}
