package servletclass;

import java.util.*;

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

import org.json.*;
import com.google.gson.*;  

public class GetCount extends HttpServlet
{
	private Gson gson = new Gson();
	
	public void doGet(HttpServletRequest request,HttpServletResponse response) throws IOException,ServletException
	{
	
	}
	public void doPost(HttpServletRequest request,HttpServletResponse response) throws IOException,ServletException
	{	
			String username = (request.getParameter("username"));
			int count = 0;
			
			String url = "jdbc:mariadb://localhost:3306/cricket";
			String user = "root";
			String pwd = "root";
			boolean st = false;
			
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
			PreparedStatement ps = con.prepareStatement("select * from history where uname=?");
            ps.setString(1, username);
            ResultSet rs = ps.executeQuery();

			
			while(rs.next())
			{	
				count++;
			}
			
			response.setContentType("text/html");
			PrintWriter out = response.getWriter();
			out.println(count);
				
			ps.close();
			con.close();
			}
			catch(SQLException e)
			{
				e.printStackTrace();
			}
		
	}

}