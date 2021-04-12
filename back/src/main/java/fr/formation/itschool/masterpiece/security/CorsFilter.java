package fr.formation.itschool.masterpiece.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class CorsFilter implements Filter {
  @Value("${jwt-auth-server.myFront}")
  private String myFront;

  @Override
  public void doFilter(
    ServletRequest servletRequest, ServletResponse servletResponse, FilterChain chain)
    throws IOException, ServletException {
    HttpServletResponse response = (HttpServletResponse) servletResponse;
    response.setHeader("Access-Control-Allow-Origin", myFront);
    response.setHeader("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, HEAD");
    response.setHeader("Access-Control-Allow-Credentials", "true");
    response.setHeader("Access-Control-Allow-Headers", "x-requested-with, Authorization, content-type");
    chain.doFilter(servletRequest, servletResponse);
  }
}