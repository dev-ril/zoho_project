package servletclass;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import jakarta.servlet.ServletException;
import java.io.PrintWriter;

import java.sql.*;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;


public class Page extends HttpServlet
{
	public void doGet(HttpServletRequest request,HttpServletResponse response) throws IOException,ServletException
	{
	
	}
	public void doPost(HttpServletRequest request,HttpServletResponse response) throws IOException,ServletException
	{	
			String pagesize = (request.getParameter("pagesize"));
			
			response.setContentType("text/html");
			PrintWriter out = response.getWriter();

			HttpSession session = request.getSession();
			session.setAttribute("pagesize",pagesize);
			
			out.println("Session added successfully!!"); 
		
	}

}