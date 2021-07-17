package servletclass;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import jakarta.servlet.ServletException;
import java.io.PrintWriter;

public class Logout extends HttpServlet
{
	public void doGet(HttpServletRequest request,HttpServletResponse response) throws IOException,ServletException
	{		
			response.setContentType("text/html");
			PrintWriter out = response.getWriter();
			
			Cookie cookie=new Cookie("username","");
			cookie.setValue(null);
			cookie.setMaxAge(0);
			response.addCookie(cookie);
			
			Cookie cookie2=new Cookie("URL","");
			cookie2.setValue(null);
			cookie2.setMaxAge(0);
			response.addCookie(cookie2);
			
			HttpSession session = request.getSession();
			session.removeAttribute("pagesize");
			session.invalidate();
			
			
			out.println("LoggedOut");
			out.close();
	}

}