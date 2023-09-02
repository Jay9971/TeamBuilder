package com.jay9971.VTBuilder.DataSchemas;

import java.util.Arrays;

public class SquareResponseData {
	private String occupiedList;
	private int gameStatus;
	private String[] playerList;
	
	public SquareResponseData() {
		
	}
	
	public SquareResponseData(String square, int game, String[] playerList) {
		this.occupiedList = square;
		this.gameStatus = game;
		this.playerList = playerList;
	}

	public String getoccupiedList() {
		return occupiedList;
	}

	public void setoccupiedList(String occupiedList) {
		this.occupiedList = occupiedList;
	}

	public int getGameStatus() {
		return gameStatus;
	}

	public void setGameStatus(int gameStatus) {
		this.gameStatus = gameStatus;
	}

	public String[] getPlayerList() {
		return playerList;
	}

	public void setPlayerList(String[] playerList) {
		this.playerList = playerList;
	}

	@Override
	public String toString() {
		return "SquareResponseData [occupiedList=" + occupiedList + ", gameStatus=" + gameStatus + ", playerList="
				+ Arrays.toString(playerList) + "]";
	}

	
	
	
}
