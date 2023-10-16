package com.jay9971.VTBuilder.DataSchemas;

public class SquareRequestData {
	private String occupiedSquares;
	private String userid;
	private int playerAccuracy;
	private int numPlacements;
	
	public SquareRequestData() {
		
	}
	
	public SquareRequestData(String square, String userid, int playerAccuracy, int numPlacements) {
		this.occupiedSquares = square;
		this.userid = userid;
		this.playerAccuracy = playerAccuracy;
		this.numPlacements = numPlacements;
	}
	

	public int getPlayerAccuracy() {
		return playerAccuracy;
	}

	public void setPlayerAccuracy(int playerAccuracy) {
		this.playerAccuracy = playerAccuracy;
	}

	public int getNumPlacements() {
		return numPlacements;
	}

	public void setNumPlacements(int numPlacements) {
		this.numPlacements = numPlacements;
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
		return "SquareRequestData [occupiedSquares=" + occupiedSquares + ", userid=" + userid + ", playerAccuracy="
				+ playerAccuracy + ", numPlacements=" + numPlacements + "]";
	}

	

	
	
}
