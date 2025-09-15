package com.ganatan.apps;

import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

// @WebServlet("/home")
public class Home extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		res.setContentType("text/html");
		ServletOutputStream out = res.getOutputStream();
		out.println("<!DOCTYPE html>");
		out.println("<html>");
		out.println("<head>");
		out.println("<title>Bonjour</title>");
		out.println("</head>");
		out.println("<body>");
		out.println("<h1>Home</h1>");

		String contextPath = req.getContextPath();
		String link = "<a href=\"" + contextPath + "/about\">About</a>";
		out.println(link);
		
		out.println("</ br>");
		String contextPath2 = req.getContextPath();
		String link2 = "<a href=\"" + contextPath2 + "/contact\">Contact</a>";
		out.println(link2);
		
		out.println("</body>");
		out.println("</html>");
	}

}

