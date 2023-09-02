package com.jay9971.VTBuilder.DataSchemas;

public class StartGameResponseData {
	private int numSquares;
	private String imageUrl;
	private String assignedSquares;
	
	public StartGameResponseData() {
		
	}
	
	public StartGameResponseData(int numSquares, String imageUrl, String assignedSquares) {
		this.numSquares = numSquares;
		this.imageUrl = imageUrl;
		this.assignedSquares = assignedSquares;
	}

	public int getNumSquares() {
		return numSquares;
	}

	public void setNumSquares(int numSquares) {
		this.numSquares = numSquares;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public String getAssignedSquares() {
		return assignedSquares;
	}

	public void setAssignedSquares(String assignedSquares) {
		this.assignedSquares = assignedSquares;
	}

	@Override
	public String toString() {
		return "StartGameResponseData [numSquares=" + numSquares + ", imageUrl=" + imageUrl + ", assignedSquares="
				+ assignedSquares + "]";
	}
	
}
