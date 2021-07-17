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


public class Login extends HttpServlet
{
	public void doGet(HttpServletRequest request,HttpServletResponse response) throws IOException,ServletException
	{
	
	}
	public void doPost(HttpServletRequest request,HttpServletResponse response) throws IOException,ServletException
	{	
			String username = (request.getParameter("username"));
			String password = (request.getParameter("password"));
			String URL = "#/history";
			
			response.setContentType("text/html");
			PrintWriter out = response.getWriter();
			//out.println("username is "+username);
			//out.println("password is "+password);
			
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
			PreparedStatement ps = con.prepareStatement("select * from login where id=? and pwd=?");
            ps.setString(1, username);
            ps.setString(2, password);
            ResultSet rs = ps.executeQuery();
            st = rs.next();
			ps.close();
			con.close();
			}
			catch(SQLException e)
			{
				out.println(e.toString());
				e.printStackTrace();
			}
		if(st)
        {
			Cookie cookies[] = request.getCookies();
			if(cookies!=null){
			for(Cookie c:cookies)
			{
				if(c.getName().equals("URL"))
				{
					URL = c.getValue();
				}
			}
			}
			
			Cookie cookie = new Cookie("username",username);
			cookie.setMaxAge(15*24*60*60);
			response.addCookie(cookie);
			
			out.println(URL); 
			
        }
        else
        {
           String correct="Successful";
		   out.println(correct);
        }
		
	}

}