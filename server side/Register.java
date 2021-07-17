package servletclass;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
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


public class Register extends HttpServlet
{

	public void doGet(HttpServletRequest request,HttpServletResponse response) throws IOException,ServletException
	{
	
	}
	public void doPost(HttpServletRequest request,HttpServletResponse response) throws IOException,ServletException
	{	
			String username = (request.getParameter("username"));
			String password = (request.getParameter("password"));
			
			response.setContentType("text/html");
			PrintWriter out = response.getWriter();
			out.println("username is "+username);
			out.println("password is "+password);
			
			String url = "jdbc:mariadb://localhost:3306/cricket";
			String user = "root";
			String pwd = "root";
			
			try{
				try
				{
				Class.forName("org.mariadb.jdbc.Driver");
				}
				catch(ClassNotFoundException e)
				{
				e.printStackTrace();
				}
				
				
			Connection  con = DriverManager.getConnection(url,user,pwd);
			String sql = "insert into login values (?,?)";
			PreparedStatement p = null;
	         p = con.prepareStatement(sql);
	         p.setString(1, request.getParameter("username"));
	         p.setString(2, request.getParameter("password"));
	         p.executeUpdate();

			 out.println("Successful");
			}
			catch(SQLException e)
			{
				out.println("wrong uname or pwd");
				out.println(e);
				
			}
	}

}