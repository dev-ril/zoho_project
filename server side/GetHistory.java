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

public class GetHistory extends HttpServlet
{
	private Gson gson = new Gson();
	
	public void doGet(HttpServletRequest request,HttpServletResponse response) throws IOException,ServletException
	{
	
	}
	public void doPost(HttpServletRequest request,HttpServletResponse response) throws IOException,ServletException
	{	
			String username = (request.getParameter("username"));
			int count = Integer.parseInt((request.getParameter("count")));
			int pagesize = Integer.parseInt((request.getParameter("pagesize")));

			
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
			PreparedStatement ps = con.prepareStatement("select * from history where uname=? limit ?,?");
            ps.setString(1, username);
			ps.setInt(2, (count-1)*pagesize);
			ps.setInt(3, pagesize);
            ResultSet rs = ps.executeQuery();
			
			Data data = new Data();
			
			while(rs.next())
			{
				String uname = rs.getString("uname");
				String fscore = rs.getString("fscore");
				String fwicket = rs.getString("fwicket");
				String fteam = rs.getString("fteam");
				String date = rs.getString("date");
				String ftarget = rs.getString("ftarget");
				String fover = rs.getString("fover");
				
				data.setFScore(fscore);
				data.setFWicket(fwicket);
				data.setFTeam(fteam);
				data.setDate(date);
				data.setTarget(ftarget);
				data.setOver(fover);
				
			}
			
			String datastring = this.gson.toJson(data);
			response.setContentType("application/json");
			PrintWriter out = response.getWriter();
			out.println(datastring);
				
			ps.close();
			con.close();
			}
			catch(SQLException e)
			{
				e.printStackTrace();
			}
		
	}

}