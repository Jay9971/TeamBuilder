package com.jay9971.VTBuilder.DataSchemas;

public class PostGameResponseData {
	private String finalOccupiedList;
	
	public PostGameResponseData(String dat) {
		finalOccupiedList = dat;
	}

	public String getFinalOccupiedList() {
		return finalOccupiedList;
	}

	public void setFinalOccupiedList(String finalOccupiedList) {
		this.finalOccupiedList = finalOccupiedList;
	}

	@Override
	public String toString() {
		return "PostGameResponseData [finalOccupiedList=" + finalOccupiedList + "]";
	}
	
}
