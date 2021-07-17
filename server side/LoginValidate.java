package servletclass;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import jakarta.servlet.ServletException;
import java.io.PrintWriter;

public class LoginValidate extends HttpServlet
{
	public void doPost(HttpServletRequest request,HttpServletResponse response) throws IOException,ServletException
	{		
			String URL = (request.getParameter("url"));
			Cookie cookie = new Cookie("URL",URL);
			cookie.setMaxAge(15*24*60*60);
			response.addCookie(cookie);
			
			response.setContentType("text/html");
			PrintWriter out = response.getWriter();
			
			int flag = 0 ;
			String uName  = null;
			
			Cookie cookies[] = request.getCookies();
			
			if(cookies!=null){
			for(Cookie c:cookies)
			{
				if(c.getName().equals("username"))
				{
					flag = 1;
					uName = c.getValue();
					if(!uName.equals("")&&uName!=null)
					{
						out.println(uName);
					}
					else
					{
						out.println("Successful");
					}
				
				}
			}
			}
			if(flag==0)
			{
				out.println("Successful");
			}
			
			out.close();
			
			
	}
	public void doGet(HttpServletRequest request,HttpServletResponse response) throws IOException,ServletException
	{	
		
	}

}