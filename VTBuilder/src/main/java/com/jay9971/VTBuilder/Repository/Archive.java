package com.jay9971.VTBuilder.Repository;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Archive {
	
	private String image;
	
	private String users;
	
	private String data;
	
	@Id 
	private long id;
	
	public Archive() {
		
	}
	
	public Archive(long id, String image, String users, String data) {
		this.image = image;
		this.users = users;
		this.id = id;
		this.data = data;
	}
	
	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getUsers() {
		return users;
	}

	public void setUsers(String users) {
		this.users = users;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
	
	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

	@Override
	public String toString() {
		return "Archive [id=" + id + ", image=" + image + ", users=" + users + ", data=" + data + "]";
	}
}
