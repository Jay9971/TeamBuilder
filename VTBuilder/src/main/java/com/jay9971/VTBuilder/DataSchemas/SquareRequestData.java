package com.jay9971.VTBuilder.DataSchemas;

public class SquareRequestData {
	private String occupiedSquares;
	private String userid;
	private String playerAccuracy;
	private String numPlacements;
	
	public SquareRequestData() {
		
	}
	
	public SquareRequestData(String square, String userid, String playerAccuracy, String numPlacements) {
		this.occupiedSquares = square;
		this.userid = userid;
		this.playerAccuracy = playerAccuracy;
		this.numPlacements = numPlacements;
	}
	

	public double getPlayerAccuracy() {
		return Double.parseDouble(playerAccuracy);
	}

	public void setPlayerAccuracy(double playersAccuracy) {
		this.playerAccuracy = Double.toString(playersAccuracy);
	}

	public int getNumPlacements() {
		return Integer.parseInt(numPlacements);
	}

	public void setNumPlacements(int numberPlacements) {
		this.numPlacements = Integer.toString(numberPlacements);
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
