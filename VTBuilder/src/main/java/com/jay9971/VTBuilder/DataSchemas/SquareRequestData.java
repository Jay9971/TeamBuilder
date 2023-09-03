package com.jay9971.VTBuilder.DataSchemas;

public class SquareRequestData {
	private String occupiedSquares;
	private String userid;
	
	public SquareRequestData() {
		
	}
	
	public SquareRequestData(String square, String userid) {
		this.occupiedSquares = square;
		this.userid = userid;
	}

	public String getOccupiedSquares() {
		return occupiedSquares;
	}

	public void setOccupiedSquares(String occupiedSquares) {
		this.occupiedSquares = occupiedSquares;
	}

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	@Override
	public String toString() {
		return "SquareRequestData [occupiedSquares=" + occupiedSquares + ", userid=" + userid + "]";
	}

	
	
}
