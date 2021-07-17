package servletclass;

import java.util.*;

public class Data {
	
    private List<String> fscore;
    
    private List<String> fwicket;
    
    private List<String> fteam;
	
	private List<String> date;
	
	private List<String> ftarget;
	
	private List<String> fover;
   
	public Data()
	{
		fscore = new ArrayList<String>();
		fwicket = new ArrayList<String>();
		fteam = new ArrayList<String>();
		date = new ArrayList<String>();
		ftarget = new ArrayList<String>();
		fover = new ArrayList<String>();
	}
		
    public void setFScore(String fscore) {
        this.fscore.add(fscore);
    }

    public void setFWicket(String fwicket) {
        this.fwicket.add(fwicket);
    }
	
    public void setFTeam(String fteam) {
        this.fteam.add(fteam);
    }
	
	 public void setDate(String date) {
        this.date.add(date);
    }
	public void setTarget(String ftarget) {
        this.ftarget.add(ftarget);
    }
	
	public void setOver(String fover) {
        this.fover.add(fover);
    }

}