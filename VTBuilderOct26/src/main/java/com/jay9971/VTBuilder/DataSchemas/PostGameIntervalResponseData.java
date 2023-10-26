package com.jay9971.VTBuilder.DataSchemas;

public class PostGameIntervalResponseData {
	private String status;
	private String lobbyPath;
	
	public PostGameIntervalResponseData(String status, String url) {
		this.status = status;
		this.lobbyPath = url;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getLobbyPath() {
		return lobbyPath;
	}

	public void setLobbyPath(String lobbyPath) {
		this.lobbyPath = lobbyPath;
	}

	@Override
	public String toString() {
		return "PostGameIntervalResponseData [status=" + status + ", lobbyPath=" + lobbyPath + "]";
	}
	
}
