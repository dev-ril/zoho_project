FROM tomcat:10.0-jdk11-openjdk

ADD ./zoho_project /usr/local/tomcat/webapps.dist/zoho_project/
ADD ./FirstServlet /usr/local/tomcat/webapps.dist/FirstServlet/

EXPOSE 8080

CMD ["catalina.sh","run"]