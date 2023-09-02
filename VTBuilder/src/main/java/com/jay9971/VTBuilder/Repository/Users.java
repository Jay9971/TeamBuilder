package com.jay9971.VTBuilder.Repository;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Users {
	
	private String name;
	
	private String squares;
	
	private long lobby;
	
	@Id
	private long id;
	
	public Users() {
		
	}
	
	public Users(long id, String name, String squares, long lobby) {
		this.id = id;
		this.name = name;
		this.squares = squares;
		this.lobby = lobby;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSquares() {
		return squares;
	}

	public void setSquares(String squares) {
		this.squares = squares;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getLobby() {
		return lobby;
	}

	public void setLobby(long lobby) {
		this.lobby = lobby;
	}

	@Override
	public String toString() {
		return "Users [name=" + name + ", squares=" + squares + ", lobby=" + lobby + ", id=" + id + "]";
	}
	
	


	
	
}
