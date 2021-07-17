package servletclass;

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


public class History extends HttpServlet
{
	public void doGet(HttpServletRequest request,HttpServletResponse response) throws IOException,ServletException
	{
	
	}
	public void doPost(HttpServletRequest request,HttpServletResponse response) throws IOException,ServletException
	{	
			String uname = (request.getParameter("uname"));
			String fscore = (request.getParameter("fscore"));
			String fwicket = (request.getParameter("fwicket"));
			String fteam = (request.getParameter("fteam"));
			String ftarget = (request.getParameter("ftarget"));
			String fover = (request.getParameter("fover"));
			
			response.setContentType("text/html");
			PrintWriter out = response.getWriter();
			out.println("uname is "+uname);
			out.println("fscore is "+fscore);
			out.println("fwicket is "+fwicket);
			out.println("fteam is "+fteam);
			out.println("ftarget is "+ftarget);
			out.println("fover is "+fover);
			
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
			String sql = "INSERT INTO history (uname,fscore,fwicket,fteam,date,ftarget,fover) VALUES (?,?,?,?,now(),?,?)";
			PreparedStatement p = null;
	         p = con.prepareStatement(sql);
	         p.setString(1, request.getParameter("uname"));
	         p.setString(2, request.getParameter("fscore"));
			 p.setString(3, request.getParameter("fwicket"));
	         p.setString(4, request.getParameter("fteam"));
			 p.setString(5, request.getParameter("ftarget"));
	         p.setString(6, request.getParameter("fover"));
	         p.executeUpdate();
			 p.close();
			 con.close();
			out.println("inserted");
			}
			catch(SQLException e)
			{
				out.println(e.toString());
				e.printStackTrace();
			}
		
	}

}