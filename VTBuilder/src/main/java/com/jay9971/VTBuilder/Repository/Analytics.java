package com.jay9971.VTBuilder.Repository;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Analytics {
	private int numOfPlayers;
	
	private String timeElapsed;
	
	private String teamScore;
	
	@Id
	private long id;
	
	public Analytics() {
		id = 0;
	}
	
	public Analytics(int numOfPlayers, String timeElapsed, String teamScore) {
		id = 0;
		this.numOfPlayers = numOfPlayers;
		this.timeElapsed = timeElapsed;
		this.teamScore = teamScore;
	}

	public int getNumOfPlayers() {
		return numOfPlayers;
	}

	public void setNumOfPlayers(int numOfPlayers) {
		this.numOfPlayers = numOfPlayers;
	}

	public String getTimeElapsed() {
		return timeElapsed;
	}

	public void setTimeElapsed(String timeElapsed) {
		this.timeElapsed = timeElapsed;
	}

	public String getTeamScore() {
		return teamScore;
	}

	public void setTeamScore(String teamScore) {
		this.teamScore = teamScore;
	}


	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	@Override
	public String toString() {
		return "Analytics [numOfPlayers=" + numOfPlayers + ", timeElapsed=" + timeElapsed + ", teamScore=" + teamScore
				+ ", id=" + id + "]";
	}

	
	
	
}
