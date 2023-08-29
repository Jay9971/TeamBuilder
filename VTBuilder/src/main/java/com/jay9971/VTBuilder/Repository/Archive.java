package com.jay9971.VTBuilder.Repository;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Archive {
	
	private String image;
	
	
	private String data;
	
	private int squares;
	
	@Id 
	private long id;
	
	public Archive() {
		
	}
	
	public Archive(long id, String image, String data, int squares) {
		this.image = image;
		this.id = id;
		this.data = data;
		this.squares = squares;
	}
	
	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
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

	public int getSquares() {
		return squares;
	}

	public void setSquares(int squares) {
		this.squares = squares;
	}

	@Override
	public String toString() {
		return "Archive [image=" + image + ", data=" + data + ", squares=" + squares + ", id=" + id
				+ "]";
	}
	
	
	
	
}
